import { Column, Model, Table, PrimaryKey } from 'sequelize-typescript';

@Table
export class Product extends Model {
  @Column({ primaryKey: true })
  id: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  price: number;
}
