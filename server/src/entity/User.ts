import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
