import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { EmployeeSaleryEntity } from './entities/salery-payments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity, EmployeeSaleryEntity])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
