import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Connect } from './connect.entity';

@Entity('Ingredient')
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'tinyint' })
  oven: number;

  @Column({ type: 'varchar' })
  type: string;

  @OneToMany(() => Connect, (connect) => connect.ingredient, {
    cascade: true,
  })
  connects: Connect[];

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'boolean', default: false })
  deleted: boolean;
}
