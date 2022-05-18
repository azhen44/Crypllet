const express = require('express');
//import { findIDByWallet } from '../utils/findIDByWallet';
const router = express.Router();

module.exports = (db) => {
  router.get("/user_coins", (req, res) => {
    db.query(`SELECT * FROM user_coins;`)
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/user_coins", (req, res) => {
    db.query(`SELECT EXISTS(SELECT 1 FROM user_coins WHERE coin_id='${req.body.coin}');`)
    .then (data => {
      if(!data.rows[0].exists){
        db.query(`SELECT id FROM users WHERE wallet_address='${req.body.wallet_address}';`)
        .then (data => {
          db.query(`INSERT INTO user_coins (user_id, coin_id) VALUES (${data.rows[0].id}, '${req.body.coin}')`)
          .then(() => {
            res.status(200)
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
        })

      }
    })

  })





  return router;
};
