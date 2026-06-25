import express, { Request, Response } from 'express';
import path from 'path'
import db from './database'

const app = express()
const PORT = 2200;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

/* PAGE HOSTING */
app.get('/',(req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/templates/main.html'))
})

app.get('/MyDashboard',(req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/templates/dash.html'))
})

/* CARD ACTIONS */
app.get('/tasks', (req: Request, res: Response) => {
    const tasks = db.query('SELECT * from cards').all() // tasks = this sql cmd
    res.json(tasks) // here's your data as JSON
})

app.post('/tasks', (req: Request, res: Response) => {
    console.log('POST hit', req.body)
    const {id, title, descript, deadline, prioriti} = req.body
    db.query('INSERT INTO cards VALUES (?, ?, ?, ?, ?)').run(id, title, descript, deadline, prioriti)
    res.json({ success: true })
})

app.put('/tasks/:id', (req: Request, res: Response) => {
    //db.query('UPDATE reminders')
})

app.delete('/tasks/:id', (req: Request, res: Response) => {
    db.query('DELETE FROM cards WHERE id = ?').run(req.params.id as string)
    res.json({ success: true })
})

/* REMINDER ACTIONS */
app.get('/reminder', (req: Request, res: Response) => {
    const reminders = db.query('SELECT * FROM reminders').all()
    res.json(reminders)
})

app.post('/reminder', (req: Request, res: Response) => {
    console.log('POST hit', req.body)
    const {r_id,  r_title, r_desc, r_color, r_remove_date} = req.body
    db.query('INSERT INTO reminders VALUES (?, ?, ?, ?, ?)').run(r_id, r_title, r_desc, r_color, r_remove_date)
    res.json({ success: true })
})

app.delete('/reminder/:id', (req: Request, res: Response) => {
    db.query('DELETE FROM reminders WHERE r_id = ?').run(req.params.id as string)
    res.json({ success: true })
})

/* APP LISTEN */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})