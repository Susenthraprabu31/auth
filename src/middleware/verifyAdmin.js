import auth from "../utils/auth.js"
import usersModel from "../model/users.js"
const verifyAdmin = async(req,res,next)=>{
    let token = req.headers?.authorization?.split(" ")[1]
    if(token){
        let payload = auth.decodeToken(token)
        let user = await usersModel.findOne({id:payload.id,email:payload.email,role:payload.role})
        if(user && user.role==="admin")
            next()
        else
        res.status(401).send({message:"You don't have access contact admin!"})
    }
    else
    res.status(401).send({message:"Token Not Found"})
}

export default verifyAdmin