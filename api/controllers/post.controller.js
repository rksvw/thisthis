const { db } = require("../db/sql");

async function getPosts(req, res) {
    const query = "SELECT * FROM access_article";
    db.query(query, (err, results) => {
        if (err) {
            console.log("Error: ", err.stack);
            return;
        }

        console.log(results[0]);
        res.status(200).send(results[0]);
    })
}

module.exports = {
    getPosts
}