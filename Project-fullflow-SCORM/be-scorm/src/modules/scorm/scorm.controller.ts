import { Controller, Get, Param, Post, Body, UploadedFile, ParseFilePipeBuilder, UseInterceptors } from '@nestjs/common';
import { ScormService } from './scorm.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('scorm')
export class ScormController {
  constructor(private readonly scormService: ScormService) { }

  @Post('save-scorm')
  async saveScormData(
    @Body()
    body: {
      userId: string;
      lessonStatus: string;
      lessonLocation: string;
    },
  ) {
    const { userId, lessonStatus, lessonLocation } = body;
    const result = await this.scormService.saveScormData(
      userId,
      lessonStatus,
      lessonLocation,
    );
    return { message: 'SCORM data saved successfully', data: result };
  }

  @Get('get-scorm/:userId')
  async getScormData(@Param('userId') userId: string) {
    const result = await this.scormService.getScormData(userId);
    if (result) {
      return result;
    } else {
      return { message: 'No SCORM data found for this user' };
    }
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async saveScormFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .build({
          fileIsRequired: true,
        }),
    )
    file: Express.Multer.File,
  ) {
    return await this.scormService.saveScormFile(file);
  }
}
