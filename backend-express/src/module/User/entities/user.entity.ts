import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

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

  @Column("timestamp", { name: "created_at", default: () => "NOW()" })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at", default: () => "NOW()" })
  updatedAt: Date;

  @Column("timestamp", { name: "delete_at", default: null, nullable: true })
  deleteAt: Date;
}
