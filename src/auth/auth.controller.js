import { verify } from "argon2";
import Usuario from '../users/user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const {email,password} = req.body;

    try {

        const user = await Usuario.findOne({
            $or: [{email},{username}]
        })

        if(!user){
            return res.status(400).json({
                msg: "Incorrect credentials, email does not exist in the database"
            });
        }

        if(!user.status){
            return res.status(400).json({
                msg: "The user does not exist in the database"
            }); 
        }

        const validPassword = await verify(user.password, password);
        if(!validPassword){
            return res.status(400).json({
                msg: "The password is incorrect"
            })
        }

        const token = await generarJWT(user.id);
        
        res.status(200).json({
            msg: "Successful login",
            userDetails: {
                username: user.username,
                token: token
            }
        })

    } catch (error) {
        console.log(e);
        res.status(500).json({
            msg: 'Server error',
            error: e.message
        })
    }
}