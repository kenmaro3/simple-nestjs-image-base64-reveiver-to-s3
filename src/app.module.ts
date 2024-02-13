import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploaderService } from './uploader/uploader.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UploaderService],
})
export class AppModule { }
