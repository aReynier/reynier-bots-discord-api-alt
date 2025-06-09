import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateXpTransactionDto } from './dto/create-xp-transaction.dto';
import { XpTransaction } from './entities/xp-transaction.entity';
import { Member } from '../members/entities/member.entity';
import { plainToInstance } from 'class-transformer';
import { XpTransactionResponseDto } from './dto/responses/xp-transaction.response.dto';

@Injectable()
export class XpTransactionsService {
  constructor(
    @InjectRepository(XpTransaction)
    private xpTransactionRepository: Repository<XpTransaction>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>
  ) {}

  async create(createXpTransactionDto: CreateXpTransactionDto): Promise<XpTransactionResponseDto> {
    const member = await this.memberRepository.findOne({
      where: { idMember: createXpTransactionDto.idMember }
    });

    if (!member) {
      throw new NotFoundException(`Member with id ${createXpTransactionDto.idMember} not found`);
    }

    // Vérifier que la valeur est un nombre valide
    const transactionValue = parseFloat(String(createXpTransactionDto.transactionValue));
    if (isNaN(transactionValue)) {
      throw new BadRequestException('La valeur de la transaction doit être un nombre valide');
    }

    // Créer la transaction
    const transaction = this.xpTransactionRepository.create({
      transactionType: createXpTransactionDto.transactionType,
      transactionValue: createXpTransactionDto.transactionValue,
      source: createXpTransactionDto.source,
      reason: createXpTransactionDto.reason,
      notes: createXpTransactionDto.notes,
      referenceType: createXpTransactionDto.referenceType,
      idReference: createXpTransactionDto.idReference,
      member,
    });

    const savedTransaction = await this.xpTransactionRepository.save(transaction);
    
    // Retourner la transaction avec ses relations
    const transactionWithRelations = await this.xpTransactionRepository.findOne({
      where: { idXpTransaction: savedTransaction.idXpTransaction },
      relations: ['member'],
    });

    return plainToInstance(XpTransactionResponseDto, transactionWithRelations, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<XpTransactionResponseDto[]> {
    const transactions = await this.xpTransactionRepository.find({
      relations: ['member'],
      order: {
        createdAt: 'DESC'
      }
    });

    return transactions.map(transaction => 
      plainToInstance(XpTransactionResponseDto, transaction, { excludeExtraneousValues: true })
    );
  }

  async findByMember(idMember: string): Promise<XpTransactionResponseDto[]> {
    // Vérifier que le membre existe
    const member = await this.memberRepository.findOne({
      where: { idMember }
    });

    if (!member) {
      throw new NotFoundException(`Member with id ${idMember} not found`);
    }

    // Récupérer toutes les transactions du membre
    const transactions = await this.xpTransactionRepository.find({
      where: { member: { idMember } },
      relations: ['member'],
      order: {
        createdAt: 'DESC'
      }
    });

    return transactions.map(transaction => 
      plainToInstance(XpTransactionResponseDto, transaction, { excludeExtraneousValues: true })
    );
  }

  async findOne(idXpTransaction : string): Promise<XpTransactionResponseDto> {
    const transaction = await this.xpTransactionRepository.findOne({
      where: { idXpTransaction: idXpTransaction },
      relations: ['member']
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction XP avec l'id ${idXpTransaction} non trouvée`);
    }

    return plainToInstance(XpTransactionResponseDto, transaction, { excludeExtraneousValues: true });
  }

  async remove(idXpTransaction: string): Promise<void> {
    throw new BadRequestException('Les transactions XP ne peuvent pas être supprimées');
  }
}
