import { describe, it, expect } from "vitest";
import { validate } from 'class-validator';
import { CreateCourseDto } from "./create-course.dto";

describe('CreateCourseDto', () => {
    it('should validate a valid DTO', async () => {
        const dto = new CreateCourseDto();
        dto.name = 'Test Course';
        dto.isCertified = true;
        dto.idRole = '123456789012345678';
        
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should fail validation for missing required fields', async () => {
        const dto = new CreateCourseDto();
        const errors = await validate(dto);
        
        const errorFields = errors.map(err => err.property);
        expect(errorFields).toContain('name');
        expect(errorFields).toContain('isCertified');
        expect(errorFields).toContain('idRole');
    });

    it('should fail validation for short name', async () => {
        const dto = new CreateCourseDto();
        dto.name = 'ab';  // trop court
        dto.isCertified = true;
        dto.idRole = '123456789012345678';
        
        const errors = await validate(dto);
        const nameErrors = errors.find(err => err.property === 'name');
        expect(errors.length).toBe(1);
        expect(nameErrors?.constraints?.minLength).toBeDefined();
    });
});