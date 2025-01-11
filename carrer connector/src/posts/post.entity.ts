import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    photo: string;

    @Column()
    description: string;

    @Column()
    experianceRange: number;

    @Column()
    wantedSalary: number;



    @Column()
    cvLink: string;

    @ManyToOne(() => User, (user) => user.posts, {eager:false})
    user: User; // Relation to the user who created the post
}
