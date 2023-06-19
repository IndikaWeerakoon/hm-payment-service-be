import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Month } from '../types/months.enum';
import { EmployeeEntity } from './employee.entity';

@Entity({ name: 'salery-payments' })
@Index(['employee', 'year'])
export class EmployeeSaleryEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'salery_pay_id' })
  saleryPayId: string;

  @Column({
    name: 'year',
    type: 'int',
  })
  year: number;

  @Column({
    name: 'month',
    type: 'varchar',
  })
  month: Month;

  @Column({
    name: 'salery',
    type: 'double precision',
  })
  salery: number;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @ManyToOne(() => EmployeeEntity, (emp) => emp.empId)
  @JoinColumn({
    name: 'emp_id',
  })
  employee: EmployeeEntity;
}
