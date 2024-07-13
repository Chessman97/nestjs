import { Inject, Injectable } from '@nestjs/common';
import { Op, QueryTypes } from 'sequelize';
import { MANAGER_REPOSITORY } from '../common/constants';
import { Manager } from '../database/entities';

@Injectable()
export class ManagersService {
  constructor(
    @Inject(MANAGER_REPOSITORY)
    private managersRepository: typeof Manager,
  ) {}

  async findAllPersonalManagers(): Promise<Manager[]> {
    return await this.managersRepository.findAll<Manager>({
      attributes: ['id', 'fio', 'role', 'efficiency', 'attached_clients_count'],
      where: {
        role: 'Персональный менеджер',
        attached_clients_count: { [Op.lt]: 3000 },
      },
      order: [['efficiency', 'DESC']],
    });
  }

  async countManagersBefore(): Promise<{ count: number; fio: string }[]> {
    const result: { count: number; fio: string }[] = await this.managersRepository.sequelize.query(
      `SELECT count(ctma.manager_id) as count, m.fio as fio
    FROM customer_to_manager_assign ctma 
    LEFT JOIN customers c ON c.id = ctma.customer_id AND c.city_id = ctma.city_id
    LEFT JOIN managers m ON m.id = ctma.manager_id
    WHERE m.role = 'Менеджер по привлечению'
        AND c.first_order_date != 0
GROUP BY ctma.manager_id, m.fio`,
      { type: QueryTypes.SELECT },
    );
    return result;
  }

  async countClientsBefore(): Promise<{ count: number }> {
    const result: { count: number }[] = await this.managersRepository.sequelize.query(
      `SELECT count(customer_id) as count
    FROM customer_to_manager_assign ctma 
    LEFT JOIN customers c ON c.id = ctma.customer_id AND c.city_id = ctma.city_id
    LEFT JOIN managers m ON m.id = ctma.manager_id
    WHERE m.role = 'Менеджер по привлечению'
        AND c.first_order_date != 0`,
      { type: QueryTypes.SELECT },
    );
    return result[0];
  }

  async countManagersBeforePersonal(): Promise<{ count: number; fio: string }[]> {
    const result: { count: number; fio: string }[] = await this.managersRepository.sequelize.query(
      `SELECT count(ctma.manager_id) as count, m.fio as fio
    FROM customer_to_manager_assign ctma 
    LEFT JOIN customers c ON c.id = ctma.customer_id AND c.city_id = ctma.city_id
    LEFT JOIN managers m ON m.id = ctma.manager_id
    WHERE m.role = 'Персональный менеджер'
        AND c.first_order_date != 0
GROUP BY ctma.manager_id, m.fio`,
      { type: QueryTypes.SELECT },
    );
    return result;
  }
}
