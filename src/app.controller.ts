import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { createWriteStream } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getPDFDoc(@Res() response: Response) {
    const pdfDoc = await this.appService.createPDFdoc();
    pdfDoc.pipe(response); // Pipe the PDF document to a file
    pdfDoc.end(); // End the PDF document stream
  }
}
