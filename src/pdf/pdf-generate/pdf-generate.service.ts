import { Injectable } from '@nestjs/common';
import * as pdfkit from 'pdfkit';


@Injectable()
export class PdfGenerateService {
    async generatePdf(data: any): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const doc = new pdfkit();
            const buffers: Buffer[] = [];

            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });

            doc.fontSize(12);

            // Title: INVOICE
            doc.font('Helvetica-Bold').fontSize(18).text('INVOICE', { align: 'center' }).moveDown();

            // User details
            doc.font('Helvetica').fontSize(12).text(`BILL TO: ${data.name}`, { align: 'left' });
            doc.text(data.address, { align: 'left' }).moveDown();

            // Invoice details
            doc.text(`Invoice Number: ${data.invoiceNumber}`, { align: 'right' });
            doc.text(`Invoice Date: ${data.invoiceDate}`, { align: 'right' }).moveDown();

            // Total payment
            doc.font('Helvetica-Bold').fontSize(14).text(`Total Payment: $${data.totalPayment}`, { align: 'center' }).moveDown();

            
            doc.font('Helvetica').fontSize(12).text('Thank you', { align: 'center' });


            doc.end();
        });
    }
}
