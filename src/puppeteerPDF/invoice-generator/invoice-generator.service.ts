import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class InvoiceGeneratorService {
    async generateInvoice(data: any): Promise<Buffer> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(this.generateHtml(data));
        const pdfBuffer = await page.pdf({ format: 'A4' });
        await browser.close();
        return pdfBuffer;
    }

    private generateHtml(data: any): string {
        // Generate HTML based on data
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invoice</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    line-height: 1.6;
                }
                .container {
                    max-width: 800px;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .invoice-header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .user-details {
                    margin-bottom: 20px;
                }
                .invoice-details {
                    margin-bottom: 20px;
                }
                .total-payment {
                    text-align: right;
                    margin-bottom: 20px;
                }
                .thank-you {
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="invoice-header">
                    <h1>INVOICE</h1>
                </div>
                <div class="user-details">
                    <p><strong>BILL TO:</strong> ${data.name}</p>
                    <p><strong>ADDRESS:</strong> ${data.address}</p>
                </div>
                <div class="invoice-details">
                    <p><strong>Invoice Number:</strong> ${data.invoiceNumber}</p>
                    <p><strong>Invoice Date:</strong> ${data.invoiceDate}</p>
                </div>
                <div class="total-payment">
                    <h2>Total Payment: $${data.totalPayment}</h2>
                </div>
                <div class="thank-you">
                    <p>Thank you</p>
                </div>
            </div>
        </body>
        </html>
        
        `;
    }
}
