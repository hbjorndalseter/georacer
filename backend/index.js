import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());

// app.use(express.json()); // må vel ta høyde geojson

app.get('/', (req, res) => {
    res.send({msg: 'Backend fungerer!'});
});

app.listen(port, () => {
    console.log(`Server kjører på http://localhost:${port}`);
});