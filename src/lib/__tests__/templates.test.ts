import { describe, it, expect } from 'vitest';
import { TEMPLATES, getTemplateById, renderInvoice } from '../templates';
import type { InvoiceTemplate } from '../templates';

describe('TEMPLATES', () => {
  it('has 2 invoice templates', () => {
    expect(TEMPLATES).toHaveLength(2);
  });

  it('both templates are free', () => {
    TEMPLATES.forEach(t => {
      expect(t.planType).toBe('free');
      expect(t.price).toBe(0);
    });
  });

  it('each template has a unique id', () => {
    const ids = TEMPLATES.map(t => t.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('each template has required fields', () => {
    TEMPLATES.forEach(t => {
      expect(typeof t.id).toBe('string');
      expect(t.id.length).toBeGreaterThan(0);
      expect(typeof t.name).toBe('string');
      expect(typeof t.description).toBe('string');
      expect(t.planType).toBe('free');
      expect(t.price).toBe(0);
      expect(typeof t.icon).toBe('string');
      expect(t.fields).toBeInstanceOf(Array);
      expect(t.fields.length).toBeGreaterThan(0);
    });
  });

  it('each field has required properties', () => {
    TEMPLATES.forEach(t => {
      t.fields.forEach(field => {
        expect(typeof field.label).toBe('string');
        expect(typeof field.key).toBe('string');
        expect(typeof field.required).toBe('boolean');
        expect(typeof field.placeholder).toBe('string');
      });
    });
  });

  it('padrao template has all fiscal fields', () => {
    const padrao = TEMPLATES.find(t => t.id === 'padrao');
    expect(padrao).toBeDefined();
    const keys = padrao!.fields.map(f => f.key);
    expect(keys).toContain('issuerName');
    expect(keys).toContain('issuerCNPJ');
    expect(keys).toContain('clientName');
    expect(keys).toContain('clientCNPJ');
    expect(keys).toContain('totalPrice');
  });
});

describe('getTemplateById', () => {
  it('returns template for valid id', () => {
    const padrao = getTemplateById('padrao');
    expect(padrao).toBeDefined();
    expect(padrao!.name).toBe('Padrao');
  });

  it('returns template for outro id', () => {
    const simples = getTemplateById('simples');
    expect(simples).toBeDefined();
    expect(simples!.name).toBe('Simples');
  });

  it('returns undefined for invalid id', () => {
    const result = getTemplateById('nonexistent');
    expect(result).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    expect(getTemplateById('')).toBeUndefined();
  });
});

describe('renderInvoice', () => {
  const padrao = TEMPLATES.find(t => t.id === 'padrao') as InvoiceTemplate;

  it('renders invoice with all provided fields', () => {
    const formData: Record<string, string> = {
      issuerName: 'Empresa XYZ Ltda',
      issuerCNPJ: '12.345.678/0001-90',
      issuerIE: '123.456.789',
      issuerAddress: 'Rua Example, 100, Sao Paulo - SP',
      clientName: 'Cliente ABC S.A.',
      clientCNPJ: '98.765.432/0001-10',
      clientAddress: 'Av. Paulista, 1000, Sao Paulo - SP',
      invoiceNumber: 'FAT-0001',
      issueDate: '13/04/2026',
      dueDate: '28/04/2026',
      description: 'Consultoria em gestao',
      quantity: '2',
      unitPrice: '1.500,00',
      totalPrice: '3.000,00',
      paymentMethod: 'PIX',
    };
    const output = renderInvoice(padrao, formData);
    expect(output).toContain('FATURA');
    expect(output).toContain('FAT-0001');
    expect(output).toContain('Empresa XYZ Ltda');
    expect(output).toContain('12.345.678/0001-90');
    expect(output).toContain('123.456.789'); // IE
    expect(output).toContain('Cliente ABC S.A.');
    expect(output).toContain('PIX');
  });

  it('calculates 10% tax correctly', () => {
    const formData: Record<string, string> = {
      issuerName: 'X', issuerCNPJ: 'X', issuerAddress: 'X',
      clientName: 'X', clientCNPJ: 'X', clientAddress: 'X',
      invoiceNumber: 'X', issueDate: 'X', dueDate: 'X',
      description: 'X', quantity: '1', unitPrice: '1.000,00',
      totalPrice: '1.000,00', paymentMethod: 'PIX',
    };
    const output = renderInvoice(padrao, formData);
    // Subtotal 1000, tax 100, total 1100
    expect(output).toContain('Subtotal:');
    expect(output).toContain('Impostos (10%):');
    expect(output).toContain('TOTAL A PAGAR:');
    expect(output).toContain('R$ 100,00'); // tax
    expect(output).toContain('R$ 1.100,00'); // total
  });

  it('omits IE line when not provided', () => {
    const formData: Record<string, string> = {
      issuerName: 'X', issuerCNPJ: 'X', issuerAddress: 'X',
      clientName: 'X', clientCNPJ: 'X', clientAddress: 'X',
      invoiceNumber: 'X', issueDate: 'X', dueDate: 'X',
      description: 'X', quantity: '1', unitPrice: 'X',
      totalPrice: 'X', paymentMethod: 'PIX',
    };
    const output = renderInvoice(padrao, formData);
    // Should NOT contain "IE:" line when issuerIE is undefined
    expect(output).not.toContain('IE: [---]');
  });

  it('uses [---] placeholder for missing fields', () => {
    const output = renderInvoice(padrao, {});
    expect(output).toContain('[---]');
  });

  it('formats values with Brazilian locale', () => {
    const formData: Record<string, string> = {
      issuerName: 'X', issuerCNPJ: 'X', issuerAddress: 'X',
      clientName: 'X', clientCNPJ: 'X', clientAddress: 'X',
      invoiceNumber: 'X', issueDate: 'X', dueDate: 'X',
      description: 'X', quantity: '1', unitPrice: 'X',
      totalPrice: '0', paymentMethod: 'X',
    };
    const output = renderInvoice(padrao, formData);
    // Should handle zero value gracefully
    expect(output).toContain('R$ 0,00');
  });
});
