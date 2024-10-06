const { register, login } = require('../controllers/userController');


const registerHandler = async (req, res) => {
    const { name, password } = req.body;
    console.log(name, password);
    
    try {
        const newUser = await register(name, password);
        res.status(201).json('User created succesfully')
    } catch (error) {
        
        console.error(error);
        
        res.status(500).json({error: error.message});
        
        
    }
}

const loginHandler = async (req, res) => {

    const { name, password } = req.body;
    try {
        const { token, userId, error } = await login(name, password);

        if(error) {
            res.status(401).json({error})
        }

        res.status(200).json('Login Succeed', token, userId)
    } catch (error) {
        res.status(500).json({error:'Error loggign in'})        
    }
}


module.exports = {
    registerHandler,
    loginHandler,
}