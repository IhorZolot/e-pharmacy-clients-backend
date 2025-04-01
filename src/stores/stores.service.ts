import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pharmacy, PharmacyDocument } from './pharmacies.schema';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel(Pharmacy.name) private pharmacyModel: Model<PharmacyDocument>,
    @InjectModel('NearestPharmacyModel')
    private nearestPharmacyModel: Model<PharmacyDocument>,
  ) {}
  async getPharmacies(): Promise<Pharmacy[]> {
    return this.pharmacyModel.find().exec();
  }
  async getPharmaciesNearest(): Promise<Pharmacy[]> {
    return this.nearestPharmacyModel.find().exec();
  }
}
