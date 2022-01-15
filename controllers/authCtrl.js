const pool = require('../database/connection');
const bcrypt = require('bcrypt');
const Users = require('../models/userModel');


const authCtrl = {
    register : async(req,res)=>{
        try {
            //destructuring user detail from req body
            const {username, email, password} = req.body;
            let user_name = username.toLowerCase().replace(/ /g, '');
            

            //checking the limit of username
            if(user_name.length <= 6 || user_name.length >= 12)
                return res.status(400).json({msg:'username should be between 6 and 12'});
            
            //checking if entered username already registered on not
            const newUsername = await Users.findUser(username);
            if(newUsername[0].length > 0)
                return res.status(400).json({msg:'Username already exist'});

            //checking if entered email already registered on not
            const user_email = await Users.findEmail(email);
            if(user_email[0].length > 0)
                return res.status(400).json({msg:'Email already exist'});

            //checking password limit
            if(password.length < 6)
                return res.status(400).json({msg:'Password is short'});

            //hashing password
            const hashedPass = await bcrypt.hash(password, 12);

            const newUser = {
                username:user_name,
                email,
                password:hashedPass,
            }
            const savedUser = await Users.save(newUser);

            res.json({
                newUser,
                msg:'registerd'
            })
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    login: async(req,res)=>{
        try {
            const {username, password} = req.body;
            
            const user = await Users.findUser(username);
            const userDetail = user[0][0];
            if(userDetail.length === 0)
                return res.status(400).json({msg:'No account found with this username'});
            
            const isPass = await bcrypt.compare(password, userDetail.password);
            if(!isPass) return res.status(400).json({msg:'Wrong email password'})
            
            res.json({
                    user:{
                        ...userDetail,
                        password:''
                    }
                }
            )

        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    }
}

module.exports = authCtrl;