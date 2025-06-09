import { validate } from 'class-validator';
import { CreateReportDto } from './create-report.dto';
import { ReportCategory } from '../entities/report.entity';
import { describe, it, expect } from 'vitest';

describe('CreateReportDto', () => {
  const dto = new CreateReportDto();
  dto.category = ReportCategory.SPAM;
  dto.reason = 'Valid reason';

  it('should validate a correct DTO', async () => {
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  describe('category validation', () => {
    it('should reject invalid category', async () => {
      const dto = new CreateReportDto();
      dto.category = 'invalid' as ReportCategory;
      dto.reason = 'Test reason';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isEnum');
    });

    it('should reject missing category', async () => {
      const dto = new CreateReportDto();
      dto.reason = 'Test reason';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
  });

  describe('reason validation', () => {
    it('should reject reason > 50 chars', async () => {
      const dto = new CreateReportDto();
      dto.reason = 'a'.repeat(51);

      const errors = await validate(dto);
      const reasonErrors = errors.find(err => err.property === 'reason');
      expect(reasonErrors?.constraints?.maxLength).toBeDefined();
    });

    it('should reject empty reason', async () => {
      const dto = new CreateReportDto();
      dto.category = ReportCategory.SPAM;
      dto.reason = '';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should reject missing reason', async () => {
      const dto = new CreateReportDto();
      dto.category = ReportCategory.SPAM;

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
  });

  describe('status validation', () => {
    it('should reject empty status', async () => {
      const dto = new CreateReportDto();
      dto.category = ReportCategory.SPAM;
      dto.reason = 'Test reason';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should reject missing status', async () => {
      const dto = new CreateReportDto();
      dto.category = ReportCategory.SPAM;
      dto.reason = 'Test reason';

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
  });
});