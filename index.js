const express = require("express");
const axios = require("axios");
const md5 = require("md5");
const uid2 = require("uid2");
const cors = require("cors");

require("dotenv").config();

const app = express();

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

// Authentication for Server-Side Applications
// Server-side applications must pass two parameters in addition to the apikey parameter:

// ts - a timestamp (or other long string which can change on a request-by-request basis)
// hash - a md5 digest of the ts parameter, your private key and your public key (e.g. md5(ts+privateKey+publicKey)
// For example, a user with a public key of "1234" and a private key of "abcd" could construct a valid call as follows: http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150
//(the hash value is the md5 digest of 1abcd1234) => uid2(8)

// ts => 1
// publicKey => 1234
// hash => ffd275c5130566a2916217b101f26150

// ROUTE COMICS
app.use(cors());

app.get("/comics", async (req, res) => {
  try {
    //1) obtenir le ts (dans la requête car il doit être généré à chaque requête)
    const ts = uid2(8);
    const hash = md5(ts + privateKey + publicKey);

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ROUTE CHARACTERS

app.get("/characters", async (req, res) => {
  try {
    const ts = uid2(8);
    const hash = md5(ts + privateKey + publicKey);
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("server is started");
  //   console.log(`Server Started on port ${process.env.PORT}`);
});

//ROUTE CHARACTERS ID

app.get("/characters/:id", async (req, res) => {
  try {
    const ts = uid2(8);
    const hash = md5(ts + privateKey + publicKey);
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters/id=${id}?limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("server is started");
  //   console.log(`Server Started on port ${process.env.PORT}`);
});
