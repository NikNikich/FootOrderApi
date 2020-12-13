import { Injectable } from '@nestjs/common';
import { UserRepository } from '@modules/user/repository/user.repository';
import { UserEntity } from '@modules/user/entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { IUserCreateParams } from '@modules/auth/type/IUserPayload';
import { ConfigService } from '@modules/config/config.service';
import { UserProfileRequestDto } from '@modules/user/dto/request/user-profile.request.dto';
import { AddressService } from '@modules/address/address.service';
import { UserRoleService } from '@modules/user-role/user-role.service';
import { errors } from '@errors/errors';
import * as fs from 'fs';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRoleService: UserRoleService,
    private readonly userRepository: UserRepository,
    private readonly addressService: AddressService,
  ) {}

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findByEmailOrReject(email);
  }

  async findOne(userId: number): Promise<UserEntity> {
    return this.userRepository.findByIdOrReject(userId);
  }

  async save(user: UserEntity): Promise<void> {
    try {
      await this.userRepository.save(user);
    } catch (e) {
      throw errors.NotSaveUserError;
    }
  }

  validatePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  async create(params: IUserCreateParams): Promise<UserEntity> {
    const { password, roles, email } = params;
    await this.userRepository.checkEmailUsage(email);
    const hash = this.hashPassword(password);
    const userRecord = new UserEntity({
      email,
      password: hash,
    });
    const result = await this.userRepository.save(userRecord);
    const userId = result.id;
    result.roles = await this.userRoleService.create(userId, roles);
    return result;
  }

  async update(
    id: number,
    params: UserProfileRequestDto,
  ): Promise<UserEntity> {
    const user = await this.findOne(id);
    const { fullName, idFavoriteAddresses } = params;
    if (idFavoriteAddresses && idFavoriteAddresses.length > 0) {
      idFavoriteAddresses.map(
        async (idAddress: number): Promise<void> => {
          await this.addressService.setFavorite(idAddress);
        },
      );
    }
    if (fullName) {
      user.fullName = fullName;
      return this.userRepository.save(user);
    }
    return user;
  }

  async updateAvatar(
    userId: number,
    file: Express.Multer.File,
  ): Promise<UserEntity> {
    const user = await this.findOne(userId);
    const pathFile = file?.filename;
    if (!pathFile) {
      throw errors.FileUploadingError;
    }
    user.avatar = pathFile;
    await this.userRepository.save(user);
    return user;
  }

  async downloadAvatar(userId: number): Promise<Buffer> {
    const user = await this.findOne(userId);
    if (!user.avatar) {
      throw errors.NotDownloadAvatarError;
    }
    const filePath = `${this.configService.config.UPLOAD_PATH}/${user.avatar}`;
    return new Promise<Buffer>((resolve) => {
      fs.readFile(filePath, {}, (err, data) => {
        if (err) {
          throw errors.NotDownloadAvatarError;
        } else {
          resolve(data);
        }
      });
    });
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }
}
