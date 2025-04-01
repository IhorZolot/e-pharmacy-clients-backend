import { Controller, Get } from '@nestjs/common';
import { Pharmacy } from './pharmacies.schema';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  async getPharmacies(): Promise<Pharmacy[]> {
    return this.storesService.getPharmacies();
  }

  @Get('/nearest')
  async getPharmaciesNearest(): Promise<Pharmacy[]> {
    return this.storesService.getPharmaciesNearest();
  }
}
