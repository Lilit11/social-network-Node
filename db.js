const { compareSync } = require("bcryptjs");
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
async function createDb() {
  try {
    await client.connect();
    const usersDB = client.db("users");
    return usersDB;
  } catch (err) {
    console.error("Error connecting to database:", err);
    throw err;
  }
}

async function addUser(user) {
  try {
    const db = await createDb();
    const users = db.collection("users");
    await users.insertOne(user);
  } catch (err) {
    console.error("Error adding user:", err);

    throw err;
  } finally {
    await client.close();
  }
}

async function getAllUsers() {
  try {
    const db = await createDb();
    const users = await db.collection("users").find().toArray();
    return users;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
async function getUserByLogin(login) {
  try {
    const db = await createDb();
    const users = await db.collection("users").findOne({ login: login });
    return users;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
async function getUserById(id) {
  try {
    const db = await createDb();
    const objectId = new ObjectId(id);
    const user = await db.collection("users").findOne({ _id: objectId });
    return user;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
const deleteUser = async (id) => {
  try {
    const db = await createDb();
    const objectId = new ObjectId(id);
    await db.collection("users").deleteOne({ _id: objectId });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
const updateUser = async (id, name, email) => {
  try {
    const db = await createDb();
    const objectId = new ObjectId(id);
    await db
      .collection("users")
      .updateOne({ _id: objectId }, { $set: { name: name, email: email } });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};
module.exports = {
  addUser,
  getAllUsers,
  getUserByLogin,
  getUserById,
  deleteUser,
  updateUser,
};
