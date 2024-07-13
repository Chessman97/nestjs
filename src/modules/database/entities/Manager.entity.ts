import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'managers' })
export class Manager extends Model {
  @Column({ primaryKey: true })
  id: number;

  @Column
  fio: string;

  @Column
  role: string;

  @Column
  efficiency: number;

  @Column
  attached_clients_count: number;
}
