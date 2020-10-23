//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from "pusher"
import cors from "cors"
//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: '1089047',
    key: '2a418e03ff1c73c8211d',
    secret: '3fcdfd82543ab03059c8',
    cluster: 'ap2',
    encrypted: true
  });

//middleware
app.use(express.json())
app.use(cors())


//DB Config
const connection_url = 'mongodb+srv://admin:chiWNTAHcUZZEi9@cluster0.nki9f.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
    })

const db = mongoose.connection;

db.once('open',()=>{
    console.log('DB connected...');

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change)=>{
        console.log(change);
    
    if (change.operationType === 'insert') {
        const messageDetails = change.fullDocument;
        pusher.trigger('messages',' inserted', 
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            }
        );
    }
    else {
        console.log('Error triggering Pusher');
    }    
    });
});
    
//Mongostuff

///api routes
app.get('/',(req,res)=>res.status(200).send('hello world'));

    ////Retrieve messages from database
app.get('/messages/sync',(req,res)=>{
    Messages.find((err, data)=>{
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})

        ////add messages to database
app.post('/messages/new', (req,res)=>{
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {


        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
         }
    })
})


//listener
app.listen(port,()=>console.log(`Listening on localhost:${port}`));