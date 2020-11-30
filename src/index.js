const morgan = require('morgan');
const express = require('express');
const app = express();
const port = 3000;
const test = require('./routes/test');
const inicio = require('./routes/inicio');
//middleware
const index = require('./middleware/index');
const notFound = require('./middleware/notFound');
const cors = require('./middleware/cors');


app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({    extended: true  }));

app.get("/", index);
app.use("/inicio" , inicio);
app.use("/test",test);

app.use(notFound);

app.listen(process.env.PORT || port, () => {
  console.log(`server is running`);
});