// FILEPATH: /Users/felixwahlberg/Documents/React Native/ticketing-ts/auth/src/routes/__test__/current-user.test.ts

import request from 'supertest';
import { app } from '../../app'; // Assuming you have an app.ts file that exports your express app

describe('Current User Route', () => {
  it('should respond with details about the current user', async () => {
    // const authResponse = await request(app)
    //   .post('/api/users/signup')
    //   .send({
    //     fullName: 'John Doe',
    //     email: 'test@test.com',
    //     password: 'password',
    //   })
    //   .expect(201);

    // const cookie = authResponse.get('Set-Cookie');
    // console.log(cookie);
    const cookie = await global.signin();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie || []) // Add a default empty array if cookie is undefined
        .send()
        .expect(200);

     expect(response.body.currentUser.email).toEqual('test@test.com');
  });

  it('should respond with null if not authenticated', async () => {
    const response = await request(app)
      .get('/api/users/currentuser')
      .send()
      .expect(200);

      expect(response.body.currentUser).toEqual(null);
  });
});