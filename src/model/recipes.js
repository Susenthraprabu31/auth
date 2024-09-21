import mongoose from "./index.js";
import {generateUUID} from '../utils/helper.js'

const recipesSchema = new mongoose.Schema({
    id:{
        type:String,
        default:function (){
            return generateUUID()
        }
    },
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    origin:{
        type:String,
        required:[true,"Origin is required"]
    },
    image:{
        type:String,
        required:[true,"Image is required"]
    },
    description:{
        type:String,
        required:[true,"Description is required"]
    },
    ingredients:{
        type:Array,
        default:[]
    },
    procedure:{
        type:String,
        required:[true,"Procedure is required"]
    },
    userId:{
        type:String,
        required:[true,"userId is required"]
    },
    status:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

},{
    collection:'recipes',
    versionKey:false
})

export default mongoose.model('recipes',recipesSchema)