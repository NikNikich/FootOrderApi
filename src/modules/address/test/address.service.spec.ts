import { Test } from '@nestjs/testing';
import { ConfigModule } from '@modules/config/config.module';
import { AddressRepository } from '@modules/address/repository/address.repository';
import { DaDataServiceFake } from '@modules/dadate/test/dadata-servica.class.test';
import { AddressRepositoryFake } from '@modules/address/test/address-repository.class.test';
import { DADATA_KEY } from '@modules/dadate/dadata.const';
import { DaDataService } from '@modules/dadate/dadate.service';
import {
  ADDRESS_ENTITY_FAKE,
  ADDRESS_ID_FAKE,
  DADATA_ADDRESS_FAKE,
  EDIT_ADDRESS_FAKE,
  REPOSITORY_ADDRESS_NAME_FAKE,
  USER_ID_FAKE,
} from './address.const.test';
import { AddressEntity } from '../entity/address.entity';
import { AddressService } from '../address.service';

describe('AddressService', () => {
  let addressService: AddressService;
  let addressRepository: AddressRepository;
  let daDataService: DaDataService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.register(`${process.cwd()}/.env`)],
      providers: [
        AddressService,
        {
          provide: REPOSITORY_ADDRESS_NAME_FAKE,
          useClass: AddressRepositoryFake,
        },
        {
          provide: DADATA_KEY,
          useClass: DaDataServiceFake,
        },
      ],
    }).compile();
    addressService = moduleRef.get<AddressService>(AddressService);
    addressRepository = moduleRef.get(REPOSITORY_ADDRESS_NAME_FAKE);
    daDataService = moduleRef.get(DADATA_KEY);
  });

  it('find new Address', async () => {
    jest
      .spyOn(addressRepository, 'findByIdOrReject')
      .mockResolvedValue(new AddressEntity(ADDRESS_ENTITY_FAKE));
    const result = await addressService.findOne(ADDRESS_ID_FAKE);
    const expectResult: AddressEntity = new AddressEntity(
      ADDRESS_ENTITY_FAKE,
    );
    expect(result).toEqual(expectResult);
  });

  it('add Address', async () => {
    jest
      .spyOn(addressRepository, 'addNewAddress')
      .mockResolvedValue(new AddressEntity(ADDRESS_ENTITY_FAKE));
    jest
      .spyOn(daDataService, 'getGeoKodeAddress')
      .mockResolvedValue(DADATA_ADDRESS_FAKE);
    const result = await addressService.addUserAddress(
      USER_ID_FAKE,
      EDIT_ADDRESS_FAKE,
    );
    const expectResult: AddressEntity = new AddressEntity(
      ADDRESS_ENTITY_FAKE,
    );
    expect(result).toEqual(expectResult);
  });
});
