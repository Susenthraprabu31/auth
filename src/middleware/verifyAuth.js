import auth from "../utils/auth.js"

const verifyAuth = async(req,res,next)=>{
    let token = req.headers?.authorization?.split(" ")[1]
    if(token){
        let payload = auth.decodeToken(token)
        if(payload.exp>Math.floor(+new Date/1000))
            next()
        else
        res.status(401).send({message:"Session has expired"})
    }
    else
    res.status(401).send({message:"Token Not Found"})
}

export default verifyAuth