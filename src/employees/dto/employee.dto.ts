import { IsString, IsOptional } from 'class-validator';

export class EmployeeDto {
  @IsString()
  nic: string;
  @IsString()
  contactNo: string;
  @IsString()
  address: string;
  @IsOptional()
  activeStatus: number;
}
