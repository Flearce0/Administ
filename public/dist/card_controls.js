var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const element_by_id = (id) => document.getElementById(id);
element_by_id('add_card_id').addEventListener('click', get_values_card_add);
function INIT() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Initialisation Started...');
        try {
            const res = yield fetch('/tasks');
            const tasks = yield res.json();
            const res_r = yield fetch('/reminder');
            const reminders = yield res_r.json();
            tasks.forEach((task) => {
                card_add(task.id, task.title, task.descript, task.deadline, task.prioriti, false);
                to_do_sync(task.id, task.title, task.descript, task.deadline, task.prioriti);
                get_to_do_score();
                get_rank_values(task.deadline, task.prioriti);
            });
        }
        catch (error) {
            console.log('Database error:', error);
        }
    });
}
INIT();
/* Card Controls */
function get_values_card_add() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const card_ID = crypto.randomUUID();
    let task_title = (_b = (_a = document.getElementById('task_title_ID')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
    let task_desc = (_d = (_c = document.getElementById('task_desc_ID')) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : '';
    let task_deadline = (_f = (_e = document.getElementById('task_deadline_ID')) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : '';
    let task_priority = (_h = (_g = document.getElementById('task_priority_ID')) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : '';
    // let task_img = (document.getElementById('task_image_ID') as HTMLInputElement)?.value ?? ''
    if (task_desc === '')
        task_desc = '--';
    if (task_title === '') {
        console.log('Error, no title');
        const error_area = element_by_id('add_task_error_area_ID');
        const error_div = document.createElement('div');
        const card_error_msg = `
        <p class="mt-1 mb-2">ERROR: Please Enter a title</p>
        `;
        error_div.classList.add('w-50', 'task_error', 'mb-2');
        error_div.innerHTML = card_error_msg;
        error_area.append(error_div);
        return;
    }
    /* Manually hide bootstrap modal */
    const modal = bootstrap.Modal.getInstance(document.getElementById('card_edit_backdrop'));
    modal === null || modal === void 0 ? void 0 : modal.hide();
    card_add(card_ID, task_title, task_desc, task_deadline, task_priority);
    to_do_sync(card_ID, task_title, task_desc, task_deadline, task_priority);
    get_to_do_score();
    get_rank_values(task_deadline, task_priority);
}
function card_add(card_ID_1, task_title_1, task_desc_1, task_deadline_1, task_priority_1) {
    return __awaiter(this, arguments, void 0, function* (card_ID, task_title, task_desc, task_deadline, task_priority, save_to_db = true) {
        const task_area = element_by_id('task_area_id');
        const card_div = document.createElement('div');
        card_div.dataset.id = card_ID;
        card_div.classList.add('w-auto', 'glass-card', 'ms-2', 'card_delete_CID');
        let tag_bg_priority = '';
        let tag_bg_deadline = '';
        if (task_priority === 'Must')
            tag_bg_priority = 'tag_must';
        if (task_priority === 'Critical')
            tag_bg_priority = 'tag_critical';
        if (task_priority === 'Scheduled')
            tag_bg_priority = 'tag_scheduled';
        if (task_priority === 'Pending')
            tag_bg_priority = 'tag_pending';
        if (task_priority === 'Someday')
            tag_bg_priority = 'tag_someday';
        if (task_deadline === 'Today')
            tag_bg_deadline = 'tag_must';
        if (task_deadline === 'Tomorrow')
            tag_bg_deadline = 'tag_critical';
        if (task_deadline === 'This Week')
            tag_bg_deadline = 'tag_scheduled';
        if (task_deadline === 'Next Week')
            tag_bg_deadline = 'tag_pending';
        if (task_deadline === 'This Month')
            tag_bg_deadline = 'tag_someday';
        const card_element = `
    <div class="dropdown w-100 mt-2" style="position: absolute;">
        <div class="pe-4 d-flex justify-content-end">
            <a class="dropdown-toggle" data-bs-toggle="dropdown"
                data-bs-auto-close="outside" aria-expanded="false" href="">
                <img src="images/three-dots-vertical.svg" alt="">
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" role="button" data-bs-toggle="modal"
                        data-bs-target="#card_edit_modal_ID">Edit</a></li>
                <li><a class="dropdown-item" role="button" data-bs-toggle="modal"
                        data-bs-target="#card_info_modal_ID">Info</a></li>
                <li><a class="dropdown-item card_delete_BTN">Delete</a></li>
            </ul>
        </div>
    </div>
    <!--Title and Description-->
    <h2 class="mb-1" style="margin-top: 7px; font-size: 35px;">${task_title}</h2>
    <p class="me-4 font-s">${task_desc}</p>
    <!--Tags of task-->
    <div class="row mb-2">
        <div class="col-md-6 ms-2 ${tag_bg_deadline}">
            <p class="font-xs text-nowrap mb-1 mt-1 me-1 ms-1">Due: ${task_deadline}</p>
        </div>
        <div class="col-md-6 ms-2 me-2 ${tag_bg_priority}">
            <p class="font-xs text-nowrap mb-1 mt-1 me-1 ms-1">Priority: ${task_priority}</p>
        </div>
    </div>
    <!--Progress Bar-->
    <div class="progress" style="border: solid 1px rgba(255, 255, 255, 0.2)"
        role="progressbar" aria-label="Example with label" aria-valuenow="25"
        aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped progress-bar-animated"
            style="width: 25%;">25%</div>
    </div>
    <!--Seperation Line-->
    <div class="d-flex justify-content-center mt-2 mb-2 white_line"></div>
    <!--Image of task-->
    <div class="row d-flex justify-content-center mb-2">
        <img src="images/pencil-square.svg" alt="Task_Logo"
            style="width: 130px; height: auto;">
    </div>
    <div class="row d-flex justify-content-end">
        <button type="button" class="btn btn-success fw-bold w-50 mb-2 me-2"
            style="border: solid 1px rgba(0, 200, 0, 0.628);">Done</button>
    </div>
    `;
        if (save_to_db) {
            yield fetch('/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: card_ID,
                    title: task_title,
                    descript: task_desc,
                    deadline: task_deadline,
                    prioriti: task_priority
                })
            });
        }
        card_div.innerHTML = card_element;
        task_area === null || task_area === void 0 ? void 0 : task_area.append(card_div);
        const error_area = element_by_id('add_task_error_area_ID');
        error_area === null || error_area === void 0 ? void 0 : error_area.remove();
    });
}
/* Delete Card */
document.addEventListener('click', (event) => {
    const closest_target = event.target;
    if (closest_target.classList.contains('card_delete_BTN')) {
        const card = closest_target.closest('.card_delete_CID');
        if (!card)
            return;
        const id = card.dataset.id;
        fetch(`/tasks/${id}`, { method: 'DELETE' });
        card.remove();
        to_do_delete(event);
    }
});
/* TO-DO LIST */
let todo_tasks = 0;
function get_to_do_score() {
    var _a;
    const todo_area = element_by_id('todo_area_ID');
    const empty_msg_div = document.createElement('div');
    (_a = document.querySelector('.empty_msg_CID')) === null || _a === void 0 ? void 0 : _a.remove();
    console.log(todo_tasks);
    if (todo_tasks !== 0) {
        console.log("not 0, requirement met 1");
        return;
    }
    else {
        console.log("0, requirement met 2");
        empty_msg_div.classList.add('row', 'text-center', 'empty_msg_CID');
        empty_msg_div.innerHTML = `<h4 id='empty_txt_ID' class="mt-4 mb-3 fw-bold">No tasks for today, yippie!</h4>`;
        todo_area.append(empty_msg_div);
    }
}
function to_do_delete(event) {
    var _a;
    console.log('delete action reached');
    todo_tasks -= 1;
    console.log(todo_tasks);
    const closest_target = event.target;
    if (closest_target.classList.contains('card_delete_BTN')) {
        const card = closest_target.closest('.card_delete_CID');
        if (!card)
            return;
        const card_stamped_id = card.dataset.id;
        (_a = document.querySelector(`[data-id="${card_stamped_id}"]`)) === null || _a === void 0 ? void 0 : _a.remove();
        get_to_do_score();
    }
}
element_by_id('');
function to_do_done(event) {
    var _a;
    console.log('done action reached');
    todo_tasks -= 1;
    console.log(todo_tasks);
    const closest_target = event.target;
    if (closest_target.classList.contains('card_delete_BTN')) {
        const card = closest_target.closest('.card_delete_CID');
        if (!card)
            return;
        const card_stamped_id = card.dataset.id;
        (_a = document.querySelector(`[data-id="${card_stamped_id}"]`)) === null || _a === void 0 ? void 0 : _a.remove();
    }
}
function to_do_sync(card_ID, task_title, task_desc, task_deadline, task_priority) {
    todo_tasks += 1;
    if (task_deadline === 'Today') {
        const todo_area = element_by_id('todo_area_ID');
        const todo_div = document.createElement('div');
        todo_div.dataset.id = card_ID;
        let todo_side_bar = '';
        if (task_priority === 'Must')
            todo_side_bar = 'todo_side_must';
        if (task_priority === 'Critical')
            todo_side_bar = 'todo_side_critical';
        if (task_priority === 'Scheduled')
            todo_side_bar = 'todo_side_scheduled';
        if (task_priority === 'Pending')
            todo_side_bar = 'todo_side_pending';
        if (task_priority === 'Someday')
            todo_side_bar = 'todo_side_someday';
        todo_div.classList.add('bg_black_solid', 'mb-2', 'mt-2', `${todo_side_bar}`, 'height-200px', 'todo_delete_CID');
        const todo_msg = `
            <h3 class="pt-2 ps-2">${task_title}</h3>
            <p class="pb-2 ps-2">${task_desc}</p>
            `;
        todo_div.innerHTML = todo_msg;
        todo_area === null || todo_area === void 0 ? void 0 : todo_area.append(todo_div);
        return;
    }
}
let deadline_score = 0;
let rank_score = 0;
let final_score = 0;
/* Ranks */
function get_rank_values(task_deadline, task_priority) {
    if (task_deadline === 'Today')
        deadline_score + 1;
    if (task_deadline === 'Tomorrow')
        deadline_score + 2;
    if (task_deadline === 'This Week')
        deadline_score + 3;
    if (task_deadline === 'Next Week')
        deadline_score + 4;
    if (task_deadline === 'This Month')
        deadline_score + 5;
    if (task_priority === 'Must')
        rank_score + 5;
    if (task_priority === 'Critical')
        rank_score + 4;
    if (task_priority === 'Scheduled')
        rank_score + 3;
    if (task_priority === 'Pending')
        rank_score + 2;
    if (task_priority === 'Someday')
        rank_score + 1;
    final_score = rank_score * deadline_score;
    ranks_sync(final_score);
}
function ranks_sync(final_score) {
    const rank_area = element_by_id('rank_area_ID');
    let rank_style = '';
    let rank = '';
    if (final_score <= 5)
        rank_style = 'E_rank_bg', rank = 'E';
    if (final_score >= 10 && final_score <= 14)
        rank_style = 'D_rank_bg', rank = 'D';
    if (final_score >= 15 && final_score <= 19)
        rank_style = 'C_rank_bg', rank = 'C';
    if (final_score >= 20 && final_score <= 24)
        rank_style = 'B_rank_bg', rank = 'B';
    if (final_score >= 25 && final_score <= 29)
        rank_style = 'A_rank_bg', rank = 'A';
    if (final_score >= 30 && final_score <= 34)
        rank_style = 'S_rank_bg', rank = 'S';
    if (final_score >= 35 && final_score <= 39)
        rank_style = 'SS_rank_bg', rank = 'SS';
    if (final_score >= 40)
        rank_style = 'SSS_rank_bg', rank = 'SSS';
    console.log(final_score);
    rank_area.innerHTML = `<h1 class="mt-2 mb-2 ${rank_style}" style="font-size: 75px;">${rank}</h1>`;
}
export {};
