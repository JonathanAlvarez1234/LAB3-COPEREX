import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js"
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { saveCompany, getCompanies, updateCompany } from "./company.controller.js";

const router = Router(); 

router.post(
    "/",
    [
        validarJWT,
        validarCampos
    ],
    saveCompany
)

router.get(
    "/",
    getCompanies
)

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "El ID no es válido").isMongoId(),
        validarCampos
    ],
    updateCompany
)

export default router;
