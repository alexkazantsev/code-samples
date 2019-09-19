import { User } from '../../user/user.entity';
import { PromiseResult } from 'aws-sdk/lib/request';
import { AWSError, SES } from 'aws-sdk';

export interface EmailServiceInterface {
  sendRegisterNotification(user: User): Promise<PromiseResult<SES.SendEmailResponse, AWSError>>;

  sendResetPasswordEmail(email: string, token: string): Promise<PromiseResult<SES.SendEmailResponse, AWSError>>;

  sendProfileEmail(userEmail: string): Promise<PromiseResult<SES.SendEmailResponse, AWSError>>;
}
