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

@Entity(`Order`)
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: true })
  base_order_id?: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 10, default: 'pizza' })
  type: string;

  @Column({ type: 'text', nullable: true })
  script: string;

  @Column({ type: 'varchar', nullable: true })
  imageUrl?: string;

  @OneToMany(() => Connect, (connect) => connect.order, { cascade: true })
  connects: Connect[];

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
