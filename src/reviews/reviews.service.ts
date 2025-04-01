import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reviews, ReviewsDocument } from './reviews.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews.name) private reviewsModel: Model<ReviewsDocument>,
  ) {}

  async getReviews(): Promise<Reviews[]> {
    return this.reviewsModel.find().exec();
  }
}
