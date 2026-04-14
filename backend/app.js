const notesRouter=require('./routes/notes');

const cors=require('cors');

const express=require('express');
const app=express();

app.use(express.json());

app.use(cors());

app.use('/notes',notesRouter);

module.exports=app;