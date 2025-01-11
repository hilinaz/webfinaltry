import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn } from "typeorm";
import { Role } from 'src/role/role.entity';
import { OneToMany } from 'typeorm'; // <-- Add OneToMany here
import { Post } from '../posts/post.entity'; // Import Post entity for relationships


@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    fullname: string

    @Column({ type: 'varchar', length: 255 })
    username: string

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;
    @Column({ type: 'varchar', length: 255 })
    password

    @CreateDateColumn({ type: 'timestamp' })
    createdOn: Date;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @OneToMany(() => Post, (post) => post.user) // Many posts belong to one user
    posts: Post[];

}