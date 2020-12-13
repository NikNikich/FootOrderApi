import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@modules/config/config.service';
import { IDaDateAddress } from '@modules/address/interface/dadata-address.interface';
import { errors } from '@errors/errors';
import { head } from 'lodash';

@Injectable()
export class DaDataService {
  private readonly logger = new Logger(DaDataService.name);

  private readonly headers = {
    'Content-Type': 'application/json',
    Authorization: `Token ${this.configService.config.DADATA_API_KEY}`,
    'X-Secret': this.configService.config.DADATA_SECRET_KEY,
  };

  private readonly url = '/api/v1/clean/address';

  constructor(
    private readonly daDateHTTP: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getGeoKodeAddress(address: string): Promise<IDaDateAddress> {
    const config = {
      headers: this.headers,
      mode: 'cors',
    };
    try {
      const response = await this.daDateHTTP
        .post(this.url, JSON.stringify([address]), config)
        .toPromise();
      return head(response.data);
    } catch (error) {
      this.logger.error(error);
      throw errors.NotIdentifiedAddress;
    }
  }
}
