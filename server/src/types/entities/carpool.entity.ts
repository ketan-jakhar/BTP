import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User, BaseResource } from '.';

@Entity('carpool_details')
export class Carpool extends BaseResource {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id!: string;

  // Establishing Many-to-One Relationship with User
  // Many Carpools belong to a single User
  @Column({ nullable: false })
  publisher_id: string;
  @ManyToOne(() => User, (user: User) => user.id, {
    eager: false,
  })
  @JoinColumn({ name: 'publisher_id' })
  user: User;

  @ManyToMany(() => User, (user: User) => user.id)
  @JoinTable({ name: 'carpool_companion_details' })
  user_id: User[];

  @Column({ nullable: true })
  name!: string;

  @Column({ type: 'int', nullable: false })
  estimated_price!: number;

  @Column({ type: 'text', nullable: true })
  additional_remarks: string;

  @Column({ type: 'timestamp', nullable: false })
  departure_time!: Date;

  @Column({ type: 'int', nullable: false })
  capacity!: number;

  @Column({ type: 'int', nullable: false })
  rider_count!: number;

  @Column({ type: 'int', nullable: false })
  publisher_rider_count!: number;

  @Column({ type: 'text', nullable: false })
  destination!: string;

  @Column({ type: 'text', nullable: false })
  source!: string;

  @Column({ type: 'text', nullable: true })
  mapping: string;

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
  })
  is_completed: boolean;
}
