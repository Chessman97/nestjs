import { Provider } from '@nestjs/common';
import { Customer, CustomerToManagerAssign, Manager } from '..';
import {
  CUSTOMER_REPOSITORY,
  CUSTOMER_TO_MANAGER_REPOSITORY,
  MANAGER_REPOSITORY,
} from '../../../common/constants';

export const customersProviders: Provider[] = [
  {
    provide: CUSTOMER_REPOSITORY,
    useValue: Customer,
  },
];

export const managersProviders: Provider[] = [
  {
    provide: MANAGER_REPOSITORY,
    useValue: Manager,
  },
];

export const customerToManagersProviders: Provider[] = [
  {
    provide: CUSTOMER_TO_MANAGER_REPOSITORY,
    useValue: CustomerToManagerAssign,
  },
];
