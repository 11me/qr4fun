const { MongoClient, ObjectId } = require('mongodb');

const DB_HOST = process.env.DB_HOST || 'mongodb://localhost:27017';
const DB_NAME = 'qr4fun';
const collname = 'links';

const mongo = new MongoClient(DB_HOST);

let client = null;
(async () => {
  client = await mongo.connect();
})();

exports.insert = async function(data) {
  try {
    const res = await client.db(DB_NAME).collection(collname).insertOne(data);
    return res.insertedId.toString();
  } catch (e) {
    console.log(e);
  }
}

exports.getTextByID = async function(id) {
  const client = await mongo.connect();
  try {
    const data = await client.db(DB_NAME).collection(collname).findOne({_id: ObjectId(id)});

    return data
  } catch (e) {
    console.log(e);
  }
}
