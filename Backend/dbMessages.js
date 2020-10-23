import mongoose from 'mongoose'

const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
});

//This is the collection
export default mongoose.model('messageContents', whatsappSchema);
