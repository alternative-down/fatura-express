import { describe, it, expect, vi, beforeEach } from 'vitest';

// hoisted mock — vi.mock is always hoisted to the top of the file,
// so mockJwtVerify is available before any imports run
const { mockJwtVerify } = vi.hoisted(() => {
  return { mockJwtVerify: vi.fn() };
});

vi.mock('jose', () => ({
  SignJWT: vi.fn().mockImplementation(function MockSignJWT(_payload: unknown) {
    return {
      setProtectedHeader: vi.fn().mockReturnThis(),
      setIssuedAt: vi.fn().mockReturnThis(),
      setExpirationTime: vi.fn().mockReturnThis(),
      sign: vi.fn().mockResolvedValue('mock.jwt.token'),
    };
  }),
  jwtVerify: mockJwtVerify,
}));

// Set JWT_SECRET BEFORE auth.ts is imported (module-level, runs during module eval)
process.env.JWT_SECRET = 'test-jwt-secret-for-unit-testing-32-chars-long!!';

import { signToken, verifyToken } from '../auth';

describe('signToken', () => {
  it('returns a promise resolving to a JWT string', async () => {
    const token = await signToken({ userId: 'user-123', email: 'test@example.com' });
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
    expect(token.split('.').length).toBe(3);
  });

  it('accepts arbitrary extra fields in payload', async () => {
    const token = await signToken({ userId: 'user-1', email: 'a@b.com', name: 'Test', role: 'admin' as const });
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3);
  });
});

describe('verifyToken', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns payload for valid token', async () => {
    const mockPayload = { userId: 'user-123', email: 'test@example.com' };
    mockJwtVerify.mockResolvedValueOnce({ payload: mockPayload });
    const result = await verifyToken('valid.token.here');
    expect(result).toEqual(mockPayload);
  });

  it('returns null on invalid token', async () => {
    mockJwtVerify.mockRejectedValueOnce(new Error('Invalid token'));
    const result = await verifyToken('bad.token');
    expect(result).toBeNull();
  });

  it('returns null when jwtVerify throws', async () => {
    mockJwtVerify.mockRejectedValueOnce(new Error('expired'));
    const result = await verifyToken('expired.token');
    expect(result).toBeNull();
  });
});