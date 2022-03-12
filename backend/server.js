require('dotenv').config();

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();

const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`Server bắt đầu tại localhost:${port}`);
});

// app.use('/api', createProxyMiddleware({ target: 'http://localhost:8081', changeOrigin: true}));

app.use(express.static(path.join(__dirname, "/../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});