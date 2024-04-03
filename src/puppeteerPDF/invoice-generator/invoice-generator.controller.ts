import { Controller, Get, Res, Body } from '@nestjs/common';
import { InvoiceGeneratorService } from './invoice-generator.service';
import { Response } from 'express';

@Controller('invoice-generator')
export class InvoiceGeneratorController {
    constructor(private readonly pdfService: InvoiceGeneratorService) {}
    @Get('/test')
    testPDF(){
        return 'test ok'
    }
    @Get()
   async generatePDF(@Res() res: Response, @Body() data:any): Promise<void> {
            try {
                const pdfData = await this.pdfService.generateInvoice(data);
                
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
