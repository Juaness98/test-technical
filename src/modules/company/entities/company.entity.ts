import { BaseEntity, Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity('companies')
export class CompanyEntity extends BaseEntity {
  @PrimaryColumn()
  nit: string;

  @Column()
  name: string;

  @Column()
  direction: string;

  @Column()
  phoneNumber: string;
}
