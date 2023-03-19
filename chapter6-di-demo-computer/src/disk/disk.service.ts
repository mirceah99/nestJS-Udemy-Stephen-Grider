import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {}
  writeDataOnDisk(data: string) {
    console.log(`writing data on disk "${data} ..."`);
    this.powerService.supplyPower(15);
  }
  getData() {
    console.log(`get data from disk`);
    this.powerService.supplyPower(15);
    return 'data';
  }
}
