const express = require('express')
const cors = require('cors')
const connectDB = require('./configs/factoryDB')


//const employeesRouter = require('./routers/employeesRouter');
const authRouter = require('./routers/authRouter');
const welcomeRouter = require('./routers/welcomeRouter');
const departmentsRouter = require('./routers/departmentsRouter');

const app = express();
const port = 8000;

connectDB();

app.use(cors());
app.use(express.json());


/*Routers */
//app.use('/employees', employeesRouter);
app.use('/auth', authRouter);
app.use('/welcome', welcomeRouter);
app.use('/departments', departmentsRouter);



app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
});