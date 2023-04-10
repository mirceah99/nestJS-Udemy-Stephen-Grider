import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Report from './reports.entity';
import { Repository } from 'typeorm';
import CreateReportDto from './dto/create-report.dto';
import User from 'src/users/users.entity';

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
}
