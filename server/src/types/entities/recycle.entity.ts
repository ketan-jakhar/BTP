import { Entity, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { BaseResource } from '.';

@Entity('recycle')
export class Recycle extends BaseResource {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id!: string;
}
