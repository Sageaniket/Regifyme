const express = require("express");
const app = express();
var cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
// Connection URL
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
// Database Name
const dbName = "userDetails";
let collection = null;

const db = client.db(dbName);
collection = db.collection("userData");

const port = 4000;
app.use(express.json());
app.use(cors());

app.get("/setData", async (req, res) => {
  console.log(req.body);
  let userData = req.body.userData;
  await collection.insertOne(userData);
  res.send("Hello World!");
});

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");

  // the following code examples can be pasted here...

  return "done.";
}

app.post("/setUser", async (req, res) => {
  let userData = req.body.userData;
  const response = await collection.insertOne(userData);
  res.send({ ...userData, _id: response.insertedId });
});

// for showing the user data in front end
app.get("/showData", async (req, res) => {
  // let data = req.body.users;
  // console.log("show data called");
  const d = await collection.find({}).toArray();
  // console.log(d);
  res.json({ outPut: d });
  // collection.find((err, data) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   } else {
  //     res.status(200).send(data);
  //   }
  // });
});

// for deleting user data
app.delete("/deleteData/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const result = await collection.deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
});

//update user data
//update user data
app.put("/updateData/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body.userData;
  delete updatedData._id;
  // console.log(id, updatedData);
  const result = await collection.updateOne(
    {
      _id: new ObjectId(id),
    },
    { $set: updatedData }
  );
  res.send(result);
});

app.listen(port, () => {
  main();
  console.log(`Example app listening on port ${port}`);
});
