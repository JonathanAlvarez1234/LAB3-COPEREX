import { Schema, model } from "mongoose";

const CompanySchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    impactLevel: {
        type: String,
        required: true
    },
    yearsExperience: {
        type: Number,
        required: true
    },
    pbx: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
}
)

export default model("Company", CompanySchema)  