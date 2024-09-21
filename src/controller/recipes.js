import recipesModel from "../model/recipes.js"
import usersModel from '../model/users.js'

const recipeUserQuery = [
    {
        $lookup:{
            from:'users',
            localField:"userId",
            foreignField:"id",
            as:"recipeUser"
        }
    },
    {$unwind:"$recipeUser"},
    {$project:{name:1,origin:1,image:1,description:1,ingredients:1,procedure:1,userId:1,id:1,author:"$recipeUser.name",email:"$recipeUser.email"}}
]

const getAllRecipes = async(req,res)=>{
    try {
        let recipes = await recipesModel.aggregate(recipeUserQuery)
        res.status(200).send({
            message:"Data Fetch Successfull",
            data:recipes
        })
        
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const getAllRecipesByUserId = async(req,res)=>{
    try {
        const {id} = req.params
        let recipes = await recipesModel.aggregate([...recipeUserQuery,{$match:{userId:id}}])
        res.status(200).send({
            message:"Data Fetch Successfull",
            data:recipes
        })
        
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const createRecipe = async(req,res)=>{
    try { 
        let user = await usersModel.findOne({id:req.body.userId})
        if(user)
        {
            await recipesModel.create(req.body)
            res.status(201).send({
                message: "Recipe Added Successfully"
            })
        }
        else
        {
            res.status(400).send({message:`Invalid userId`})
        }
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}
export default {
    createRecipe,
    getAllRecipes,
    getAllRecipesByUserId
}