import * as userService from '../services/users.service'
const sendToken = require('../middleware/jwtoken')

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
    if(!req.body){
        res.send("Content empty")
    }
    const user =  await userService.authUser(req.body)
    if(!user){
        res.send("invalid info")
    } else {
        let userSend = {
            id: user.id,
            username: user.username,
        }
        sendToken(userSend, 200, res);
    }
}

exports.logout = async(req, res) => {
    console.log("logout")
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "LogOut"
    })
}