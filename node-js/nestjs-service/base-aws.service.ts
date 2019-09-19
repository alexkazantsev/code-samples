import * as AWS from 'aws-sdk';
import { S3_ACCESS_KEY, S3_REGION_KEY, S3_SECRET_KEY } from '../../config';
import { Abstract, Scope, Type } from '@nestjs/common';
import { ClassProvider } from '@nestjs/common/interfaces';

export abstract class BaseAwsService<T extends AWS.SES | AWS.S3> implements ClassProvider<any> {
  // tslint:disable-next-line:ban-types
  provide: string | symbol | Type<any> | Abstract<any> | Function;
  scope: Scope;
  useClass: Type<any>;

  manager: T;

  protected constructor(Manager: new() => T) {
    AWS.config.update({
      region: S3_REGION_KEY,
      accessKeyId: S3_ACCESS_KEY,
      secretAccessKey: S3_SECRET_KEY,
    });

    this.manager = new Manager();
  }
}
