export class AddressRepositoryFake {
  create(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async save(): Promise<void> {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async remove(): Promise<void> {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async findOne(): Promise<void> {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async findByIdOrReject(id: number): Promise<void> {}

  async addNewAddress(
    name: string,
    latitude: number,
    longitude: number,
    userId: number = null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ): Promise<void> {}
}
