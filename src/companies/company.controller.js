import Company from "./company.model.js";

export const saveCompany = async (req, res) => {
    try {
        const data = req.body;
        const company = new Company ({
            ...data
        })
        await company.save();
        res.status(200).json({
            succes: true,
            msg: "Se guardo la empresa",
            company
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error al guardar la empresa',
            error
        })
    }
}

export const getCompanies = async (req, res) => {
    try {
        const { order = "asc" } = req.query;
        
        if (!["asc", "desc"].includes(order.toLowerCase())) {
            return res.status(400).json({
                success: false,
                msg: "Los parámetros válidos son 'asc' y 'desc'"
            });
        }
        const companies = await Company.find()
            .sort({ yearsExperience: order.toLowerCase() === "asc" ? 1 : -1 });

        res.status(200).json({
            success: true,
            total: companies.length,
            companies
        });
    } catch (error) {
         res.status(500).json({
            succes: false,
            msg: "Error al obtener las empresas",
            error: error.message
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...data} = req.body;
        
        const updateCompany = await Company.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        );
        if(!updateCompany){
            return res.status(404).json({
                succes: false,
                msg: "Empresa no encontrada"
            });
        }
        res.status(200).json({
            succes: true,
            msg: "Empresa actualizada exitosamente",
            company: updateCompany
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: "Error al actualizar la empresa",
            error: error.message
        })
    }
}

