//We can utilized Mongo using "Mongoose" or "MongoDb" modules

//Using MongoDb
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
let mongoDbUrl = 'mongodb://localhost:27017';

async function mongoGetUsers () {
    let client = await MongoClient.connect(mongoDbUrl, { useNewUrlParser: true });
        let db = client.db('homesite');
        try {
            const res = await db.collection('users').find({}).toArray();
            return res;
        }
        catch (err) {
            client.close();
        }
};

async function mongoGetUserById (id) {
    let client = await MongoClient.connect(mongoDbUrl, { useNewUrlParser: true });
        let db = client.db('homesite');
        try {
            const res = await db.collection('users').findOne({_id: new mongodb.ObjectID(id)});
            return res;
        }
        catch (err) {
            client.close();
        }
};

async function mongoInsertUsers (name, email, mobile) {
    let client = await MongoClient.connect(mongoDbUrl, { useNewUrlParser: true });
        let db = client.db('homesite');
        try {
            const res = await db.collection('users').insertOne({"username":name,"email":email,"mobile":mobile});
            return res;
        }
        catch (err) {
            client.close();
        }
};

async function mongoDeleteUser (id) {
    let client = await MongoClient.connect(mongoDbUrl, { useNewUrlParser: true });
        let db = client.db('homesite');
        try {
            const res = await db.collection('users').deleteOne({_id: new mongodb.ObjectID(id)});
            return res;
        }
        catch (err) {
            client.close();
        }
};

async function mongoUpdateUser (updateQuery, id) {
    let condition = {_id: new mongodb.ObjectID(id)};
    let client = await MongoClient.connect(mongoDbUrl, { useNewUrlParser: true });
        let db = client.db('homesite');
        try {
            const res = await db.collection('users').findOneAndUpdate(condition, updateQuery);
            return res;
        }
        catch (err) {
            client.close();
        }
};

module.exports = { mongoGetUsers, mongoInsertUsers, mongoDeleteUser, mongoGetUserById, mongoUpdateUser };