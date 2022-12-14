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
  user_id: string;
  @ManyToOne(() => User, (user: User) => user.products, {
    eager: false,
  })
  @JoinColumn({ name: 'user_id' })
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
  img_url?: string | null;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'text', nullable: true })
  additional_remarks?: string | null;

  @Column({
    type: 'boolean',
    nullable: true,
    default: true,
  })
  is_available: boolean;

  @Column({ type: 'timestamp', nullable: true })
  sell_time: string;
}
