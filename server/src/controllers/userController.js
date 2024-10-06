const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User }  = require("../db");
const { JWT_SECRET } = process.env


const register = async (name, password) => {

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
        password: hashedPassword
    })

    return newUser
}


const login = async (name, password) => {
    const user = await User.findOne({where: {name}});

    if(!user) return console.log('Invalid username or password');
    

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return console.log('Invalida username or password');

    const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '1h'});

    return { token, userId: user.id}
    
}

module.exports = {
    register,
    login
}