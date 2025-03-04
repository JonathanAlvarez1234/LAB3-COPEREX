import ExcelJS from 'exceljs';
import Company from '../companies/company.model.js';
import { join } from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';



export const generateReport = async (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = join(__filename, '..');

    try {
        const companies = await Company.find();
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Empresas');

        sheet.columns = [
            { header: 'Nombre', key: 'name', width: 20 },
            { header: 'Nivel de Impacto', key: 'impactLevel', width: 15 },
            { header: 'Años de experiencia', key: 'yearsExperience', width: 20 },
            { header: 'Categoría', key: 'category', width: 20 },
            { header: 'PBX', key: 'pbx', width: 20 },
        ];

        companies.forEach(company => {
            sheet.addRow({
                name: company.name,
                impactLevel: company.impactLevel,
                yearsExperience: company.yearsExperience,
                category: company.category,
                pbx: company.pbx,
            });
        });

        const reportPath = join(__dirname, '../reports/empresas.xlsx');
        await fs.mkdir(join(__dirname, '../reports'), { recursive: true });
        await workbook.xlsx.writeFile(reportPath);

        res.status(200).json({
            success: true,
            msg: 'Reporte generado exitosamente',
            downloadUrl: `/reports/empresas.xlsx`,
        });
    } catch (error) {
        console.error('Error al generar el reporte:', error);
        res.status(500).json({ 
            success: false, 
            msg: 'Error al generar el reporte',
            error: error.message 
        });
    }
};