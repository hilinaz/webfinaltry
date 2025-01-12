import { Column, Entity, ManyToOne, PrimaryGeneratedColumn ,JoinColumn,CreateDateColumn,OneToMany} from "typeorm";
import { Role } from 'src/role/role.entity';
import { post } from 'src/post/post.entity'; 

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    fullname: string;

    @Column({ type: 'varchar', length: 255 })
    username: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

   

    @CreateDateColumn({ type: 'timestamp' })
    createdOn: Date;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @OneToMany(() => post, (post) => post.user)
    posts: post[];
}
