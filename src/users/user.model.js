import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    surname: {
        type: String,
        required: [true, "El apellido es necesario"]
    },
    username: {
        type: String,
        required: [true, "El nombre de usuario es necesario"]
    },
    email:{
        type: String,
        required: [true, "El correo es necesario"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es necesaria"]
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: [true, "El telefono es necesario"]
    },
    state: {
        type: Boolean,
        default: true
    },
});

export default mongoose.model("Usuario", UserSchema);