import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import {Exemplary} from "../../Exemplary/entity/Exemplary";

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data_devolucao: Date;

  @ManyToOne(() => Exemplary, (exemplary) => exemplary.reservas)
  exemplary: Exemplary;
}

