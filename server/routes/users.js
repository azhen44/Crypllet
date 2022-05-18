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

  return router;
};
