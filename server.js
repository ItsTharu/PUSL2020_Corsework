const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

let userName = "";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

// Home Page (GET)
app.get("/", (req, res) => {
  res.send(`
    <html>
  <head>
  <link rel="stylesheet" href="/style.css">
  </head>

  <body>
    <div class="card">
      <h1>Welcome</h1>
      <p>Please enter your name to receive a greeting.</p>

      <form action="/submit" method="POST">
        <input type="text" name="username" placeholder="Enter your name" required>
        <button type="submit">Get Greeting</button>
      </form>
    </div>
  </body>
  </html>
  `);
});

// POST request - take user name
app.post("/submit", (req, res) => {
  userName = req.body.username;
  res.redirect("/greet");
});

// GET request - show greeting
app.get("/greet", (req, res) => {
  res.send(`
    <html>
  <head>
  <link rel="stylesheet" href="/style.css">
  </head>

  <body>
    <div class="card">
      <h1>Hello, ${userName}!</h1>
      <a href="/">Go Back</a>
    </div>
  </body>
  </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});