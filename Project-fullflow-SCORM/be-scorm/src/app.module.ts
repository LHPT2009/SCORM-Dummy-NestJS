import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScormEntity } from './modules/scorm/scorm.entity';
import { ScormModule } from './modules/scorm/scorm.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload-file-scorm'),
      serveRoot: '/scorm-content',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'scorm',
      password: '1234',
      database: 'postgres',
      entities: [ScormEntity],
      synchronize: true,
    }),
    ScormModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
