# qr4fun
Quickly generate links to your messages!

API
```
POST /create
{
  "text": "Hi, there!"
}
```
returns url with a message.
```
GET /u/:id
```
Get the message.

* ENV
* DB_HOST - mongodb host. Ex: mongodb://localhost:27017
* HOST - Site hosted URL. Ex: example.com
* PORT - Listen on port.
