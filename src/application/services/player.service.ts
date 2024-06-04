import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from 'src/domain/entities/player.entity';
import { CreatePlayerDto } from 'src/application/dtos/create-player.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = this.playerRepository.create(createPlayerDto);
    return this.playerRepository.save(player);
  }

  async updatePlayer(id: number, updatePlayerDto: Partial<CreatePlayerDto>): Promise<Player> {
    await this.playerRepository.update(id, updatePlayerDto);
    return this.getPlayerById(id);
  }

  async deletePlayer(id: number): Promise<void> {
    const player = await this.playerRepository.findOne({where:{id}});
    if (!player) {
      throw new NotFoundException('Player not found');
    }
    await this.playerRepository.softDelete(id);
  }

  async getPlayers(options: { page: number, limit: number }): Promise<Player[]> {
    const { page, limit } = options;
    const [result, total] = await this.playerRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return result;
  }

  async getPlayerById(id: number): Promise<Player> {
    const player = await this.playerRepository.findOne({where: {id}});
    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    return player;
  }
}
