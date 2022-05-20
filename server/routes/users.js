const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // router.get("/users", (req, res) => {
  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       console.log(data.rows)
  //       res.json(data.rows);
  //       res.status(200)
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  router.get('/users', async (req, res) => {
    try {
      const data = await db.query(`SELECT * FROM users;`)
      res.json(data.rows)
      res.status(200)
      console.log(data.rows)
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
