import { IsNumber } from 'class-validator';

export class SaleryPaymentDto {
  @IsNumber()
  salaryAmount: number;
}
