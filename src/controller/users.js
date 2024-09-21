import usersModel from "../model/users.js"
import auth from "../utils/auth.js"


const getAllUsers = async (req, res) => {
    try {
        let users = await usersModel.find({},{_id:0})
        res.status(200).send({
            message: "Data Fetch Successfull",
            data: users
        })
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const getUserById = async (req, res) => {
    try {
        let {id} = req.params
        let user = await usersModel.findOne({id:id},{_id:0})
        res.status(200).send({
            message: "Data Fetch Successfull",
            data: user
        })
    } catch (error) {
        console.log("Error in /getUserById",error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const createUser = async (req, res) => {
    try {
        let user = await usersModel.findOne({ email: req.body.email })
        if (!user) {
            req.body.password = await auth.hashData(req.body.password)
            await usersModel.create(req.body)
            res.status(201).send({ message: "User Created Successfully" })
        }
        else
            res.status(400).send({ message: `User with ${req.body.email} already exists!` })
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const editUserById = async (req, res) => {
    try {
        let {id} = req.params
        let user = await usersModel.findOne({id:id})
        if(user)
        {
            const {name,email,mobile,status,role,} = req.body
            user.name = name?name: user.name
            user.email = email?email: user.email
            user.mobile = mobile?mobile: user.mobile
            user.status = status?status: user.status
            user.role = role?role: user.role
            
            await user.save()
            
            res.status(200).send({message:"Data Saved Successfully"})
        }
        else
            res.status(400).send({message:"Invalid Id"})
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const deleteUserById = async (req, res) => {
    try {
        let {id} = req.params
        let data = await usersModel.deleteOne({id:id})
        if(data.deletedCount)
            res.status(200).send({message:"User Deleted Successfully"})
        else
            res.status(400).send({message:"Invalid Id"})

    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const login = async (req,res) =>{
    try {
       let {email,password} = req.body
       let user = await usersModel.findOne({email:email})
       if(user)
       {
            //comaprepassword
        if (await auth.compareHash(user.password,password))
        {
            //createtoken
            const token = auth.createToken({
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role
            })
            res.status(200).send({
                message:"Login Successfull",
                token
            })
        }
        else{
            res.status(400).send({
                message:"Invalid Password"
            })
        }
    }
    else{
        res.status(400).send({
            message:`User with Email ${email} does not exists`
        })
    }
} catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }

}

const changePassword = async(req,res)=>{
    try {
        let {userId} = req.headers
        let user = await usersModel.findOne({id:userId})
        if(user)
        {
            let {newPassword,currentPassword} = req.body
            if(auth.compareHash(user.password,currentPassword))
            {
                user.password = await auth.hashData(newPassword)
                await user.save()
                res.status(200).send({
                    message:"Password Updated Successfully"
                })
            }
            else
                res.status(400).send({message:"Current Password did not match"})
            
        }
        else
        {
            res.status(400).send({
                message:`User does not exists`
            })
        }
        
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    editUserById,
    deleteUserById,
    login,
    changePassword
}