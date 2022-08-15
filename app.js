require('dotenv').config();
require('express-async-errors');
const rateLimit  =require('express-rate-limit')
const helmet = require('helmet')
const cors =require('cors')
const xss = require('xss-clean')

//swagger
const SwaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')
const express = require('express');
const app = express();

//connectDB
const connectDB = require('./db/connect')
//auth method
const authenticate = require('./middleware/authentication')
//routes
const authRoute = require('./routes/auth')
const jobsRoutes = require('./routes/jobs')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.set('trust proxy', 1);
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(express.json());

app.get('/',(req,res)=>{
  res.status(200).send('<h1>Jobs API</h1> <a href="/api-docs">Documentation</a>')
})
app.use('/api-docs',SwaggerUI.serve,SwaggerUI.setup(swaggerDocument))

// routes
app.use('/api/v1/jobs',authenticate,jobsRoutes)
app.use('/api/v1/auth',authRoute)


app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
