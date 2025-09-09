import { Test, TestingModule } from '@nestjs/testing';
import { WineReviewsController } from './wine-reviews.controller';
import { WineReviewsService } from './wine-reviews.service';

describe('WineReviewsController', () => {
  let controller: WineReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WineReviewsController],
      providers: [WineReviewsService],
    }).compile();

    controller = module.get<WineReviewsController>(WineReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
