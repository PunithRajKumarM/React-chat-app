import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  message: string;

  @Column({ nullable: false })
  timestamp: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;
}
