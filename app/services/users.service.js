import db from "../models";

const createNewUser = (user) => {
    return new Promise(async(resolve, reject) => {
       try {
         await db.Users.create({
            fullname: user.fullname,
            username: user.username,
            address: user.address,
            email: user.email,
            gender: user.gender == '1' ? true : false,
            password: user.password,
            avatar: user.avatar,
            phone: user.phone,
        })
        resolve("create donr")
       } catch (error) {
        reject(error)
       }
       
    })
}

const authUser = (info) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: {
                   username: info.username,
                   password: info.password,
                  }
            })
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

const updateUser = (info, id) => {
    return new Promise((resolve, reject) => {
        try {
            db.Users.update(info,{where:{id: id}})
            .then(() => {return db.Users.findOne({where: {id: id}})})
            .then((user) => resolve(user))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports ={
    createNewUser,
    authUser,
    updateUser
}