import { describe, it, expect } from 'vitest';
import { PLANS } from '../plans';

describe('PLANS', () => {
  it('has exactly 2 plans', () => {
    expect(PLANS).toHaveLength(2);
  });

  it('Individual plan has correct pricing', () => {
    const individual = PLANS.find(p => p.id === 'individual');
    expect(individual).toBeDefined();
    expect(individual!.price).toBe(19);
    expect(individual!.invoicesPerMonth).toBe(30);
    expect(individual!.recommended).toBeUndefined();
  });

  it('Ilimitado plan has correct pricing', () => {
    const ilimitado = PLANS.find(p => p.id === 'ilimitado');
    expect(ilimitado).toBeDefined();
    expect(ilimitado!.price).toBe(49);
    expect(ilimitado!.invoicesPerMonth).toBe(Infinity);
    expect(ilimitado!.recommended).toBe(true);
  });

  it('prices are positive integers', () => {
    PLANS.forEach(plan => {
      expect(plan.price).toBeGreaterThan(0);
      expect(Number.isInteger(plan.price)).toBe(true);
    });
  });

  it('both plans have required fields', () => {
    PLANS.forEach(plan => {
      expect(plan.id).toBeDefined();
      expect(plan.name).toBeDefined();
      expect(plan.price).toBeDefined();
      expect(plan.invoicesPerMonth).toBeDefined();
      expect(plan.features).toBeInstanceOf(Array);
      expect(plan.features.length).toBeGreaterThan(0);
    });
  });

  it('features are all non-empty strings', () => {
    PLANS.forEach(plan => {
      plan.features.forEach(feature => {
        expect(typeof feature).toBe('string');
        expect(feature.trim().length).toBeGreaterThan(0);
      });
    });
  });
});
