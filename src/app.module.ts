import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { appConfigValidation } from './config/app.config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: appConfigValidation,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './public'),
    }),

    MongooseModule.forRoot(process.env.MONGO_URL),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
