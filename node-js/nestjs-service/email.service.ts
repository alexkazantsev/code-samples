import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { AWSError, SES } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { EmailServiceInterface } from './interfaces/email-service.interface';
import { BaseAwsService } from './base-aws.service';
import { BUILD_OS_TEAM_EMAIL, SITE_URL } from '../config';
import { User } from '../user/user.entity';

@Injectable()
export class EmailService extends BaseAwsService<AWS.SES> implements EmailServiceInterface {

  private readonly SENDER_EMAIL = 'some@email.net';
  private readonly CHARSET = 'UTF-8';

  constructor() {
    super(AWS.SES);
  }

  private generateEmailParams(addresses: string[], subject: string, body: string): SES.SendEmailRequest {
    return {
      Destination: {
        ToAddresses: addresses,
      },
      Message: {
        Body: {
          Html: {
            Charset: this.CHARSET,
            Data: body,
          },
        },
        Subject: {
          Charset: this.CHARSET,
          Data: subject,
        },
      },
      Source: this.SENDER_EMAIL,
    };
  }

  async sendRegisterNotification(user: User): Promise<PromiseResult<SES.SendEmailResponse, AWSError>> {
    const body = `<p>You have been registered on <a href="${SITE_URL}">SWAPP Web site</a></p>`;
    const subject = 'Simple subject';

    return this.manager.sendEmail(
      this.generateEmailParams([user.email], subject, body),
    ).promise();
  }

  async sendResetPasswordEmail(email: string, token: string): Promise<PromiseResult<SES.SendEmailResponse, AWSError>> {
    const body = `<a href="${SITE_URL}/password-reset-confirm?resetToken=${token}">Reset password link</a>`;
    const subject = 'Simple Reset password subject';

    return this.manager.sendEmail(
      this.generateEmailParams([email], subject, body),
    ).promise();
  }

  async sendProfileEmail(userEmail: string): Promise<PromiseResult<SES.SendEmailResponse, AWSError>> {
    const body = `<p>A new swapp generation request has been sent by ${userEmail}</p>`;
    const subject = 'Simple subject';
    return this.manager.sendEmail(
      this.generateEmailParams([BUILD_OS_TEAM_EMAIL], subject, body),
    ).promise();
  }
}
