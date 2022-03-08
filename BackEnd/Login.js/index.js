const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();
const DB = require("./schema");
const uploadSchema = require("./documentSchema");
const requestSchema = require("./requestSchema");
const emailSchema = require("./emailSchema");
const bcrypt = require("bcryptjs");
const port = process.env.PORT || 5000;
const privateKey = process.env.secretKey;
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("HEELLO");
});

mongoose.connect(process.env.password);

// const schema = Joi.object({
//   name: Joi.string().min(6).required(),
//   email: Joi.string().min(6).required().email(),
//   password: Joi.string().min(6).required(),
//   phone: Joi.number().min(10).required(),
//   gender: Joi.string().required(),
// });

app.post("/register", async (req, res) => {
  const personData = req.body;
  const { email, name } = req.body;
  const data = await DB.findOne({ email: email });
  if (data) {
    return res.status(400).send({ msg: "Email Already Exits try Another" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(personData.password, salt);
  DB.create({ ...personData, password: hashedPassword }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
      c;
    }
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  DB.findOne({ email: email }, async (err, data) => {
    if (data) {
      const { password, email } = data;
      const correctPassword = await bcrypt.compare(req.body.password, password);
      if (correctPassword) {
        const jwtToken = jwt.sign({ user: data._id }, privateKey, {
          expiresIn: "1440min",
        });
        res.status(200).send({ _token: jwtToken, user: data });
      } else {
        res.status(400).send({ msg: "password is notvalid" });
      }
    } else {
      res.status(400).send({ msg: "password is notvalid" });
    }
  });
});

app.post("/esign/documents/all", async (req, res) => {
  uploadSchema.create(
    {
      clicks: [],
      message: "File uploaded successfully",
      status: "success",
      naturalURL: "",
      trackingURL: "",
    },
    (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});

app.post("/eSignForUs/sign", (req, res) => {
  // console.log(req.body);
  requestSchema.create(
    {
      email: req.body.email,
      fileId: req.body.fileId,
      signers: req.body.signers,
      title: req.body.title,
      unsignedDocument: req.body.unsignedDocument,
      userId: req.body.userId,
    },
    (err, data) => {
      if (err) {
        res.status(400).send("Error");
      } else {
        res.status(200).send(data);
      }
    }
  );
});

app.post("/esign/request/id", (req, res) => {
  emailSchema.create({}, (err, data) => {
    if (err) {
      res.status(400).send({ msg: "ERROR" });
    } else {
      res.status(200).send(data);
    }
  });
});

// app.put("/filesuat.esignfor.us/eSignForUs/sign", (req, res) => {
//   emailsSchema.create({});
// });

app.listen(port);
