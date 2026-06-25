export { }

const element_by_id = document.getElementById.bind(document)

async function R_INIT(): Promise<void> {
    console.log('Initialisation Started...')

    try {
        const res = await fetch('/reminder')
        const reminder = await res.json()

        reminder.forEach((reminder: any) => {
            reminder_add(
                reminder.r_id,
                reminder.r_title,
                reminder.r_desc,
                reminder.r_color,
                reminder.r_remove_date,
                false
            )
        });
    } catch (error) {
        console.log('Database error:', error)
    }
}

R_INIT()

element_by_id('reminder_add_ID')?.addEventListener('click', get_values_reminder_add)

function get_values_reminder_add(): void {
    const reminder_id = crypto.randomUUID()
    let reminder_title = (document.getElementById('r_title_input_ID') as HTMLInputElement)?.value ?? ''
    let reminder_desc = (document.getElementById('r_desc_input_ID') as HTMLTextAreaElement)?.value ?? ''
    let reminder_color = (document.getElementById('r_color_input_ID') as HTMLSelectElement)?.value ?? ''
    let reminder_remove_date = '231'

    if (reminder_title === '' || reminder_desc === '') {
        console.log("Error: Please enter a title and description for reminder")
        return
    }
    reminder_add(reminder_id, reminder_title, reminder_desc, reminder_color, reminder_remove_date)
}

async function reminder_add(reminder_id: string, reminder_title: string, reminder_desc: string, reminder_color: string, reminder_remove_date: string, save_to_db: boolean = true): Promise<void> {
    console.log('Reminder Add function reached!')
    const reminder_area = element_by_id('reminder_area_ID')
    const reminder_div = document.createElement('div')
    reminder_div.classList.add('bg_black_solid', 'mb-2', `${reminder_color}`, 'height-200px', 'reminders_CID')
    reminder_div.dataset.id = reminder_id

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
    `

    if (save_to_db) {
        await fetch('/reminder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                r_id: reminder_id,
                r_title: reminder_title,
                r_desc: reminder_desc,
                r_color: reminder_color,
                r_remove_date: reminder_remove_date,
            })
        })
    }

    reminder_div.innerHTML = inner_reminder
    reminder_area?.append(reminder_div)
}

function reminder_delete(event: MouseEvent): void {
    console.log('delete action 2 reached (reminder)')
    const closest_target = event.target as HTMLElement
    if (closest_target.classList.contains('reminder_delete_BTN')) {
        const reminder_div = closest_target.closest('.reminders_delete_CID') as HTMLElement
        if (!reminder_div) return
        const reminder_stamped_id = reminder_div.dataset.id
        document.querySelector(`[data-id="${reminder_stamped_id}"]`)?.remove()
    }
}

/* Delete Reminder */
document.addEventListener('click', (event: MouseEvent) => {
    console.log('delete action 1 reached (reminder)')
    const closest_target = event.target as HTMLElement
    if (closest_target.classList.contains('reminder_delete_BTN')) {
       const reminder = closest_target.closest('.reminders_delete_CID') as HTMLElement
       if (!reminder) return
       const id = reminder.dataset.id

       fetch(`/reminder/${id}`, {method: 'DELETE'})
       
       reminder.remove()
       reminder_delete(event)
    }
})