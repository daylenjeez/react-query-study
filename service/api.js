import express from 'express';
const app = express();
import cors from 'cors';
import logger from 'morgan';

app.use(cors({
  allowedHeaders: ['Content-Type'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))

app.use(logger('dev'));
const users = new Array(10).fill(0).map((_, i) => ({
  id: i,
  name: `user${i}`,
  age: Math.floor(Math.random() * 100),
}))

app.get('/users', (req, res) => {
  res.json(users)
}) 

app.listen(8080, () => {
  console.log(8080)
})
