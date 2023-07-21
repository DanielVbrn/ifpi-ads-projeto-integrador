import { PrimaryGeneratedColumn,CreateDateColumn,PrimaryColumn, Column, Entity , ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";


@Entity()
export class Reserve {
    @PrimaryGeneratedColumn()
    reserveId:number;

    @CreateDateColumn()
    data:Date;
    
    @Column({nullable:false})
    data_devolucao:Date;
}