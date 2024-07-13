import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'customers' })
export class Customer extends Model {
  @Column({ primaryKey: true })
  id: number;

  @Column({ primaryKey: true })
  city_id: number;

  @Column
  fio: string;

  @Column
  phone: string;

  @Column
  first_order_c: number;

  @Column({ type: 'date' })
  last_order_d: Date | string;
}
