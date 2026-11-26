const express = require('express');
const app = express();

app.use(express.json());           // parse JSON bodies

let tasks = [{ id: 1, title: 'Learn Express' }];
let nextId = 2;

// view all tasks
app.get('/tasks', (req, res) => res.json(tasks));

// add a task
app.post('/tasks', (req, res) => {
    const title = req.body?.title;
    if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ error: 'title is required' });
    }
    const task = { id: nextId++, title: title.trim() };
    tasks.push(task);
    res.status(201).json(task);
});

// delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Task not found' });
    tasks.splice(index, 1);
    res.sendStatus(204);
});

// errors such as invalid JSON (must be last)
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
