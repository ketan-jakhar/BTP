import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User, BaseResource } from '.';
import { RecycleCategory } from '../enums';

@Entity('recycle')
export class Recycle extends BaseResource {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id!: string;

  // Establishing Many-to-One Relationship with User
  // Many Recycles belong to a single User
  @Column({ nullable: false })
  user_id: string;
  @ManyToOne(() => User, (user: User) => user.recycles, {
    eager: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: false })
  name!: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: RecycleCategory,
  })
  category!: RecycleCategory;

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @Column({ type: 'text', nullable: true })
  img_url?: string | null;

  @Column({
    type: 'boolean',
    nullable: true,
    default: true,
  })
  is_pickedup: boolean;

  @Column({ type: 'timestamp', nullable: true })
  recycle_pickup_time: string;
}
