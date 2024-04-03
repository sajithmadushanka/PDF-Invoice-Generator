import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';

@Injectable()
export class AppService {
  createPDFdoc():PDFKit.PDFDocument{
    const fonts = {
      Roboto: {
        normal: 'fonts/Roboto/Roboto-Regular.ttf',
        bold: 'fonts/Roboto/Roboto-Medium.ttf',
        italics: 'fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf'
      }
    };
    
    const PdfPrinter = require('pdfmake');
    const printer = new PdfPrinter(fonts);
    const fs = require('fs');
 
    
    const docDefinition = {
      content: ['First paragraph', 'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'],
      defaultStyle: {
        font: 'Roboto'
      }
        
      
    };
    
    const options = {
      // ...
    }
    
    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    
    return pdfDoc;
  }
}