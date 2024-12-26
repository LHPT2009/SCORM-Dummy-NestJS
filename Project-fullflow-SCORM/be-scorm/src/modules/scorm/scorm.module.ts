import { Module } from '@nestjs/common';
import { ScormController } from './scorm.controller';
import { ScormService } from './scorm.service';
import { ScormEntity } from './scorm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScormEntity]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'upload-file-scorm'),
      serveRoot: '/scorm-content',
    }),],
  controllers: [ScormController],
  providers: [ScormService],
})
export class ScormModule { }
