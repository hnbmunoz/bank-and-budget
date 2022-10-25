const express = require ('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.send("<h1>Server has Started</h1>")
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server has Started");
})