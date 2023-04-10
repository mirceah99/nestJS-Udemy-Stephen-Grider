import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication e2e', () => {
  let app: INestApplication;
  const email = `mircea-312513245@test.com`,
    password = 'mircea';
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterEach(async () => {
    await app.close();
  });

  it('POST /auth/signup', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password })
      .expect(201)
      .then((response) => {
        const { email, id } = response.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });
  it('sing up as new user and check whoami', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password })
      .expect(201);
    const cookie = res.get('Set-Cookie');
    await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200)
      .then((response) => {
        const { email, id } = response.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });
});
