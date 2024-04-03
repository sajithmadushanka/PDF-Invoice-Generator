import { Controller, Get, Res , Body} from '@nestjs/common';
import { PdfGenerateService } from './pdf-generate.service';
import { Response } from 'express';

@Controller('pdf-generate')
export class PdfGenerateController {
    constructor(private readonly pdfService: PdfGenerateService) {}
    
    @Get('/test')
    testPDF(){
        return 'test ok'
    }
    
    @Get()
    async generatePDF(@Res() res: Response, @Body() data:any): Promise<void> {
        try {
            const pdfData = await this.pdfService.generatePdf(data);
            
            // Set response headers
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename=report.pdf');

            // Send the PDF content as response
            res.send(pdfData);
        } catch (error) {
            console.error('Error generating PDF:', error);
            res.status(500).send('Error generating PDF');
        }
    }
}
