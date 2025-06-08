import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion } from './entities/promotion.entity';
import { Role } from '../roles/entities/role.entity';
import { Member } from '../members/entities/member.entity';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async create(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    try {
      // Création du rôle associé à la promotion
      const newRole = this.roleRepository.create({
        idRole: createPromotionDto.idRole, // id fourni par le DTO
        idGuild: createPromotionDto.idGuild, // Lié à la guilde
        name: createPromotionDto.name, // Même nom que la promotion
        memberCount: 0,
        rolePosition: 0,
        hoist: false,
        color: "#000000",
      });

      // Sauvegarde du rôle
      const savedRole = await this.roleRepository.save(newRole);

      // Création de la promotion avec le rôle associé
      const newPromotion = this.promotionRepository.create({
        ...createPromotionDto,
        idRole: savedRole.idRole, // Associe le rôle créé à la promotion
      });

      return await this.promotionRepository.save(newPromotion);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de la promotion: ' + error.message);
    }
  }

  async findAll(): Promise<Promotion[]> {
    return await this.promotionRepository.find({
      relations: ['followers', 'managers', 'category', 'course', 'campus', 'role', 'guild']
    });
  }

  async findOne(idPromotion: string): Promise<Promotion> {
    const promotion = await this.promotionRepository.findOne({
      where: { idPromotion },
      relations: ['followers', 'managers', 'category', 'course', 'campus', 'role', 'guild']
    });
    
    if (!promotion) {
      throw new NotFoundException(`Promotion avec idPromotion ${idPromotion} non trouvée`);
    }
    return promotion;
  }

  async update(idPromotion: string, updatePromotionDto: UpdatePromotionDto): Promise<Promotion> {
    const promotion = await this.findOne(idPromotion);

    // Mise à jour des champs autorisés
    const { name, startDate, endDate } = updatePromotionDto;
    if (name !== undefined) promotion.name = name;
    if (startDate !== undefined) promotion.startDate = startDate;
    if (endDate !== undefined) promotion.endDate = endDate;
    
    promotion.updatedAt = new Date();
    return await this.promotionRepository.save(promotion);
  }

  async remove(idPromotion: string) {
    const promotion = await this.findOne(idPromotion);
    return await this.promotionRepository.remove(promotion);
  }

  async addFollower(idPromotionPromotion: string, idMember: string): Promise<Promotion> {
    const promotion = await this.promotionRepository.findOne({
      where: { idPromotion: idPromotion },
      relations: ['followers']
    });

    if (!promotion) {
      throw new NotFoundException(`Promotion avec id ${idPromotion} non trouvée`);
    }

    const member = await this.memberRepository.findOneBy({ idMember });
    if (!member) {
      throw new NotFoundException(`Membre avec id ${idMember} non trouvé`);
    }

    // Vérifier si le membre est déjà follower
    if (promotion.followers && promotion.followers.some(follower => follower.idMember === idMember)) {
      throw new BadRequestException(`Le membre est déjà follower de cette promotion`);
    }

    // Initialiser le tableau des followers s'il n'existe pas
    if (!promotion.followers) {
      promotion.followers = [];
    }

    // Ajouter le membre aux followers
    promotion.followers.push(member);
    
    // Sauvegarder la promotion mise à jour
    return await this.promotionRepository.save(promotion);
  }

  async addManager(idPromotion: string, idMember: string): Promise<Promotion> {
    const promotion = await this.promotionRepository.findOne({
      where: { idPromotion: idPromotion },
      relations: ['managers']
    });

    if (!promotion) {
      throw new NotFoundException(`Promotion avec id ${idPromotion} non trouvée`);
    }

    const member = await this.memberRepository.findOneBy({ idMember });
    if (!member) {
      throw new NotFoundException(`Membre avec id ${idMember} non trouvé`);
    }

    // Vérifier si le membre est déjà manager
    if (promotion.managers && promotion.managers.some(manager => manager.idMember === idMember)) {
      throw new BadRequestException(`Le membre est déjà manager de cette promotion`);
    }

    // Initialiser le tableau des managers s'il n'existe pas
    if (!promotion.managers) {
      promotion.managers = [];
    }

    // Ajouter le membre aux managers
    promotion.managers.push(member);
    
    // Sauvegarder la promotion mise à jour
    return await this.promotionRepository.save(promotion);
  }
}
