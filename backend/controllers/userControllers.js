const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

const registerUser = asyncHandler(async (req, res)=>{
    const {name, email, password, pic} = req.body;

    if (!name || !email || !password ){
        res.status(400);
        throw new Error('Please fill all the fields');
    }

    const userExist = await User.findOne({ email });
    if (userExist){
        res.status(400);
        throw new Error('User already exist');
    }
    else{
        const user = await User.create({
            name,
            email,
            password,
            pic,
        });
        if (user){
            res.status(201).json({
                _id : user._id,
                name : user.name,
                email : user.email,
                pic : user.pic,
                token : generateToken(user._id),
            })
        }
        else{
            res.status(400);
            throw new Error("Failed to create user");
        }
    }
});

const authUser = asyncHandler(async (req, res) => {
    const {email, password } = req.body;
    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))){ //compares password entered by user and the one we find from User email
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            pic : user.pic,
            token : generateToken(user._id),
        });
    }
});

// /ai/user?search=piyush

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
        ],
    } : {};
    const users = await User.find({...keyword});
    res.json(users);
});

module.exports = { registerUser, authUser, allUsers };