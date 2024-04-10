// FILEPATH: /Users/felixwahlberg/Documents/React Native/ticketing-ts/auth/src/routes/__test__/signout.test.ts

import request from 'supertest';
import { app } from '../../app'; // Assuming you have an app.ts file that exports your express app

describe('Sign Out Route', () => {
  it('should clear the cookie after signing out', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        fullName: 'John Doe',
        email: 'test3@test.com',
        password: 'password',
      })
      .expect(201);

    const response = await request(app)
      .post('/api/users/signout')
      .send({})
      .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});