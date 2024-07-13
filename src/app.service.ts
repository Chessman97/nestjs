import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CustomersService } from './modules/customers/customers.service';
import { ManagersService } from './modules/managers/managers.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @Inject(CustomersService)
    private customersService: CustomersService,
    @Inject(ManagersService)
    private managersService: ManagersService,
  ) {}

  onApplicationBootstrap(): void {
    this.startApplication();
  }

  // Успел только достать все данные для формирования отчета, подразумевалось использовать пакет xslx
  async startApplication(): Promise<void> {
    // Пользователи для персонального менеджера
    const users = await this.customersService.findAllUsersForPersonalManagers();
    // Персональные менеджеры
    const managers = await this.managersService.findAllPersonalManagers();
    for (const manager of managers) {
      // Здесь должно происходить добавление/обновление клиентов на SQL
      // Ниже код, который формирует массив новых пользователей newClients для каждого менеджера, т.к. не успел реализовать
      // newClientsManager это количество новых клиентов
      const newClientsManager = 3000 - manager.attached_clients_count;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newClients = users.slice(0, newClientsManager);
      users.splice(0, newClientsManager);
    }

    // Кол-во клиентов, которых довел до 1-го заказа по фамилии «Менеджерами по привлечению»
    const countClientsForManagerBefore = await this.managersService.countManagersBefore();
    // Кол-во клиентов, до распределения по фамилии «Персональных менеджеров»
    const countClientsForManagerBeforePersonal =
      await this.managersService.countManagersBeforePersonal();
    // Количество после исходя из цикла выше сформируется

    // Сколько Клиентов было доведено до 1-го заказа всеми «Менеджерами по привлечению»
    const countClientsAll = await this.managersService.countClientsBefore();
    //Какому «Персональному менеджеру» больше всего досталось Клиентов? И сколько ему досталось новых Клиентов
    // Каштанов Богдан Георгиевич досталось 70 новых клиентов

    console.log(users);
    console.log(managers);
    console.log(countClientsForManagerBefore);
    console.log(countClientsAll);
    console.log(countClientsForManagerBeforePersonal);
  }
}
