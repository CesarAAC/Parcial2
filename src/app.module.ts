import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaseModule } from './clase/clase.module';
import { CertificacionModule } from './certificacion/certificacion.module';
import { ResenaModule } from './resena/resena.module';
import { TruequeModule } from './trueque/trueque.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Clase } from './clase/clase.entity';
import { Certificacion } from './certificacion/certificacion.entity';
import { Resena } from './resena/resena.entity';
import { Trueque } from './trueque/trueque.entity';
import { Usuario } from './usuario/usuario.entity';
import { BonoModule } from './bono/bono.module';
import { ClaseBonoModule } from './clase-bono/clase-bono.module';

@Module({
  imports: [
    ClaseModule,
    CertificacionModule,
    ResenaModule,
    TruequeModule,
    UsuarioModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'truek',
      entities: [Clase, Certificacion, Resena, Trueque, Usuario],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    BonoModule,
    ClaseBonoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
