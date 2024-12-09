import {
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
  Query
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { memoryStorage } from 'multer';
import * as AdmZip from 'adm-zip';
import * as xml2js from 'xml2js';

@Controller('scorm')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('initialize')
  initializeSCORM() {
    return { message: this.appService.initializeSCORM() };
  }

  @Get('finish')
  finishSCORM() {
    return { message: this.appService.finishSCORM() };
  }

  @Get('get-value')
  getSCORMValue(@Query('element') element: string) {
    return { value: this.appService.getSCORMValue(element) };
  }

  @Get('set-value')
  setSCORMValue(@Query('element') element: string, @Query('value') value: string) {
    return { message: this.appService.setSCORMValue(element, value) };
  }

  @Get('commit')
  commitSCORM() {
    return { message: this.appService.commitSCORM() };
  }

  @Get('last-error')
  getLastError() {
    return { error: this.appService.getLastError() };
  }

  @Get('error-string')
  getErrorString(@Query('errorCode') errorCode: string) {
    return { errorString: this.appService.getErrorString(errorCode) };
  }

  @Get('diagnostic')
  getDiagnostic(@Query('errorCode') errorCode: string) {
    return { diagnostic: this.appService.getDiagnostic(errorCode) };
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
