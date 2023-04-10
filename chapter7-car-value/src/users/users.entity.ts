import Report from 'src/reports/reports.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
  @AfterInsert()
  logInsert() {
    process.env.LOG_DB && console.log(`insert user ${JSON.stringify(this)}`);
  }
  @AfterUpdate()
  logUpdate() {
    process.env.LOG_DB && console.log(`update user with id: ${this.id}`);
  }
  @AfterRemove()
  logRemove() {
    process.env.LOG_DB && console.log(`remove user with id: ${this.id}`);
  }
}
