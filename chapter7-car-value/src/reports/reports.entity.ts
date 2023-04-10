import User from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
@Entity()
export default class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: false })
  approved: boolean;
  @Column()
  price: number;
  @Column()
  make: string;
  @Column()
  model: string;
  @Column()
  year: number;
  @Column()
  lng: number;
  @Column()
  lat: number;
  @Column()
  mileage: number;

  @ManyToMany(() => User, (user) => user.reports)
  user: User;
}
