const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/user_coins", (req, res) => {
    db.query(`SELECT * FROM user_coins;`)
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

  router.post("/user_coins", (req, res) => {
    const test  = req.body;
    console.log('does it work', req.body)


    db.query(`INSERT INTO user_coins (user_id, coin_id) VALUES (1, '${req.body.coin}')`)
    .then(() => {
      res.status(200)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });


  })

  return router;
};
