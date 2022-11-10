import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User, BaseResource } from '.';
import { ProductCategory } from '../enums';

@Entity('products')
export class Product extends BaseResource {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id!: string;

  // Establishing Many-to-One Relationship with User
  // Many Products belong to a single User
  @Column({ nullable: false })
  publisher_id: string;
  @ManyToOne(() => User, (user: User) => user.id, {
    eager: false,
  })
  @JoinColumn({ name: 'publisher_id' })
  user: User;

  @Column({ nullable: false })
  name!: string;

  @Column({ type: 'int', nullable: false })
  price!: number;

  @Column({
    type: 'enum',
    nullable: false,
    enum: ProductCategory,
    default: ProductCategory.OTHERS,
  })
  category!: ProductCategory;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  additional_remarks?: string;

  @Column({
    type: 'boolean',
    nullable: true,
    default: true,
  })
  is_available: boolean;

  @Column({ type: 'timestamp', nullable: true })
  sell_time: Date;
}
