import { Entity,PrimaryGeneratedColumn,Column,ManyToMany, JoinColumn, ManyToOne } from "typeorm";
import { User } from "src/user/user.entity";

@Entity('post')
export class post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profession: string;
  @Column()
  phone_number: string;

  @Column()
  description: string;

  @Column()
  experienceRange: string;

  @Column()
  wantedSalary: number;

  @Column()
  cv: string;
  @Column({ type: 'enum', enum: ['Male', 'Female'], default: 'Male' })
  gender: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
