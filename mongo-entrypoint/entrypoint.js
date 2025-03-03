var db = connect("mongodb://deeporigin:1234@localhost:27017/admin");

db = db.getSiblingDB('urlshortener');

db.createUser(
    {
        user: "deeporiginusr",
        pwd: "123456",
        roles: [ { role: "readWrite", db: "urlshortener"} ],
        passwordDigestor: "server",
    }
)