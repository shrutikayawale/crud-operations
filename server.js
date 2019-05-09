let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let db = require('./db');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (request, response) => response.sendFile(path.resolve(__dirname + '/index.html')));
app.get('/add', (request, response) => response.sendFile(path.resolve(__dirname + '/add.html')));

app.post('/addPost', (request, response) => {
    db.mongoInsertUsers(request.body.name, request.body.email, request.body.mobile)
            .then(result => {
                response.sendFile(path.resolve(__dirname + '/index.html'))
            })
            .catch(error => {
                response.send(200, `Error`);
            })
});

app.get('/getDetails', (request, response) => {
    db.mongoGetUsers()
            .then(result => {
                response.send(200,result);
            })
            .catch(error => {
                response.send(200, `Error`);
            })
});

app.post('/deleteAPI', (request, response) => {
    console.log("deleteAPI..........",request.body.id);
    db.mongoDeleteUser(request.body.id)
            .then(result => {
                console.log(" deleteAPI .......",result);

                response.send(200,result);
            })
            .catch(error => {
                console.log("deleteAPI...deleteAPI.......", error);
                response.send(200, `Error`);
            })
});

app.post('/getUserById', (request, response) => {
    db.mongoGetUserById(request.body.id)
            .then(result => {
                response.send(200,result);                
            })
            .catch(error => {
                response.send(200, `Error`);
            })
});

app.get('/update', (request, response) => {
    response.sendFile(path.resolve(__dirname + '/updateGet.html'))
});

app.post('/updatePost', (request, response) => {
    let id = request.url.split('=')[1];
    
    let updateQuery = {
        username : request.body.name,
        email: request.body.email,
        mobile: request.body.mobile
    };
    
    db.mongoUpdateUser({ $set: updateQuery }, id)
            .then(result => {
                response.sendFile(path.resolve(__dirname + '/index.html'))
            })
            .catch(error => {
                response.send(200, `Error`);
            })
});

(init = () => {
    app.listen(1414, () => {
        console.log(`server started `);
    });
})();


