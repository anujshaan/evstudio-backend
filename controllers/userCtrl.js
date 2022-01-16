const Users = require('../models/userModel');

const userCtrl = {
    findUser : async(req,res)=>{
        try {
            const {companyId} = req.body;
            const user = await Users.findQuery(companyId);
            const userDetail = user[0];
            
            res.json({
                msg:'Success',
                userDetail
            })
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    }
};

module.exports = userCtrl;