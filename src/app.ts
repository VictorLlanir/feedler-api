import express, { Application } from 'express';
import feedRoutes from './routes/feedRoutes';
import cors from 'cors';

const app: Application = express();
const port = process.env.PORT || 5055;

app.use(express.json());
app.use(cors());
app.use('/feeds', feedRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}).on('error', (err) => {
    console.error('Erro ao iniciar o servidor:', err)
})
