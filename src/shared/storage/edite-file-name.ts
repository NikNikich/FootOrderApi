import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, destination: string) => void,
): void => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = uuidv4();
  callback(null, `${name}-${randomName}${fileExtName}`);
};
