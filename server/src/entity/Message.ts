import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  content: string;

  @Column({ type: "timestamp", nullable: false })
  timestamp: number;

  @Column({ nullable: false })
  userId: string;

  @ManyToOne(() => User)
  sender: User;
}
