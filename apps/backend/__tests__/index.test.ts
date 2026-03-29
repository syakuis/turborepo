import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../src/index';

describe('Backend App API', () => {
  let server: any;

  beforeAll(() => {
    // Start server for testing
    server = app.listen(0); // Use random available port
  });

  afterAll(() => {
    // Close server after testing
    if (server) {
      server.close();
    }
  });

  describe('GET /', () => {
    it('should return Hello, World! message', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Hello, World! - Backend App');
      expect(response.body).toHaveProperty('timestamp');
      expect(typeof response.body.timestamp).toBe('string');
    });
  });

  describe('GET /api/hello', () => {
    it('should return Hello, World! when no name is provided', async () => {
      const response = await request(app)
        .get('/api/hello')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Hello, World!');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('should return personalized greeting when name is provided', async () => {
      const response = await request(app)
        .get('/api/hello/TypeScript')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Hello, TypeScript!');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
});
