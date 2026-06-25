const element_by_id = document.getElementById.bind(document);
/* Date */
function get_date() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let Day = `${day}`;
    let Month = `${month}`;
    if (month >= 1 && month <= 9)
        Month = `0${month}`;
    if (day >= 1 && day <= 9)
        Day = `0${day}`;
    return `${Day}/${Month}/${year}`;
}
document.getElementById('date_card_area_ID').innerHTML = get_date();
/* UNDER CONSTRUCTION */
/* Task Remaining */
const task_remain_area = element_by_id('tasks_remaining_ID');
let task_remain_num = 0;
if (task_remain_num === 0)
    task_remain_area.innerHTML = '0';
export function get_tasks_remaining() {
    task_remain_num += 1;
    task_remain_area.innerHTML = `${task_remain_num}`;
}
