import { Inject, Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { CUSTOMER_REPOSITORY } from '../common/constants';
import { Customer } from '../database/entities';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private customersRepository: typeof Customer,
  ) {}

  async findAllUsersForPersonalManagers(): Promise<Customer[]> {
    const users: Customer[] = await this.customersRepository.sequelize.query(
      `SELECT * -- Нераспределенные пользователи
FROM customers c
WHERE (c.id, c.city_id) NOT IN (
    SELECT ctma.customer_id, ctma.city_id
    FROM customer_to_manager_assign ctma 
    LEFT JOIN customers c ON c.id = ctma.customer_id AND c.city_id = ctma.city_id
    LEFT JOIN managers m ON m.id = ctma.manager_id
    WHERE m.role = 'Персональный менеджер'
)
AND c.first_order_date >= UNIX_TIMESTAMP('2024-06-03')
UNION ALL
SELECT * -- Пользователи, которые должны открпеиться и поменять менеджера
FROM customers c
WHERE (c.id, c.city_id) IN (
    SELECT ctma.customer_id, ctma.city_id
    FROM customer_to_manager_assign ctma 
    LEFT JOIN customers c ON c.id = ctma.customer_id AND c.city_id = ctma.city_id
    LEFT JOIN managers m ON m.id = ctma.manager_id
    WHERE m.role = 'Менеджер по привлечению'
        AND c.first_order_date != 0
)
AND c.first_order_date >= UNIX_TIMESTAMP('2024-06-03')`,
      { type: QueryTypes.SELECT },
    );
    return users;
  }
}
