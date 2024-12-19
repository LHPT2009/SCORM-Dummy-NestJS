import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('scorm_data')
export class ScormEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  userId: string;

  @Column({ type: 'varchar', length: 50 })
  lessonStatus: string;

  @Column({ type: 'varchar', length: 255 })
  lessonLocation: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
