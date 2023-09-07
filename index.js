const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());        // Avoid CORS errors in browsers
app.use(express.json()) // Populate req.body

const NOT_FOUND = -1
const widgets = [
    { id: 1, name: "Cizzbor", price: 29.99 },
    { id: 2, name: "Woowo", price: 26.99 },
    { id: 3, name: "Crazlinger", price: 59.99 },
]

app.get('/widgets', (req, res) => {
    res.send(widgets)
})

app.get('/widgets/:id', (req, res) => {
    const getIndex = widgets.findIndex(w => w.id === parseInt(req.params.id))
    if (getIndex === NOT_FOUND) {
        return res.status(404).send({ error: "Widget not found" })
    }
    res.send(widgets[getIndex])
})

app.post('/widgets', (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    const newId = Math.max(...widgets.map((widget) => widget.id)) + 1
    const newWidget = {
        id: newId,
        price: req.body.price,
        name: req.body.name
    }
    widgets.push(newWidget)
    res.status(201).location('localhost:8080/widgets/' + newId).send(newWidget)
})

app.delete('/widgets/:id', (req, res) => {
    const deleteIndex = widgets.findIndex(w => w.id === parseInt(req.params.id))
    if (deleteIndex === NOT_FOUND) {
        return res.status(404).send({ error: "Widget not found" })
    }
    widgets.splice(deleteIndex, 1)
    res.status(204).send()
})


app.listen(8080, () => {
    console.log(`API up at: http://localhost:8080`)
})