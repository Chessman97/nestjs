import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomersService } from './modules/customers/customers.service';
import { DatabaseModule } from './modules/database/database.module';
import {
  customersProviders,
  managersProviders,
} from './modules/database/entities/providers/entities.provider';
import { ManagersService } from './modules/managers/managers.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    AppService,
    CustomersService,
    ManagersService,
    ...customersProviders,
    ...managersProviders,
  ],
})
export class AppModule {}
