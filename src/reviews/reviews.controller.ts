import { Controller, Get } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Reviews } from './reviews.schema';

@Controller('customer-reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async getReviews(): Promise<Reviews[]> {
    return this.reviewsService.getReviews();
  }
}
