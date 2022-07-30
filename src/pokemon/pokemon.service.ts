import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { QueryDto } from 'src/common/dtos/query.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async findAll(query: QueryDto) {
    const { limit = 10, offset = 0 } = query;
    const skip = (offset - 1) * limit;

    return await this.pokemonModel
      .find()
      .select('name no')
      .limit(limit)
      .skip(skip)
      .sort({ no: 1 });
  }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;
    } catch (error) {
      if (error?.code === 11000) {
        throw new BadRequestException(
          `Pokemon already exists ${JSON.stringify(error.keyValue)}`,
        );
      }

      console.log(error);

      throw new InternalServerErrorException(
        `Pokemon could not be created, check the logs`,
      );
    }
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLocaleLowerCase(),
      });
    }

    if (!pokemon) throw new NotFoundException(`Pokemon not found`);

    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    const pokemon = await this.pokemonModel.findByIdAndUpdate(
      id,
      updatePokemonDto,
      { new: true },
    );

    return pokemon;
  }

  async remove(id: string) {
    const pokemon = await this.pokemonModel.findById(id);

    if (!pokemon) throw new NotFoundException(`Pokemon not found`);

    pokemon.delete();

    return { message: `Pokemon ${id} deleted` };
  }
}
