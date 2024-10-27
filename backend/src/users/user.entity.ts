import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('users')
export class Users {
  @ObjectIdColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;
}
