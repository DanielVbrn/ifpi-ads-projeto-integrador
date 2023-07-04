import { Column, ManyToOne, Entity, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";
import { Equipments } from "../../Equipments/entity/Equipments";
import { Reserva } from "../../ReserveExemplary/entity/ReserveExemplary";

@Entity()
export class Exemplary {
  @PrimaryGeneratedColumn()
  tombo: number;

  @ManyToOne(() => Equipments)
  @JoinColumn({ name: "equipmentId" })
  equipments: Equipments;
  
    @OneToMany(() => Reserva, (reserva) => reserva.exemplary)
    reservas: Reserva[];

  @Column()
  status:boolean;

   
}
