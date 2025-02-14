import { Injectable } from '@nestjs/common';
import { Connect } from 'src/entity/connect.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class ConnectRepository extends Repository<Connect> {
  constructor(dataSource: DataSource) {
    super(Connect, dataSource.createEntityManager());
  }
}
