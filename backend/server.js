require('dotenv').config();

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const host = process.env.HOST || "http://localhost"

const { Login } = require('../mock/account')

app.use(cors())
app.use(bodyParser.json())

app.listen(port, ()=>{
    console.log(`Mở ứng dụng tại ${host}:${port}`);
});

// app.use('/api', createProxyMiddleware({ target: 'https://be-nmcnpm-17.herokuapp.com', changeOrigin: true}));
app.use(express.static(path.join(__dirname, "/../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});
// mock
app.post("/api/v1/account/sign-in", (req, res) => {
  if(Login(req.body.email, req.body.password)){
    res.send({token:"123"})
  } else {
    res.status("404").send({error: "email or password invalid"})
  }
})