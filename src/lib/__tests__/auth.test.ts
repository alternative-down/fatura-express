import { describe, it, expect } from 'vitest';
import { signToken, verifyToken } from '../auth';

describe('signToken', () => {
  it('returns a promise resolving to a JWT-like string', async () => {
    const token = await signToken({ userId: 'user-123', email: 'test@example.com' });
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
    // JWT-like structure: three dot-separated base64url segments
    expect(token.split('.').length).toBe(3);
  });

  it('accepts arbitrary extra fields in payload', async () => {
    const token = await signToken({
      userId: 'user-1',
      email: 'a@b.com',
      name: 'Test',
      role: 'admin' as const,
    });
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3);
  });

  it('encodes different payloads as different tokens', async () => {
    const t1 = await signToken({ userId: 'alice' });
    const t2 = await signToken({ userId: 'bob' });
    expect(t1).not.toBe(t2);
  });
});

describe('verifyToken', () => {
  it('returns null for a structurally invalid token string', async () => {
    const result = await verifyToken('not-a-valid-jwt.at.all');
    expect(result).toBeNull();
  });

  it('returns null for empty string', async () => {
    const result = await verifyToken('');
    expect(result).toBeNull();
  });

  it('roundtrips: sign + verify returns the original payload', async () => {
    const payload = { userId: 'user-123', email: 'test@example.com' };
    const token = await signToken(payload);
    const verified = await verifyToken(token);
    expect(verified).not.toBeNull();
    expect(verified).toHaveProperty('userId', 'user-123');
    expect(verified).toHaveProperty('email', 'test@example.com');
    expect(verified).toHaveProperty('iat');
    expect(verified).toHaveProperty('exp');
  });

  it('includes iat and exp in verified payload', async () => {
    const token = await signToken({ userId: 'test' });
    const verified = await verifyToken(token);
    expect(typeof verified?.iat).toBe('number');
    expect(typeof verified?.exp).toBe('number');
    expect(verified!.exp).toBeGreaterThan(verified!.iat);
  });
});