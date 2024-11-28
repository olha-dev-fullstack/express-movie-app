const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

const indexRouter = require('./routers/index');
app.use(indexRouter);

app.listen(3000);
console.log('Server running on port 3000');