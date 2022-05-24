const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/getmyid", async (req, res) => {
    //console.log(req.query)
    console.log('address from query' , req.query.wallet_address)
    try {
      const myID = await db.query(`SELECT id from users where wallet_address=$1;`,[req.query.wallet_address])
      if (myID) {
        res.json(myID.rows);
        console.log('found ID', myID.rows[0])
      }

    } catch (error) {

    }

  });

  router.get('/users', async (req, res) => {
    try {
      const data = await db.query(`SELECT * FROM users`)
      if (data) {
        res.json(data.rows)
        console.log(data.rows)
      }
    } catch (error) {
        res
          .status(500)
          .json({ error: err.message });


    }


  })

  router.post("/users", (req, res) => {
    db.query(`SELECT EXISTS(SELECT 1 FROM users WHERE wallet_address='${req.body.wallet_address}')`)
      .then((data) => {
        if(!data.rows[0].exists){
          db.query(`INSERT INTO users (wallet_address) VALUES ('${req.body.wallet_address}') RETURNING id`)
            .then((data) => {
              console.log(data.rows[0].id)
              res.json({user_id : data.rows[0].id})
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
