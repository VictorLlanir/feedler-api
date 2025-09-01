import express from 'express'
import Parser from 'rss-parser';

const app = express()
const port = 5055


app.get('/', async (req, res) => {
    let parser = new Parser();
    let feed = await parser.parseURL('https://inescarrieres.substack.com/feed');
    let template = `
        <div>
            <h1>${feed.title}</h1>
            <p>${feed.description}</p>
        </div>
    `;

    feed.items.forEach(item => {
        console.log(item)
        template += `
            <div>
                <h2>${item.title}</h2>
                <p>${item.link}</p>
            </div>
        `;
    });
    res.send(template)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}).on('error', (err) => {
    console.error('Erro ao iniciar o servidor:', err)
})
