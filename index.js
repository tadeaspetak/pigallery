const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    const names = fs.readdirSync(path.join(__dirname, '/public/photos'));
    const photos = names.map(name => {
        const [n, _] = name.split('.');
        const [pos, time] = n.split('-');
        return {
            name,
            time
        };
    })
    res.render('pages/index', { photos })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})