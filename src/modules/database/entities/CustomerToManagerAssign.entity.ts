import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'customer_to_manager_assign' })
export class CustomerToManagerAssign extends Model {
  @Column({ primaryKey: true })
  customer_id: number;

  @Column({ primaryKey: true })
  city_id: number;

  @Column({ primaryKey: true })
  manager_id: number;

  @Column({ type: 'date' })
  created_at: Date | string;

  @Column
  comment: string;
}
