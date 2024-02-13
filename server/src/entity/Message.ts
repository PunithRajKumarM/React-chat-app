import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false })
  timestamp: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  email: string;

  // @ManyToOne(() => User)
  // sender: User;
}
