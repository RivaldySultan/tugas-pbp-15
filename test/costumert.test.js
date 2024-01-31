import request from 'supertest';
import web from '../src/application/web';

describe('Costumert-controller', () => {
    let authToken; // To store the authentication token
    let createdCostumertId; // To store the ID of the created Costumert

    describe('Login user', () => {
        it('Login user and get authentication token', async () => {
            const response = await request(web).post('/api/users/login').send({
                username: 'username2',
                password: 'password',
            });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
            authToken = response.body['data']['token'];
        });
    });

    describe('Create Costumert', () => {
        it('Should create a new Costumert', async () => {
            const response = await request(web)
                .post('/api/Costumerts')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: 'Test Costumert',
                    nikname: 'test_nickname',
                    email: 'test@example.com',
                    phone: '1234567890',
                });
            expect(response.status).toBe(200);

            // Store the created Costumert ID for further testing
            createdCostumertId = response.body['data']['id'];
        });
    });

    describe('Get Costumert', () => {
        it('Should get the created Costumert', async () => {
            const response = await request(web)
                .get(`/api/Costumerts/${createdCostumertId}`)
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(200);
        });
    });

    describe('Update Costumert', () => {
        it('Should update the created Costumert', async () => {
            const response = await request(web)
                .put(`/api/Costumerts/${createdCostumertId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: 'Updated Costumertprojectuascustomer',
                });
            expect(response.status).toBe(200);
        });
    });

    describe('Search Costumerts', () => {
        it('Should search for Costumerts', async () => {
            const response = await request(web)
                .get('/api/Costumerts')
                .set('Authorization', `Bearer ${authToken}`)
                .query({
                    page: 1,
                    size: 10,
                });
            expect(response.status).toBe(200);
        });
    });

    describe('Remove Costumert', () => {
        it('Should remove the created Costumert', async () => {
            const response = await request(web)
                .delete(`/api/Costumerts/${createdCostumertId}`)
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data', 'OK');
        });
    });
});

