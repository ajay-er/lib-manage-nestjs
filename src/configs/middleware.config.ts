import { registerAs } from '@nestjs/config';

const MAX_FILE_SIZE_KB = 100 * 1024; // 100kb in bytes
const TIMEOUT_SECONDS = 30; // 30 seconds in milliseconds
const THROTTLE_TTL_MS = 500; // 0.5 seconds in milliseconds

export default registerAs(
  'middleware',
  (): Record<string, unknown> => ({
    body: {
      json: {
        maxFileSize: MAX_FILE_SIZE_KB,
      },
      raw: {
        maxFileSize: MAX_FILE_SIZE_KB,
      },
      text: {
        maxFileSize: MAX_FILE_SIZE_KB,
      },
      urlencoded: {
        maxFileSize: MAX_FILE_SIZE_KB,
      },
    },
    timeout: TIMEOUT_SECONDS * 1000, // Convert seconds to milliseconds
    cors: {
      allowMethod: ['GET', 'DELETE', 'PUT', 'PATCH', 'POST'],
      allowOrigin: '*',
      // allowOrigin: [/example\.com(\:\d{1,4})?$/], // allow all subdomain, and all port
      // allowOrigin: [/example\.com$/], // allow all subdomain without port
      allowHeader: [
        'Accept',
        'Accept-Language',
        'Content-Language',
        'Content-Type',
        'Origin',
        'Authorization',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Methods',
        'Access-Control-Allow-Credentials',
        'Access-Control-Expose-Headers',
        'Access-Control-Max-Age',
        'Referer',
        'Host',
        'user-agent',
      ],
    },
    throttle: {
      ttl: THROTTLE_TTL_MS,
      limit: 10,
    },
  }),
);
