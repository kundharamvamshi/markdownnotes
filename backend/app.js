const notesRouter=require('./routes/notes');

const cors=require('cors');

const express=require('express');
const app=express();

app.use(express.json());

app.use(cors({origin: 'https://markdownnotes-gilt.vercel.app'}));

app.use('/notes',notesRouter);

module.exports=app;