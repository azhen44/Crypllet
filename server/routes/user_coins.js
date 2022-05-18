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

  return router;
};
