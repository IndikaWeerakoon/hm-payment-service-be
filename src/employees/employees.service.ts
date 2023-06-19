import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeDto } from './dto/employee.dto';
import { SaleryPaymentDto } from './dto/salery-payment.dto';
import * as dayjs from 'dayjs';
import { Month } from './types/months.enum';
import { EmployeeSaleryEntity } from './entities/salery-payments.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepo: Repository<EmployeeEntity>,
    @InjectRepository(EmployeeSaleryEntity)
    private saleryRepo: Repository<EmployeeSaleryEntity>,
  ) {}

  async createEmployee(employee: EmployeeDto): Promise<EmployeeEntity> {
    try {
      const employeeEntity = this.employeeRepo.create(employee);
      return await this.employeeRepo.save(employeeEntity);
    } catch (err) {
      console.log(err);
      throw new HttpException('duplicate NIC inserted', HttpStatus.BAD_REQUEST);
    }
  }

  async updateEmployee(empId: string, employeeDto: EmployeeDto) {
    const employee = await this.employeeRepo
      .createQueryBuilder('emp')
      .where(`emp.empId = :empId`, { empId: empId })
      .getOne();

    if (!employee) {
      throw new HttpException('No employee found', HttpStatus.BAD_REQUEST);
    }

    try {
      const updatedEmployee = { ...employee, ...employeeDto };
      return await this.employeeRepo.save(updatedEmployee);
    } catch (err) {
      throw new HttpException('Duplicate key inserted', HttpStatus.BAD_REQUEST);
    }
  }

  async getEmployees(status: number) {
    if (status > 1 || status < -1) {
      throw new HttpException('invalid status', HttpStatus.BAD_REQUEST);
    }
    if (status === -1) {
      return this.employeeRepo.find();
    }
    return this.employeeRepo.find({ where: { activeStatus: status } });
  }

  async deleteEmployee(empId: string) {
    return this.employeeRepo.update({ empId: empId }, { activeStatus: 0 });
  }

  async createSaleryTransaction(empId: string, saleryTnx: SaleryPaymentDto) {
    const year = dayjs().year();
    const month = Object.values(Month)[dayjs().month()];

    const existingSalery = await this.saleryRepo.findOne({
      where: {
        year,
        month,
        employee: { empId },
      },
    });

    if (existingSalery) {
      throw new HttpException(
        'Salary for the current month for selected employee has already been made',
        HttpStatus.BAD_REQUEST,
      );
    }

    const saleryPaymentObj = {
      employee: { empId } as EmployeeEntity,
      month,
      year,
      salery: saleryTnx.salaryAmount,
    };

    const saleryPaymentEntity = this.saleryRepo.create(saleryPaymentObj);
    return this.saleryRepo.save(saleryPaymentEntity);
  }

  public getEmployeeSalery(empId: string, year: number) {
    return this.saleryRepo.find({
      relations: {
        employee: true,
      },
      where: { employee: { empId }, year },
      select: {
        employee: {
          nic: true,
          empId: true,
          contactNo: true,
        },
      },
    });
  }
}
