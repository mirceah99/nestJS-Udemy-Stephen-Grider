import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Report from './reports.entity';
import { Repository } from 'typeorm';
import CreateReportDto from './dto/create-report.dto';
import User from 'src/users/users.entity';
import GetEstimateDto from './dto/get-estimate.dto';


@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.reportRepo.create(reportDto);
    report.user = user;
    return this.reportRepo.save(report);
  }
  async setApproved(reportId: number, approved: boolean) {
    const report = await this.reportRepo.findOneBy({ id: reportId });
    if (!report) throw new NotFoundException('report not found!!');
    report.approved = approved;
    return this.reportRepo.save(report);
  }
  async getEstimate({make, model, lat, lng, year, mileage}: GetEstimateDto){
    return this.reportRepo.createQueryBuilder()
    .select('AVG(price)','price')
    .where("make= :make", {make})
    .andWhere("model= :model", {model})
    .andWhere("lng- :lng BETWEEN -5 AND 5", {lng})
    .andWhere("lat- :lat BETWEEN -5 AND 5", {lat})
    .andWhere("year- :year BETWEEN -3 AND 3", {year})
    .andWhere("approved IS TRUE")
    .orderBy("ABS(mileage - :mileage)", "ASC")
    .setParameters({mileage})
    .getRawOne();
  }
}
