import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';
import profileRouter from './routes/my-profile.routes.js';
import reviewRouter from './routes/review.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    res.send({ message: 'Hello World' })
})

app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);
app.use('/api/v1/my-profile', profileRouter);
app.use('/api/v1/reviews', reviewRouter);

const startServer = async () => {
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => {
            console.log('Server started on port http://localhost:8080')
        })
    }catch(err){
        console.log(err)
    }
}

startServer();