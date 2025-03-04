'user strict'

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import limiter from '../src/middlewares/validar-cant-peticiones.js'
import authRoutes from '../src/auth/auth.routes.js'
import companiesRouter from '../src/companies/company.routes.js'
import reportRoutes from '../src/reports/report.routes.js'
import { createAdministrator } from '../src/auth/auth.controller.js'

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const routes = (app) =>{
    app.use("/gestorOp/v1/auth", authRoutes);
    app.use("/gestorOp/v1/company", companiesRouter);
    app.use("/gestorOp/v1/report", reportRoutes);
}

const connectDB = async () => {
    try {
        await dbConnection();
        console.log("Successful connection to the database")
    } catch (error) {
        console.log("Error connecting to the database", error);
    }
}

export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3001;
    try {
        await connectDB();
        await createAdministrator();
        middlewares(app);
        routes(app);
        app.listen(port);
        console.log(`Server running on port ${port}`)
    } catch (error) {
        console.log(`server init failed: ${error}`)
    }
    
} 