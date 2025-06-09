import { describe, it, expect } from 'vitest';
import { validate } from 'class-validator';
import { CreateDashboardAccountDto } from './create-dashboard-account.dto';

describe('CreateDashboardAccountDto', () => {
    it('should validate a valid DTO', async () => {
        const dto = new CreateDashboardAccountDto();
        dto.idDashboardAccount = '123456789012345678';
        dto.idDiscord = '123456789012345678';
        dto.email = 'test@example.com';
        dto.password = 'ValidPassword123!';
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should fail validation for missing required fields', async () => {
        const dto = new CreateDashboardAccountDto();

        const errors = await validate(dto);
        
        expect(errors.length).toBe(4);
    });

    it('should fail validation for invalid email', async () => {
        const dto = new CreateDashboardAccountDto();
        dto.idDashboardAccount = '123456789012345678';
        dto.idDiscord = '123456789012345678';
        dto.email = 'invalid-email';
        dto.password = 'ValidPassword123!';

        const errors = await validate(dto);
        const emailError = errors.find(err => err.property === 'email');
        expect(emailError).toBeDefined();
        expect(emailError?.constraints?.isEmail).toBeDefined();
    });

    it('should fail validation for short password', async () => {
        const dto = new CreateDashboardAccountDto();
        dto.idDashboardAccount = '123456789012345678';
        dto.idDiscord = '123456789012345678';
        dto.email = 'test@example.com';
        dto.password = 'short';

        const errors = await validate(dto);
        const passwordError = errors.find(err => err.property === 'password');
        expect(errors.length).toBe(1);
        expect(passwordError?.constraints?.minLength).toBeDefined();
    });
});