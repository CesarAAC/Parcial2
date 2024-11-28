import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { BonoService } from 'src/bono/bono.service';

@Module({
 imports: [TypeOrmModule.forFeature([BonoEntity])],
 providers: [BonoService],
})
export class BonusModule {}