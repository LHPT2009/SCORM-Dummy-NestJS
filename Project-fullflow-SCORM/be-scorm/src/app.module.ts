import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload-file-scorm'),
      serveRoot: '/scorm-content',
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }