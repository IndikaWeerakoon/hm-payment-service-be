import { EmployeeEntity } from 'src/employees/entities/employee.entity';
import { EmployeeSaleryEntity } from 'src/employees/entities/salery-payments.entity';

export default () => ({
  database: {
    type: 'mssql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA,
    entities: [
      // __dirname + "/../**/*.entity{.ts,.js}",
      EmployeeEntity,
      EmployeeSaleryEntity,
    ],
    options: {
      encrypt: true, // for azure
      trustServerCertificate: false, // change to true for local dev / self-signed certs
    },
    logging: true,
    synchronize: true,
  },
});
