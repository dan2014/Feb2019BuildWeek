const express = require("express");
const router = express.Router();
const db = require("./dbFunctions");
const moment = require("moment");
// const joi = require("joi");
// const randomizer = require("randomatic");
// const nodemailer = require("nodemailer");
router.get("/", async (req, res) => {
    try {
      let user = await db.getMentor(req.decoded);
      delete user.password
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: `Server error`, error: err });
    }
  });

router.get("/user", async (req, res) => {
    try {
      let user = await db.getMentor(req.decoded);
      delete user.password
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: `Server error`, error: err });
    }
  });

router.get("/users", async (req, res) => {
try {
    const users = await db.getMentors();
    res.status(200).json(users);
} catch (err) {
    console.log(err.message);
    res.status(500).json({ message: `Server error`, error: err });
}
});

// Maybe have some control flow that can use the sender ID or email and the recipient ID or email
router.post("/message", async (req, res) => {
    req.body.sender = req.session.user.id
    // req.body.timeReceived = moment().format('YYYY/MM/D hh:mm:ss SSS')
    req.body.timeReceived = moment().format('YYYY/MM/D')
    console.log(req.body)
    try {
        const message = await db.submitMessage(req.body);
        res.status(200).json(message);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: `Server error`, error: err });
    }
    });

//{ [Error: SQLITE_ERROR: table usersmessages has no column named message] errno: 1, code: 'SQLITE_ERROR' }

router.get("/get-messages", async (req, res) => {
    try {
        const messages = await db.getOwnMessages(req.decoded);
        res.status(200).json(messages);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: `Server error`, error: err });
    }
    });

router.get("/get-groups", async (req, res) => {
    try {
        const groups = await db.getOwnGroups(req.decoded);
        res.status(200).json(groups);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: `Server error`, error: err });
    }
    });

router.get("/get-clients", async (req, res) => {
    try {
        const groups = await db.getOwnClients(req.decoded);
        res.status(200).json(groups);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: `Server error`, error: err });
    }
    });

router.get("/logout",(req,res) => {

    res.status(200).send("<h1>You have successfully logged out</h1>");
  })


module.exports = router;