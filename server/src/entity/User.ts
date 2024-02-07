import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Message } from "./Message";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  googleID: string;

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];
}
