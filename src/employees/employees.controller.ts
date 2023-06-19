import {
  Body,
  Controller,
  Post,
  Param,
  Put,
  Query,
  Get,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeesService } from './employees.service';
import { SaleryPaymentDto } from './dto/salery-payment.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @Post()
  public async createEmployee(@Body() employee: EmployeeDto) {
    return this.employeeService.createEmployee(employee);
  }

  @Put('/:id')
  public async updateEmployee(
    @Param('id') empId: string,
    @Body() employee: EmployeeDto,
  ) {
    return this.employeeService.updateEmployee(empId, employee);
  }

  @Get()
  public async getEmployeeList(@Query('status') status = -1) {
    return this.employeeService.getEmployees(status);
  }

  @Delete(':id')
  public async deleteEmployee(@Param('id') empId: string) {
    return this.employeeService.deleteEmployee(empId);
  }

  @Post(':id/salary-payments')
  public createSaleryTransaction(
    @Param('id') empId: string,
    @Body() saleryTnx: SaleryPaymentDto,
  ) {
    return this.employeeService.createSaleryTransaction(empId, saleryTnx);
  }

  @Get(':id/salary-payments')
  public getEmployeeSalery(
    @Param('id') empId: string,
    @Query('year', ParseIntPipe) year: number,
  ) {
    return this.employeeService.getEmployeeSalery(empId, year);
  }
}
