import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfGenerateController } from './pdf/pdf-generate/pdf-generate.controller';
import { PdfGenerateService } from './pdf/pdf-generate/pdf-generate.service';
import { InvoiceGeneratorController } from './puppeteerPDF/invoice-generator/invoice-generator.controller';
import { InvoiceGeneratorService } from './puppeteerPDF/invoice-generator/invoice-generator.service';

@Module({
  imports: [],
  controllers: [AppController,PdfGenerateController, InvoiceGeneratorController],
  providers: [AppService, PdfGenerateService, InvoiceGeneratorService],
})
export class AppModule {}
