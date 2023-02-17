import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, default: '' })
  name: string;

  @Column('varchar', { length: 120, default: '' })
  email: string;

  @Column('varchar', { length: 255, default: '' })
  password: string;

  @Column('boolean', { default: true })
  state: boolean;

  @Column('timestamp', { name: 'date_created' })
  dateCreated: string;

  @Column('timestamp', { name: 'date_update' })
  dateUpdate: string;

  @Column('timestamp', { name: 'date_delete' })
  dateDelete: string;
}
