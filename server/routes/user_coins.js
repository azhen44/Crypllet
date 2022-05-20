const e = require('express');
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/:id/user_coins", (req, res) => {
    console.log(req.params.id)

    db.query(`SELECT coin_id FROM user_coins WHERE user_id='${req.params.id}';`)
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.post("/user_coins", async (req, res) => {
    try {
      const isExist = await db.query(`SELECT EXISTS(SELECT 1 FROM user_coins WHERE coin_id=$1);`,[req.body.coin])
        if (!isExist.rows[0].exists) {
          const userID = await db.query(`SELECT id FROM users WHERE wallet_address=$1;`,[req.body.wallet_address])
          await db.query(`INSERT INTO user_coins (user_id, coin_id) VALUES ($1, $2)`,[userID.rows[0].id, req.body.coin])
          res.sendStatus(200)
        } else return
    } catch (error) {
      console.log(error)
    }
  })

  router.delete("/del/user_coins", async (req, res) => {
    try {
      const isExist = await db.query(`SELECT EXISTS(SELECT 1 FROM user_coins WHERE coin_id=$1);`,[req.body.coin])
        if (isExist.rows[0].exists) {
          const userID = await db.query(`SELECT id FROM users WHERE wallet_address=$1;`,[req.body.wallet_address])
          //console.log(req.body)
          await db.query(`DELETE FROM user_coins WHERE coin_id=$2 AND user_id=$1 `,[userID.rows[0].id, req.body.coin])
          res.sendStatus(200)
        } else return
    } catch (error) {
      console.log(error)
    }
  })



  return router;
};
