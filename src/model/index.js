import mongoose from "mongoose";
import config from '../utils/config.js'



// mongoose.connect(`${config.DB_URL}/${config.DB_NAME}`)
// .then((value)=>console.log('MongoDB Connected!'),(error)=>console.error('MongoDB Connection Failed',error))

main().catch((error)=>console.error('MongoDB Connection Failed',error))

async function main(){
    await mongoose.connect(`${config.DB_URL}/${config.DB_NAME}`)
    console.log('MongoDB Connected!')
}

export default mongoose