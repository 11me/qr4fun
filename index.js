const { insert, getTextByID } = require('./db');
const { html } = require('./template');
const bodyParser = require('body-parser');
const app = require('express')();
const sanitizeHtml = require('sanitize-html');

const jsonParser = bodyParser.json();

const PORT = process.env.PORT || 8888;
const HOST = process.env.HOST || 'localhost';

const pattern = /[a-z0-9]+/;

app.get('/', async (_, res) => {
  console.log('GET /')
  res.status(200).send(
    html('<a href="https://t.me/qr4fun_bot?start=start">telegram: @qr4fun_bot</a>')
  );
});

app.get('/u/:id', async (req, res) => {
  const id = req.params.id.trim();
  // get text by hash from db
  if (pattern.test(id)) {
    const doc = await getTextByID(id);
    // send html page with text
    if (doc?.text) {
      res.status(200).send(
        html(doc.text)
      );
      console.log(`GET /u/${id}`);
      return
    }
  }
  console.log(`GET /u/${id}`);
  res.sendStatus(404);
});

app.post('/create', jsonParser, async (req, res) => {

  const data = req.body;

  data.text = sanitizeHtml(data.text,{
    allowedTags: [],
    allowedAttributes: {},
    allowedIframeHostnames: []
  });

  const id = await insert({
    ...data,
    timestamp: new Date()
  });
  const url = `http://${HOST}/u/${id}`

  console.log(`POST ${data}`)
  res.json({
    url
  });

});


app.listen(PORT, '0.0.0.0', null, () => {
  console.log(`Listening on port: ${PORT}`)
});
