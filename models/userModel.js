const db = require('../database/connection')

module.exports = class Users {
    constructor(username,email,password){
        this.username = username;
        this.email = email;
        this.password = password;
    }


    static findEmail(email){
        return db.execute(
            'SELECT * FROM users WHERE email=?',[email]
        );
    }

    static findUser(username){
        return db.execute(
            'SELECT * FROM users WHERE username=?',[username]
        );
    }

    static save(user){
        return db.execute(
            'INSERT INTO users(username, email, password) VALUES(?,?,?)',
            [user.username, user.email, user.password]
        );
    }
}
