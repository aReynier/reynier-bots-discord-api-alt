import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Role } from 'src/roles/entities/role.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,

        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,

    ) {}

    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        try {
            const existingCourse = await this.courseRepository.findOne({
                where: { name: createCourseDto.name },
            });
    
            if (existingCourse) {
                throw new ConflictException(`Course with name ${createCourseDto.name} already exists`);
            }

            const courseData = {
                name: createCourseDto.name,
                isCertified: createCourseDto.isCertified,
                idGuild: createCourseDto.idGuild,
                idCategory: createCourseDto.idCategory,
            };

            const newCourse = this.courseRepository.create(courseData);
            const savedCourse = await this.courseRepository.save(newCourse);

            if (createCourseDto.idRole) {
                const role = await this.roleRepository.findOne({
                    where: { idRole: createCourseDto.idRole }
                });

                if (role) {
                    await this.courseRepository
                        .createQueryBuilder()
                        .relation(Course, "roles")
                        .of(savedCourse)
                        .add(role.idRole);
                }
            }

            const courseWithRelations = await this.courseRepository.findOne({
                where: { idCourse: savedCourse.idCourse },
                relations: {
                    category: true,
                    guild: true,
                    roles: true,
                    promotions: true,
                    channels: true
                }
            });

            if (!courseWithRelations) {
                throw new NotFoundException(`Course with id ${savedCourse.idCourse} not found after creation`);
            }

            return courseWithRelations;
        } catch (error) {
            throw new BadRequestException('Erreur lors de la création du cours: ' + error.message);
        }
    }    

    async findAll(): Promise<Course[]> {
        return await this.courseRepository.find({
            relations: ['category', 'guild', 'roles', 'promotions', 'channels'],
        });
    }

    async getById(idCourse: string): Promise<Course> {
        const course = await this.courseRepository.findOne({
            where: { idCourse },
            relations: ['category', 'guild', 'roles', 'promotions', 'channels'],
        });

        if (!course) {
            throw new NotFoundException(`Course with id ${idCourse} not found`);
        }
        return course;
    }

    async updateById(idCourse: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
        const course = await this.courseRepository.findOne({
            where: { idCourse },
            relations: ['category', 'guild', 'roles', 'promotions', 'channels']
        });

        if (!course) {
            throw new NotFoundException(`Course with id ${idCourse} not found`);
        }

        if (updateCourseDto.name) {
            const existingCourse = await this.courseRepository.findOne({
                where: { name: updateCourseDto.name },
            });
            if (existingCourse && existingCourse.idCourse !== idCourse) {
                throw new ConflictException(`Course with name ${updateCourseDto.name} already exists`);
            }
        }

        Object.assign(course, updateCourseDto);
        return await this.courseRepository.save(course);
    }

    async deleteById(idCourse: string): Promise<void> {
        const course = await this.courseRepository.findOne({ 
            where: { idCourse } 
        });

        if (!course) {
            throw new NotFoundException(`Course with id ${idCourse} not found`);
        }
        const result = await this.courseRepository.delete({ idCourse });
        if (result.affected === 0) {
            throw new BadRequestException('Failed to delete course');
        }
    }
}
