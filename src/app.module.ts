import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './app-config/app-config.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [AppConfigModule, EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
