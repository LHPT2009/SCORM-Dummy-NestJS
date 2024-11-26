import {
  Body,
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
// import { SampleDto } from './sample.dto';
import { diskStorage } from 'multer';

import * as unzipper from 'unzipper';
import * as xml2js from 'xml2js';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: './uploads',
  //     filename: (req, file, cb) => {
  //       const uniqueName = `${Date.now()}-${file.originalname}`;
  //       cb(null, uniqueName);
  //     },
  //   })
  // }))
  // @Post('file')
  // uploadFile(
  //   @Body() body: SampleDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return {
  //     body,
  //     file: file.buffer.toString(),
  //   };
  // }

  // @UseInterceptors(FileInterceptor('file'))
  // @Post('file/validation')
  // uploadFileAndPassValidation(
  //   @Body() body: SampleDto,
  //   @UploadedFile(
  //     new ParseFilePipeBuilder()
  //       .addFileTypeValidator({
  //         fileType: 'zip',
  //       })
  //       .build({
  //         fileIsRequired: false,
  //       }),
  //   )
  //   file?: Express.Multer.File,
  // ) {
  //   return {
  //     body,
  //     file: file?.buffer.toString(),
  //   };
  // }

  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: './uploads',
  //     filename: (req, file, cb) => {
  //       const uniqueName = `${Date.now()}-${file.originalname}`;
  //       cb(null, uniqueName);
  //     },
  //   })
  // }))
  // @Post('file/fail-validation')
  // uploadFileAndFailValidation(
  //   @Body() body: SampleDto,
  //   @UploadedFile(
  //     new ParseFilePipeBuilder()
  //       .addFileTypeValidator({
  //         fileType: 'jpg',
  //       })
  //       .build(),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   return {
  //     body,
  //     file: file.buffer.toString(),
  //   };
  // }

  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
      },
    })
  }))
  @Post('file/parse-scorm')
  async parseScormFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'zip',
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

    const filePath = `./uploads/${file.filename}`;
    const outputDir = path.join('./uploads', path.basename(filePath, '.zip'));

    // Giải nén file ZIP
    await fs.createReadStream(filePath)
      .pipe(unzipper.Extract({ path: outputDir }))
      .promise();

    const manifestPath = path.join(outputDir, 'imsmanifest.xml');
    if (!fs.existsSync(manifestPath)) {
      throw new Error('File imsmanifest.xml không tồn tại trong SCORM package!');
    }

    // Parse file imsmanifest.xml
    const manifestData = fs.readFileSync(manifestPath, 'utf-8');
    const parser = new xml2js.Parser();
    const parsedData = await parser.parseStringPromise(manifestData);

    return {
      message: 'SCORM file parsed successfully!',
      metadata: parsedData,
    };
  }
}
