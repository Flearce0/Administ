var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const element_by_id = document.getElementById.bind(document);
function R_INIT() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Initialisation Started...');
        try {
            const res = yield fetch('/reminder');
            const reminder = yield res.json();
            reminder.forEach((reminder) => {
                reminder_add(reminder.r_id, reminder.r_title, reminder.r_desc, reminder.r_color, reminder.r_remove_date, false);
            });
        }
        catch (error) {
            console.log('Database error:', error);
        }
    });
}
R_INIT();
(_a = element_by_id('reminder_add_ID')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', get_values_reminder_add);
function get_values_reminder_add() {
    var _a, _b, _c, _d, _e, _f;
    const reminder_id = crypto.randomUUID();
    let reminder_title = (_b = (_a = document.getElementById('r_title_input_ID')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
    let reminder_desc = (_d = (_c = document.getElementById('r_desc_input_ID')) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : '';
    let reminder_color = (_f = (_e = document.getElementById('r_color_input_ID')) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : '';
    let reminder_remove_date = '231';
    if (reminder_title === '' || reminder_desc === '') {
        console.log("Error: Please enter a title and description for reminder");
        return;
    }
    reminder_add(reminder_id, reminder_title, reminder_desc, reminder_color, reminder_remove_date);
}
function reminder_add(reminder_id_1, reminder_title_1, reminder_desc_1, reminder_color_1, reminder_remove_date_1) {
    return __awaiter(this, arguments, void 0, function* (reminder_id, reminder_title, reminder_desc, reminder_color, reminder_remove_date, save_to_db = true) {
        console.log('Reminder Add function reached!');
        const reminder_area = element_by_id('reminder_area_ID');
        const reminder_div = document.createElement('div');
        reminder_div.classList.add('bg_black_solid', 'mb-2', `${reminder_color}`, 'height-200px', 'reminders_CID');
        reminder_div.dataset.id = reminder_id;
        let inner_reminder = `
        <!-- Reminder Edit Button -->
        <div class="dropdown w-100 position-relative">
            <div class="pe-4 d-flex justify-content-end position-absolute w-100">
                <a class="dropdown-toggle" data-bs-toggle="dropdown"
                    data-bs-auto-close="outside" aria-expanded="false" href="">
                    <img class="invert_to_white pt-2"
                        src="images/three-dots-vertical.svg" alt="">
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item reminder_delete_BTN" type="button" data-bs-toggle="modal"
                            data-bs-target="#reminderBackdrop"">Edit</a></li>
                    <li><a class=" dropdown-item" role="button" data-bs-toggle="modal"
                            data-bs-target="#card_info_modal_ID">Info</a></li>
                    <li><a class="dropdown-item reminder_delete_BTN">Delete</a></li>
                </ul>
            </div>
        </div>
        
        <!-- Reminder Body -->
        <h3 class="pt-2 ps-2">${reminder_title}</h3>
        <p class="pb-2 ps-2">${reminder_desc}</p>
    `;
        if (save_to_db) {
            yield fetch('/reminder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    r_id: reminder_id,
                    r_title: reminder_title,
                    r_desc: reminder_desc,
                    r_color: reminder_color,
                    r_remove_date: reminder_remove_date,
                })
            });
        }
        reminder_div.innerHTML = inner_reminder;
        reminder_area === null || reminder_area === void 0 ? void 0 : reminder_area.append(reminder_div);
    });
}
function reminder_delete(event) {
    var _a;
    console.log('delete action reached (reminder)');
    const closest_target = event.target;
    if (closest_target.classList.contains('reminder_delete_BTN')) {
        const reminder_div = closest_target.closest('.reminders_delete_CID');
        if (!reminder_div)
            return;
        const reminder_stamped_id = reminder_div.dataset.id;
        (_a = document.querySelector(`[data-id="${reminder_stamped_id}"]`)) === null || _a === void 0 ? void 0 : _a.remove();
    }
}
/* Delete Reminder */
document.addEventListener('click', (event) => {
    const closest_target = event.target;
    if (closest_target.classList.contains('reminder_delete_BTN')) {
        const reminder = closest_target.closest('.reminders_delete_CID');
        if (!reminder)
            return;
        const id = reminder.dataset.id;
        fetch(`/reminder/${id}`, { method: 'DELETE' });
        reminder.remove();
        reminder_delete(event);
    }
});
export {};
