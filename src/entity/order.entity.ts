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

@Entity('Order')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: bigint;

  @Column({ type: 'varchar', length: 200, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 10, default: 'pizza' })
  type: string;

  @Column({ type: 'text' })
  script: string;

  @OneToMany(() => Connect, (connect) => connect.order, { cascade: true })
  connects: Connect[];

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'boolean', default: false })
  deleted: boolean;
}
