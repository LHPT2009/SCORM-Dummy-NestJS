import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScormEntity } from './scorm.entity';
import { Repository } from 'typeorm';
import * as AdmZip from 'adm-zip';
import * as xml2js from 'xml2js';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ScormService {
  constructor(
    @InjectRepository(ScormEntity)
    private scormRepository: Repository<ScormEntity>,
  ) { }

  async saveScormData(
    userId: string,
    lessonStatus: string,
    lessonLocation: string,
  ) {
    const existingRecord = await this.scormRepository.findOne({
      where: { userId },
    });

    if (existingRecord) {
      if (existingRecord.lessonStatus === 'completed') {
        existingRecord.lessonLocation = lessonLocation;
        return this.scormRepository.save(existingRecord);
      }

      existingRecord.lessonStatus = lessonStatus;
      existingRecord.lessonLocation = lessonLocation;
      return this.scormRepository.save(existingRecord);
    } else {
      const newRecord = this.scormRepository.create({
        userId,
        lessonStatus,
        lessonLocation,
      });
      return this.scormRepository.save(newRecord);
    }
  }

  async getScormData(userId: string) {
    return this.scormRepository.findOne({ where: { userId } });
  }

  async saveScormFile(file: any) {
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

    const courseTitle = parsedManifest.manifest.organizations[0]?.organization[0]?.title[0] || 'Untitled Course';
    const resources = parsedManifest.manifest.resources?.[0]?.resource || [];

    const scoList = resources.flatMap((resource: any) => {
      const resourceFiles = resource.file?.map((file: any) => file.$.href) || [];
      return resourceFiles.filter((fileHref: string) => fileHref.endsWith('.html')).map((href: string) => ({
        id: resource.$.identifier,
        href,
      }));
    });

    return {
      message: 'SCORM uploaded successfully',
      courseTitle,
      scoList,
    };
  }

  saveScormResources(zip: AdmZip) {
    const saveDir = path.join(__dirname, '../../../', 'upload-file-scorm');

    if (fs.existsSync(saveDir)) {
      fs.rmSync(saveDir, { recursive: true, force: true });
    }

    fs.mkdirSync(saveDir, { recursive: true });

    zip.extractAllTo(saveDir, true);
  }

  async infoScormFile(file: any) {
    if (!file) {
      throw new Error('No file uploaded!');
    }

    try {
      const zip = new AdmZip(file.buffer);

      const manifestEntry = zip.getEntry('imsmanifest.xml');
      if (!manifestEntry) {
        throw new Error('imsmanifest.xml not found in uploaded SCORM package');
      }

      const manifestData = manifestEntry.getData().toString('utf-8');
      const parser = new xml2js.Parser({ explicitArray: true });
      const parsedManifest = await parser.parseStringPromise(manifestData);

      const resources = parsedManifest.manifest.resources?.[0]?.resource || [];

      const htmlFiles = resources.flatMap((resource: any) => {
        const resourceFiles = resource.file?.map((file: any) => file.$.href) || [];
        return resourceFiles.filter((fileHref: string) => fileHref.endsWith('.html')).map((href: string) => ({
          href,
          id: resource.$.identifier,
        }));
      });

      return htmlFiles;
    } catch (error) {
      throw new Error(`Error processing SCORM file: ${error.message}`);
    }
  }
}
