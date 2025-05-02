import User from "../models/User.js"

// export const createUser =async(req,res,next)=>{
//     const newUser=new User(req.body);

//     try{
//         const saveUser=await newUser.save();
//         res.status(200).json(saveUser);
//     }
//     catch(error){
//         next(error)
//     }
// };

export const updateUser =async (req,res,next)=>{
    try{
        const update=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(update)
    }
    catch(error){
        next(error)
    }
};

export const deleteUser=async(req,res,next)=>{
    try{
        await createUser.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted")
    }
    catch(error){
        next(error)
    }
};

export const getUser= async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id)
        res.status(200).json(user)
    }
    catch(error){
        next(error)
    }
};

export const getAll=async (req, res,next) => {

    try {
        const users = await User.find(); // Fetch all users
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
};