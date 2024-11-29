const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors())

const indexRouter = require('./routers/index');
app.use(indexRouter);

app.listen(3000);
console.log('Server running on port 3000');