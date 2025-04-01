import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pharmacy, PharmacySchema } from './pharmacies.schema';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pharmacy.name, schema: PharmacySchema },
      {
        name: 'NearestPharmacyModel',
        schema: PharmacySchema,
        collection: 'nearest-pharmacies',
      },
    ]),
  ],
  controllers: [StoresController],
  providers: [StoresService],
  exports: [StoresService],
})
export class StoresModule {}
