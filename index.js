const { insert, getTextByID } = require('./db');
const { html } = require('./template');
const bodyParser = require('body-parser');
const app = require('express')();

const jsonParser = bodyParser.json();

const PORT = process.env.PORT || 8888
const HOST = process.env.HOST || 'localhost'

const pattern = /[a-z0-9]+/

app.get('/u/:id', async (req, res) => {
  const id = req.params.id.trim();
  // get text by hash from db
  if (pattern.test(id)) {
    const doc = await getTextByID(id);
    // send html page with text
    if (doc.text) {
      res.status(200).send(
        html(doc.text)
      );
      return
    }
  }
  res.sendStatus(404);
});

app.post('/create', jsonParser, async (req, res) => {

  const data = req.body;
  const id = await insert({
    ...data,
    timestamp: new Date()
  });
  const url = `http://${HOST}/u/${id}`

  res.json({
    url
  });

});


app.listen(PORT, '0.0.0.0', null, () => {
  console.log(`Listening on port: ${PORT}`)
});
