import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne
} from "typeorm";
import { User } from "../../User/entities/user.entity";

@Entity()
export class Fav extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("integer", { nullable: false })
  idCharacter: number;

  @Column("boolean", { nullable: false, default: false })
  fav: boolean;

  @ManyToOne((type) => User, (user) => user.fav)
  user: User;

  @Column("timestamp", { name: "created_at", default: () => "NOW()" })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at", default: () => "NOW()" })
  updatedAt: Date;
}
