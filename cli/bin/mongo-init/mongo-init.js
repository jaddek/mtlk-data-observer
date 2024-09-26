const user = "metlink";
const pwd = "metlink"
const dbName = "metlink";
const meta = "meta"

if (db.getUser(user).length === 0) {
    console.log(`User: "${user}" created`);

    db.createUser({
        user: user,
        pwd: pwd,
        roles: [
            {role: "readWrite", db: "metlink"}
        ]
    })
} else {
    console.log(`User: "${user}" already found`);
}

db = db.getSiblingDB(dbName);
if (db.getCollectionNames().indexOf(meta) < 0) {
    db.createCollection(meta);

    db.meta.insertOne({version: "1", date: new Date()});
    console.log(`Collection: "${meta}" created and first data persists`);
} else {
    console.log(`Collection: "${meta}" already exists`);
}
