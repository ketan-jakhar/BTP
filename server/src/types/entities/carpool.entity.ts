import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
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

  @Column({ type: 'text', nullable: false })
  drop_location!: string;

  @Column({ type: 'text', nullable: false })
  pickup_location!: string;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  is_completed: boolean;
}
