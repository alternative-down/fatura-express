import { describe, it, expect, vi, beforeEach } from 'vitest';

// Hoisted mock so variable is available at hoisting time
const { mockJwtVerify } = vi.hoisted(() => {
  const fn = vi.fn();
  return { mockJwtVerify: fn };
});

// Mock jose before auth module loads
vi.mock('jose', () => {
  const mockSignJwt = vi.fn().mockImplementation(function mockConstructor(
    this: Record<string, unknown>,
    payload: unknown,
  ) {
    return {
      setProtectedHeader: vi.fn().mockReturnThis(),
      setIssuedAt: vi.fn().mockReturnThis(),
      setExpirationTime: vi.fn().mockReturnThis(),
      sign: vi.fn().mockResolvedValue('mock.jwt.token'),
    };
  });
  return {
    SignJWT: mockSignJwt,
    jwtVerify: mockJwtVerify,
  };
});

import { signToken, verifyToken } from '../auth';

describe('signToken', () => {
  it('returns a promise resolving to a JWT string', async () => {
    const payload = { userId: 'user-123', email: 'test@example.com' };
    const token = await signToken(payload);
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('accepts arbitrary extra fields', async () => {
    const payload = { userId: 'user-1', email: 'a@b.com', name: 'Test', role: 'admin' as const };
    const token = await signToken(payload);
    expect(typeof token).toBe('string');
  });
});

describe('verifyToken', () => {
  beforeEach(() => {
    mockJwtVerify.mockClear();
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