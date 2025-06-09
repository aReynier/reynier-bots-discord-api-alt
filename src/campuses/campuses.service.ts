import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { Campus } from './entities/campus.entity';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class CampusesService {
  constructor(
    @InjectRepository(Campus)
    private campusRepository: Repository<Campus>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createCampusDto: CreateCampusDto): Promise<Campus> {
    try {
      const newRole = this.roleRepository.create({
        idRole: createCampusDto.idRole, 
        idGuild: createCampusDto.idGuild,
        name: createCampusDto.name,
        memberCount: 0,
        rolePosition: 0,
        hoist: false,
        color: "#000000",
      });

      const savedRole = await this.roleRepository.save(newRole);

      const newCampus = this.campusRepository.create({
        ...createCampusDto,
        idRole: savedRole.idRole,
      });

      return await this.campusRepository.save(newCampus);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création du campus: ' + error.message);
    }
  }

  findAll() {
    return this.campusRepository.find();
  }

  findOne(idCampus: string) {
    if (!idCampus) {
      throw new NotFoundException('id du campus manquant');
    }
    return this.campusRepository.findOneBy({ idCampus });
  }

  async update(idCampus: string, updateCampusDto: UpdateCampusDto) {
    const campus = await this.campusRepository.findOneBy({ idCampus });
    if (!campus) {
      throw new NotFoundException(`Campus with id "${idCampus}" not found`);
    }
    Object.assign(campus, updateCampusDto);
    return this.campusRepository.save(campus);
  }

  remove(idCampus: string) {
    if (!idCampus) {
      throw new NotFoundException(`Campus with id "${idCampus}" not found`);
    }
    return this.campusRepository.delete({ idCampus });
  }
}
