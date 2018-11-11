# Doc.js

Doc.js is a clone of google doc, but it current version it missed some key functionality.

_Feel free to fork the repo and create something really cool with it_ :smirk:

## Installation
Doc.js requires [Node.js](https://nodejs.org/).
Install the dependencies and start the server.

```sh
$ npm install
$ nodemon
```
It will start server in `localhost`, on port `3000`.
Server is also running [here](https://salty-ocean-22806.herokuapp.com/) using _heroku_ deployment.

## REST api
> if you want to use server on localhost just switch `https://salty-ocean-22806.herokuapp.com` to `http://localhost:3000` in every request. __Remember that you have to change `https` to `http`!!!__
#### Get all documents:
__[GET]__ `https://salty-ocean-22806.herokuapp.com/doc/all`
example response __[Status: 200]__
```json
[
    {
        "content": "",
        "locked": false,
        "_id": "5be86807d650091df61121bc",
        "user_id": "2",
        "name": "pierwszy doc user 2",
        "date": "2018-11-11T17:33:59.616Z",
        "__v": 0
    },
    {
        "content": "",
        "locked": false,
        "_id": "5be86845bb0a5a1e5abec8d6",
        "user_id": "2",
        "name": "drugi doc user 2",
        "date": "2018-11-11T17:35:01.714Z",
        "__v": 0
    }
]
```
response on fail __[Status: 500]__
```json
{
    "message": "Error while getting docs."
}
```

#### Get one document using its name:
__[GET]__ `https://salty-ocean-22806.herokuapp.com/doc/pierwszy doc`
example response: __[Status: 200]__
```json
{
    "content": "",
    "locked": false,
    "_id": "5be86807d650091df61121bc",
    "user_id": "2",
    "name": "pierwszy doc user 2",
    "date": "2018-11-11T17:33:59.616Z",
    "__v": 0
}
```
response if document does not exists __[Status: 404]__
```json
{
    "message": "Document with given name doesn't exists"
}
```
response on fail __[Status: 500]__
```json
{
    "message": "Error while getting doc."
}
```

#### Create new document:
>Document is not locked after creation (locked flag is set to _false_).

__[POST]__ `https://salty-ocean-22806.herokuapp.com/doc/add` with body:
```json
{
	"user_id": "1",
	"name": "czwarty doc user 1"
}
```
`user_id` should be user_id or email from firebase
example resposne __[Status: 201]__
```json
{
    "message": "Doc created sucesfully!"
}
```
response if document with given name already exists __[Status: 405]__
```json
{
    "message": "Doc with given name already exists!"
}
```
response on fail __[Status: 500]__
```json
{
    "message": "Error while creating new doc."
}
```

#### Add/Update doc content using doc name
__[PUT]__ `https://salty-ocean-22806.herokuapp.com/doc/pierwszy doc` with body:
```json
{
	"content":"nowy content3"
}
```
example resposne __[Status: 200]__
```json
{
    "message": "Document updated sucesfully."
}
```
response on fail __[Status: 500]__
```json
{
    "message": "Error while updating doc."
}
```

#### Add/Update doc lock state using doc name
__[PUT]__ `https://salty-ocean-22806.herokuapp.com/doc/pierwszy doc` with body:
```json
{
	"locked":"true"
}
```
example resposne __[Status: 200]__
```json
{
    "message": "Document updated sucesfully."
}
```
response on fail __[Status: 500]__
```json
{
    "message": "Error while updating doc."
}
```

#### Delete doc using doc name
__[DELETE]__ `https://salty-ocean-22806.herokuapp.com/doc/czwarty doc user 1`
example resposne __[Status: 200]__
```json
{
    "message": "Document deleted sucesfully."
}
```
response if doc does not exists __[Status: 404]__
```json
{
    "message": "Document with given name doesn't exists."
}
```
response on fail __[Status: 500]__
```json
{
    "message": "Error while deleting doc."
}
```