import {
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
  Query
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { memoryStorage } from 'multer';
import * as AdmZip from 'adm-zip';
import * as xml2js from 'xml2js';
import * as fs from 'fs';
import * as path from 'path';

@Controller('scorm')
export class AppController {
  constructor() { }
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
  }))
  @Post('save')
  async parseScormFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        // .addFileTypeValidator({
        //   fileType: 'application/x-zip-compressed',
        // })
        .build({
          fileIsRequired: true,
        }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('No file uploaded!');
    }

    const zip = new AdmZip(file.buffer);
    this.saveScormResources(zip);

    const manifestEntry = zip.getEntry('imsmanifest.xml');
    if (!manifestEntry) {
      throw new Error('imsmanifest.xml not found in uploaded SCORM package');
    }

    const manifestData = manifestEntry.getData().toString('utf-8');
    const parser = new xml2js.Parser();
    const parsedManifest = await parser.parseStringPromise(manifestData);

    const UrlHTML = parsedManifest.manifest.resources[0].resource[0].$.href
    return `http://localhost:4000/scorm-content/${UrlHTML}`;
  }

  saveScormResources(zip: AdmZip) {
    const saveDir = path.join(__dirname, '..', 'upload-file-scorm');

    if (fs.existsSync(saveDir)) {
      fs.rmSync(saveDir, { recursive: true, force: true });
    }

    fs.mkdirSync(saveDir, { recursive: true });

    zip.extractAllTo(saveDir, true);
  }
}
