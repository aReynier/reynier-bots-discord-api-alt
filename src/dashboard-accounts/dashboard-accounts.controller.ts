import { Controller, Post, Get, Put, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { DashboardAccountService } from './dashboard-accounts.service';
import { CreateDashboardAccountDto } from './dto/create-dashboard-account.dto';
import { UpdateDashboardAccountDto } from './dto/update-dashboard-account.dto';
import { DashboardAccount } from './entities/dashboard-account.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('dashboardAccounts')
export class DashboardAccountController {
    constructor(private readonly dashboardAccountService: DashboardAccountService) {}

    @Post()
    @ApiOperation({ summary: 'Créer un nouveau compte dashboard' })
    @ApiResponse({ 
        status: HttpStatus.CREATED, 
        description: 'Le compte a été créé avec succès',
        type: DashboardAccount 
    })
    @ApiResponse({ 
        status: HttpStatus.BAD_REQUEST, 
        description: 'Données invalides fournies'
    })
    @ApiResponse({ 
        status: HttpStatus.CONFLICT, 
        description: 'Un compte avec cet identifiant existe déjà'
    })
    async create(@Body() createDashboardAccountDto: CreateDashboardAccountDto): Promise<DashboardAccount> {
        return this.dashboardAccountService.create(createDashboardAccountDto);
    }
  
    @Get(':idDashboardAccount')
    @ApiOperation({ summary: 'Récupérer un compte dashboard par son UUID' })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'Le compte a été trouvé',
        type: DashboardAccount 
    })
    @ApiResponse({ 
        status: HttpStatus.NOT_FOUND, 
        description: 'Compte non trouvé'
    })
    async getByUUID(@Param('idDashboardAccount') idDashboardAccount: string): Promise<DashboardAccount> {
        return this.dashboardAccountService.getByUUID(idDashboardAccount);
    }

    @Put(':idDashboardAccount')
    @ApiOperation({ summary: 'Mettre à jour un compte dashboard' })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'Le compte a été mis à jour avec succès',
        type: DashboardAccount 
    })
    @ApiResponse({ 
        status: HttpStatus.NOT_FOUND, 
        description: 'Compte non trouvé'
    })
    @ApiResponse({ 
        status: HttpStatus.BAD_REQUEST, 
        description: 'Données invalides fournies'
    })
    async updateByUUID(
        @Param('idDashboardAccount') idDashboardAccount: string,
        @Body() updateDashboardAccountDto: UpdateDashboardAccountDto,
    ): Promise<DashboardAccount> {
        return this.dashboardAccountService.updateByUUID(idDashboardAccount, updateDashboardAccountDto);
    }

    @Delete(':idDashboardAccount')
    @ApiOperation({ summary: 'Supprimer un compte dashboard' })
    @ApiResponse({ 
        status: HttpStatus.NO_CONTENT, 
        description: 'Le compte a été supprimé avec succès'
    })
    @ApiResponse({ 
        status: HttpStatus.NOT_FOUND, 
        description: 'Compte non trouvé'
    })
    async deleteByUUID(@Param('idDashboardAccount') idDashboardAccount: string): Promise<void> {
        return this.dashboardAccountService.deleteByUUID(idDashboardAccount);
    }
}