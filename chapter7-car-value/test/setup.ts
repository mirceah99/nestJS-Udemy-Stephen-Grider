import { rm } from 'fs/promises';
import { join } from 'path';
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (e) {
    console.log(`ERROR DELETING FILE!!!`);
    if (e.errno === -4058) return; // file not found
    throw e;
  }
});
