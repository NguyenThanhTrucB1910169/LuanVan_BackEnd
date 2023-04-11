import * as userService from '../services/users.service'
const sendToken = require('../middleware/jwtoken')
import ApiError from '../api-error'
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.createUser = async(req, res) => {
    try {
        await userService.createNewUser(req.body)
        res.send("create new user")
    } catch (error) {
        console.log(error)
    }
}

exports.authLogin = async(req, res) => {
    // const {username, password} = req.body
    // console.log(req.cookies)
    if(!req.body){
        res.send("Content empty")
    }
    const user =  await userService.authUser(req.body)
    // console.log(user)
    if(!user){
        res.send("invalid info")
    } 
    else if(user.role === 1) {
        sendToken({role: user.role, username: user.username}, 200, res, null)
    }
    else {
        let userSend = {
            id: user.id,
            username: user.username,
        }
        sendToken(userSend, 200, res, user);
    }
}

exports.logout = (req, res) => {
    // console.log(req.cookies)
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "LogOut"
    })
}

exports.updateInfo = async(req, res) => {
    try {
        if(req.cookies.token){
            jwt.verify(req.cookies.token,process.env.JWT_SECRET, async(err, jwtoken) => {
                if(err) console.log(err);
                else {
                    await userService.updateUser(req.body, jwtoken.id).then((val) => {
                        res.status(200).json(val);
                    })
                }
            })
        }
    } catch (error) {
        new ApiError(500, 'Update unsuccessfully')
    }
}