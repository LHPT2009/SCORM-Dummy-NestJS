import { Module } from '@nestjs/common';
import { ScormController } from './scorm.controller';
import { ScormService } from './scorm.service';
import { ScormEntity } from './scorm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ScormEntity])],
  controllers: [ScormController],
  providers: [ScormService],
})
export class ScormModule {}
