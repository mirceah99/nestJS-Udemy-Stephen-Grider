import { Controller, Get, Injectable } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DiskService } from 'src/disk/disk.service';

@Controller('computer')
export class ComputerController {
  constructor(
    private diskService: DiskService,
    private cpuService: CpuService,
  ) {}
  @Get('run')
  run() {
    this.cpuService.compute(3, 7);
    this.diskService.writeDataOnDisk('312');
    return this.diskService.getData();
  }
}
