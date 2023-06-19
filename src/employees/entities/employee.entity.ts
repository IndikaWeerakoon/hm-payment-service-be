import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'employee' })
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'emp_id' })
  empId: string;

  @Column({
    name: 'nic',
    type: 'varchar',
    unique: true,
  })
  nic: string;

  @Column({
    name: 'contact_no',
    type: 'varchar',
  })
  contactNo: string;

  @Column({
    name: 'address',
    type: 'varchar',
  })
  address: string;

  @Column({
    name: 'active_status',
    type: 'bit',
    default: '1',
  })
  activeStatus: number;
}
