import { verify } from "argon2";
import Usuario from '../users/user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';
import { hash } from "argon2";

export const login = async (req, res) => {
    const {email,password, username} = req.body;
    try {
        const user = await Usuario.findOne({
            $or: [{email},{username}]
        })
        if(!user){
            return res.status(400).json({
                msg: "Datos incorrectos, el correo no existe en la base de datos"
            });
        }
        if(!user.state){
            return res.status(400).json({
                msg: "El usuario no existe en la base de datos"
            }); 
        }
        const validPassword = await verify(user.password, password);
        if(!validPassword){
            return res.status(400).json({
                msg: "Contraseña incorrecta"
            })
        }
        const token = await generarJWT(user.id);
        res.status(200).json({
            msg: "Sesión iniciada exitosamente",
            userDetails: {
                username: user.username,
                token: token
            }
        })
    } catch (error) {
        console.log(e);
        res.status(500).json({
            msg: 'Error del servidor',
            error: e.msg
        })
    }
}

export const getUsers = async(req = request, res = response) => {
    try {
        const{limite = 10, desde = 0} = req.query;
        const query = {state : true}
        const[total, users] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        ])
        res.status(200).json({
            succes: true,
            total,
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener usuario!",
            error
        })
    }
}

export const createAdministrator = async () => {
    try {
        const adminEnBD = await Usuario.findOne({ name: "Admin" });
        if (!adminEnBD) {
            const passwordEncrypted = await hash("Jonas360");
            const admin = new Usuario({
                name: "Admin",
                surname: "istrador",
                username: "4dmin",
                email: "admin@gmail.com",
                phone: "20003000",
                password: passwordEncrypted,
                role: "ADMIN_ROLE"
            });
            await admin.save();
            console.log("Ad");
        } else {
            console.log("Existing administrator");
        }
    } catch (error) {
        console.error("Error creating administrator:", error);
    }
};