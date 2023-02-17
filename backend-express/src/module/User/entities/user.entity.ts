import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany
} from "typeorm";
import { Fav } from "../../ApiRM/entities/fav.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 255, default: "" })
  name: string;

  @Column("varchar", { length: 120, default: "" })
  email: string;

  @Column("varchar", { length: 255, default: "" })
  password: string;

  @Column("boolean", { default: true })
  state: boolean;

  @OneToMany((type) => Fav, (fav) => fav.user)
  fav: Fav[];

  @Column("timestamp", { name: "created_at", default: () => "NOW()" })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at", default: () => "NOW()" })
  updatedAt: Date;

  @Column("timestamp", { name: "delete_at", default: null, nullable: true })
  deleteAt: Date;
}
