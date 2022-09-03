import { Test, TestingModule } from '@nestjs/testing';
import { PasswordEncodeService } from './password-encode.service';

describe('PasswordEncodeService', () => {
  let service: PasswordEncodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordEncodeService],
    }).compile();

    service = module.get<PasswordEncodeService>(PasswordEncodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
