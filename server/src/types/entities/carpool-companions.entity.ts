import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
  Index,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User, BaseResource, Carpool } from '.';

@Entity('carpool_companions')
export class CarpoolCompanion extends BaseResource {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id!: string;

  // @ManyToOne(() => User, user => user.id)
  // @JoinColumn({ name: 'user_id' })
  // users: User[];

  // @ManyToMany(() => Carpool, carpool => carpool.id)
  // @JoinTable()
  // carpools: Carpool[];
}
