import express from 'express';
const app = express();
import cors from 'cors';
import logger from 'morgan';

app.use(cors({
  allowedHeaders: ['Content-Type'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))

app.use(logger('dev'));
app.use((req,res,next)=>{
  setTimeout(next,1000)
})
const users = new Array(10).fill(0).map((_, i) => ({
  id: i,
  name: `user${i}`,
  age: Math.floor(Math.random() * 100),
}))


app.get('/users', (req, res) => {
  res.json(users.map(item=>({...item,name:item.name+Date.now()})))
}) 

app.get('/user', (req, res) => {
  const userId = req.query.userId;
  const user = users.find(user=>user.id === userId);
  if(user)res.json(user);
  else res.json({})
}) 

app.listen(8080, () => {
  console.log(8080)
})
