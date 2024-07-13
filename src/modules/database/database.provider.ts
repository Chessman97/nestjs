import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Customer, CustomerToManagerAssign, Manager } from './entities';

export const databaseProviders: Provider[] = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: '185.177.216.77',
        port: 3306,
        username: 'SDVQqd',
        password: 'eCSDvljTncjjIuBp',
        database: 'testdatabase',
      });
      sequelize.addModels([Customer, Manager, CustomerToManagerAssign]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
