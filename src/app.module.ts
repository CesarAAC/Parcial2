/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BonoModule } from './bono/bono.module';
import { BonoEntity } from './bono/bono.entity/bono.entity';
import { ClaseModule } from './clase/clase.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseEntity } from './clase/clase.entity/clase.entity';
import { UsuarioEntity } from './usuario/usuario.entity/usuario.entity';


@Module({
 imports: [BonoModule, ClaseModule, UsuarioModule,
   TypeOrmModule.forRoot({
     type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: 'postgres',
     database: 'parcial2',
     entities: [BonoEntity, ClaseEntity, UsuarioEntity],
     dropSchema: true,
     synchronize: true,
     keepConnectionAlive: true
   }),
 ],
 controllers: [AppController],
 providers: [AppService],
})
export class AppModule {}