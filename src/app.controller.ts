import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { UploaderService } from './uploader/uploader.service';

@Controller()
export class AppController {
  constructor(private uploader: UploaderService) { }

  @Get()
  getHello(): string {
    return "hello world!"
  }

  @Post("/s3_download_test")
  async s3DownloadTest(@Body() data: { user_id: number }) {

    const tmp = await this.uploader.getPreSignedURLToViewObject(process.env.S3_BUCKET_NAME, `profile_image/${data.user_id}.png`)

    // get data from s3
    const data_downloded = await fetch(tmp);
    console.log("data_downloded", data_downloded)

    // serialize image data to base64
    const serialized_data = await data_downloded.arrayBuffer();
    const base64 = Buffer.from(serialized_data).toString('base64');

    return base64;
  }

  @Post("/s3_upload_test")
  async s3UploadTest(@Body() data: { user_id: number, profile_photo_in_base64: string }) {
    const tmp = await this.uploader.uploadFileToS3(process.env.S3_BUCKET_NAME, `profile_image/${data.user_id}.png`, data.profile_photo_in_base64)
    // get url of uploaded photoo
    //const photo_url = tmp.Location;
    return "ok";
  }
}
