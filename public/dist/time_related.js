console.log("File has loaded!");
const element_by_id = document.getElementById.bind(document);
function time_msg() {
    var _a, _b;
    let Hour = new Date().getHours();
    let Min = new Date().getMinutes();
    const time_msgs = [
        { min_time: 0, max_time: 0, msg: 'Go to sleep Flearce!' },
        { min_time: 1, max_time: 7, msg: 'Early Mornings Flearce!' },
        { min_time: 8, max_time: 11, msg: 'Good Morning Flearce!' },
        { min_time: 12, max_time: 12, msg: 'Mid-day Flearce!' },
        { min_time: 13, max_time: 16, msg: 'Good Afternoon Flearce!' },
        { min_time: 17, max_time: 19, msg: 'Good Evening, Flearce!' },
        { min_time: 20, max_time: 23, msg: 'Good Night Flearce!' },
    ];
    return (_b = (_a = time_msgs.find(msgs => Hour >= msgs.min_time && Hour <= msgs.max_time)) === null || _a === void 0 ? void 0 : _a.msg) !== null && _b !== void 0 ? _b : 'Error in time detection';
}
function time_bg() {
    let Hour = new Date().getHours();
    const task_board_bg = element_by_id('time_change_bg_id');
    const body = element_by_id('body_html_ID');
    const title_txt = element_by_id('title_txt_ID');
    const all_bgs = ['task_area_bg_early_morning', 'task_area_bg_morning', 'task_area_bg_noon', 'task_area_bg_afternoon', 'task_area_bg_dusk', 'task_area_bg_night'];
    task_board_bg === null || task_board_bg === void 0 ? void 0 : task_board_bg.classList.remove(...all_bgs);
    if (Hour > 23 && Hour <= 0) {
        task_board_bg.classList.add('task_area_bg_night');
        body === null || body === void 0 ? void 0 : body.classList.add('body_bg_night');
        title_txt === null || title_txt === void 0 ? void 0 : title_txt.classList.add('txt_blue');
    }
    if (Hour > 0 && Hour <= 7) {
        task_board_bg.classList.add('task_area_bg_early_morning');
        body === null || body === void 0 ? void 0 : body.classList.add('body_bg_early_morning');
        title_txt === null || title_txt === void 0 ? void 0 : title_txt.classList.add('txt_blue');
    }
    if (Hour >= 8 && Hour <= 11) {
        task_board_bg.classList.add('task_area_bg_morning');
        body === null || body === void 0 ? void 0 : body.classList.add('body_bg_morning');
        title_txt === null || title_txt === void 0 ? void 0 : title_txt.classList.add('txt_green');
    }
    if (Hour == 12) {
        task_board_bg.classList.add('task_area_bg_noon');
        body === null || body === void 0 ? void 0 : body.classList.add('body_bg_morning');
        title_txt === null || title_txt === void 0 ? void 0 : title_txt.classList.add('txt_green');
    }
    if (Hour >= 13 && Hour <= 16) {
        task_board_bg.classList.add('task_area_bg_afternoon');
        body === null || body === void 0 ? void 0 : body.classList.add('body_bg_afternoon');
        title_txt === null || title_txt === void 0 ? void 0 : title_txt.classList.add('txt_red');
    }
    if (Hour >= 17 && Hour <= 19) {
        task_board_bg.classList.add('task_area_bg_dusk');
        body === null || body === void 0 ? void 0 : body.classList.add('body_bg_night');
        title_txt === null || title_txt === void 0 ? void 0 : title_txt.classList.add('txt_blue');
    }
    if (Hour >= 20 && Hour <= 23) {
        task_board_bg.classList.add('task_area_bg_night');
        body === null || body === void 0 ? void 0 : body.classList.add('body_bg_night');
        title_txt === null || title_txt === void 0 ? void 0 : title_txt.classList.add('txt_blue');
    }
}
function html_change_msg_bg() {
    element_by_id('msg_time_change_id').innerHTML = time_msg();
}
html_change_msg_bg();
time_bg();
setInterval(html_change_msg_bg, 60000);
setInterval(time_bg, 60000);
export {};
