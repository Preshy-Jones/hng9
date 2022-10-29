const express = require("express");
const app = express();

// Create an express api endpoint that returns the following in json response:  { "slackUsername**": "Precious Adedibu", "backend": true, "age": 24, "bio": "I just want to build cool software and retire on a beach watching the sunset everyday." }

app.get("/", (req, res) => {
  res.json({
    slackUsername: "Preshy Jones",
    backend: true,
    age: 24,
    bio: "I just want to build cool software and retire on a beach watching the sunset everyday.",
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
