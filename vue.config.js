const fs = require('fs');
const path = require('path');

module.exports = {
  devServer: { // Configura el servidor para usar 'localhost'
    port: 8080,         // Puerto que desees utilizar (por defecto es 8080)
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt')),
    },
  }};