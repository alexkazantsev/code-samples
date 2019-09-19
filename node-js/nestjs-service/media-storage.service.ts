import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { MediaStorageServiceInterface } from './interfaces/media-storage-service.interface';
import { FileDto } from '../project/dto/file.dto';
import * as AWS from 'aws-sdk';
import { S3_BUCKET_NAME } from '../config';
import { logger } from '../common/utils/logger';
import { BaseAwsService } from '../common/base/base-aws.service';

@Injectable()
export class MediaStorageService extends BaseAwsService<AWS.S3> implements MediaStorageServiceInterface {

  constructor() {
    super(AWS.S3);
  }

  async uploadFile(file: FileDto): Promise<string> {
    const format = file.mimetype.replace(/[a-z]*\//, '');
    const filename = `${uuid.v4()}.${format}`;
    logger.debug(`Pushing file: "${filename}" to S3`);

    const { Location } = await this.manager
      .upload({
        Bucket: S3_BUCKET_NAME,
        Key: filename,
        Body: file.buffer,
        ACL: 'public-read',
      }).promise();

    return Location;
  }

  async removeFile(fileName: string): Promise<any> {
    const [Key] = fileName.match(/[a-z0-9-]*\.[a-z]*$/);
    logger.debug(`Removing file: ${Key} from S3`);

    return this.manager.deleteObjects({
      Bucket: S3_BUCKET_NAME,
      Delete: { Objects: [{ Key }] },
    }).promise();
  }

  async updateFile(previous: string, current: FileDto): Promise<string> {
    await this.removeFile(previous);
    return this.uploadFile(current);
  }
}
