const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/users", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        console.log(data.rows)
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/users", (req, res) => {
    db.query(`SELECT EXISTS(SELECT 1 FROM users WHERE wallet_address='${req.body.wallet_address}')`)
      .then((data) => {
        if(!data.rows[0].exists){
          db.query(`INSERT INTO users (wallet_address) VALUES ('${req.body.wallet_address}')`)
            .then(() => {
              res.status(200)
            })
            .catch(err => {
              res
              .status(500)
              .json({ error: err.message });
            });
          }
       })
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      });
  })

  

  return router;
};
