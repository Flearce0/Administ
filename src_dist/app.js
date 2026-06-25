"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
const PORT = 2200;
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.json());
/* PAGE HOSTING */
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/templates/main.html'));
});
app.get('/MyDashboard', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/templates/dash.html'));
});
/* CARD ACTIONS */
app.get('/tasks', (req, res) => {
    const tasks = database_1.default.query('SELECT * from cards').all(); // tasks = this sql cmd
    res.json(tasks); // here's your data as JSON
});
app.post('/tasks', (req, res) => {
    console.log('POST hit', req.body);
    const { id, title, descript, deadline, prioriti } = req.body;
    database_1.default.query('INSERT INTO cards VALUES (?, ?, ?, ?, ?)').run(id, title, descript, deadline, prioriti);
    res.json({ success: true });
});
app.put('/tasks/:id', (req, res) => {
    //db.query('UPDATE reminders')
});
app.delete('/tasks/:id', (req, res) => {
    database_1.default.query('DELETE FROM cards WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});
/* REMINDER ACTIONS */
app.get('/reminder', (req, res) => {
    const reminders = database_1.default.query('SELECT * FROM reminders').all();
    res.json(reminders);
});
app.post('/reminder', (req, res) => {
    console.log('POST hit', req.body);
    const { r_id, r_title, r_desc, r_color, r_remove_date } = req.body;
    database_1.default.query('INSERT INTO reminders VALUES (?, ?, ?, ?, ?)').run(r_id, r_title, r_desc, r_color, r_remove_date);
    res.json({ success: true });
});
app.delete('/reminder/:id', (req, res) => {
    database_1.default.query('DELETE FROM reminders WHERE r_id = ?').run(req.params.id);
    res.json({ success: true });
});
/* APP LISTEN */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
