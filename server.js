const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/rocketmiles-test'));

app.get('/', (req,res) => {
  res.sendFile(path.join('./dist/rocketmiles-test/index.html'));
});

app.listen(process.env.PORT || 8080);
