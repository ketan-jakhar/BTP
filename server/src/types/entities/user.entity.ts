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
import bcrypt from 'bcryptjs';
import { Product, BaseResource, Carpool } from '.';
import { UserRole } from '../enums';

@Entity('users')
@Unique(['email'])
export class User extends BaseResource {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({ type: 'uuid', nullable: false })
  id!: string;

  // Establishing One-to-Many Relationship with Product
  // One User can have many Products
  @OneToMany(() => Product, (product: Product) => product.id)
  products: Product[];

  // Establishing Many-to-Many Relationship with User
  // Many Products belong to many Users
  @ManyToMany(() => Product, (product: Product) => product.id)
  @JoinTable({ name: 'product_cart' })
  product_cart: Product[];

  // Establishing One-to-Many Relationship with Carpool
  // One User can have many Carpools
  @ManyToMany(() => Carpool, (carpool: Carpool) => carpool.id)
  carpools: Carpool[];

  @Column({ nullable: true })
  name?: string;

  @Index('email_index')
  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({ type: 'bigint', nullable: true })
  contact_number?: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    nullable: true,
  })
  changePasswordToken: string;

  @Column({ type: 'timestamp', nullable: true })
  last_login_at?: Date;

  //Validate password
  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
