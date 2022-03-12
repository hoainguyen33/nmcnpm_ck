require('dotenv').config();

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();

const port = process.env.PORT || 8080;
const host = process.env.HOST || "http://localhost"

app.listen(port, ()=>{
    console.log(`Mở ứng dụng tại ${host}:${port}`);
});

// app.use('/api', createProxyMiddleware({ target: 'https://be-nmcnpm-17.herokuapp.com', changeOrigin: true}));

app.use(express.static(path.join(__dirname, "/../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});