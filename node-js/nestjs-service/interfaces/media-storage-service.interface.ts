import { FileDto } from '../../project/dto/file.dto';

export interface MediaStorageServiceInterface {
  uploadFile(file: FileDto): Promise<string>;

  removeFile(fileName: string): Promise<void>;

  updateFile(previous: string, current: FileDto): Promise<string>;
}
