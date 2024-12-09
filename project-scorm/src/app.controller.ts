import {
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { memoryStorage } from 'multer';
import * as AdmZip from 'adm-zip';
import * as xml2js from 'xml2js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
  }))
  @Post('file/parse-scorm')
  async parseScormFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'application/zip',
        })
        .build({
          fileIsRequired: true,
        }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('No file uploaded!');
    }

    // Load file buffer into ZIP
    const zip = new AdmZip(file.buffer);

    // Extract imsmanifest.xml from the uploaded ZIP
    const manifestEntry = zip.getEntry('imsmanifest.xml');
    if (!manifestEntry) {
      throw new Error('imsmanifest.xml not found in uploaded SCORM package');
    }

    // Parse XML data from imsmanifest.xml
    const manifestData = manifestEntry.getData().toString('utf-8');
    const parser = new xml2js.Parser();
    const parsedManifest = await parser.parseStringPromise(manifestData);

    return {
      message: 'SCORM file parsed successfully!',
      parsedManifest
    };
  }
}
