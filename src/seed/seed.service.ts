import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PokemonResponse } from './types';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly client: AxiosAdapter,
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async run() {
    await this.pokemonModel.deleteMany({});

    const data = await this.client.get<PokemonResponse>(
      ' https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemons = data.results.map(({ name, url }) => {
      const urlArray = url.split('/');
      const no = urlArray[urlArray.length - 2];

      return {
        name,
        no,
      };
    });

    await this.pokemonModel.insertMany(pokemons);

    return {
      message: 'Seeded successfully',
    };
  }
}
