import { InvoiceTemplate } from './templates';

export interface InvoiceData {
  invoiceId: string;
  issuerName: string;
  issuerCNPJ: string;
  issuerIE?: string;
  issuerAddress: string;
  clientName: string;
  clientCNPJ: string;
  clientAddress: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  description: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  paymentMethod: string;
}

export function parseCurrency(value: string): number {
  const cleaned = (value || '0').replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}

export function buildInvoiceHtml(data: InvoiceData): string {
  const subtotal = parseCurrency(data.totalPrice);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; font-size: 12px; color: #1a1a2e; padding: 40px; }
  .header { text-align: center; border-bottom: 3px solid #1a56db; padding-bottom: 20px; margin-bottom: 24px; }
  .header h1 { font-size: 28px; color: #1a56db; letter-spacing: 2px; margin-bottom: 4px; }
  .header p { font-size: 11px; color: #64748b; }
  .invoice-meta { display: flex; justify-content: space-between; margin-bottom: 24px; }
  .invoice-meta .box { border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 14px; flex: 1; margin-right: 12px; }
  .invoice-meta .box:last-child { margin-right: 0; }
  .invoice-meta .label { font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
  .invoice-meta .value { font-size: 14px; font-weight: bold; color: #1e293b; }
  .parties { display: flex; gap: 16px; margin-bottom: 24px; }
  .party { border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px; flex: 1; }
  .party-title { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #1a56db; margin-bottom: 8px; font-weight: bold; }
  .party-name { font-size: 13px; font-weight: bold; color: #1e293b; margin-bottom: 4px; }
  .party-detail { font-size: 11px; color: #475569; line-height: 1.5; }
  .items-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
  .items-table th { background: #1a56db; color: white; padding: 10px 12px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
  .items-table td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 12px; }
  .items-table .amount-col { text-align: right; }
  .totals { display: flex; justify-content: flex-end; margin-bottom: 24px; }
  .totals-box { border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px; min-width: 260px; }
  .total-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 12px; }
  .total-row.grand { border-top: 2px solid #1a56db; padding-top: 10px; margin-top: 6px; font-size: 16px; font-weight: bold; color: #1a56db; }
  .payment { border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px; margin-bottom: 24px; }
  .payment-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #1a56db; margin-bottom: 6px; font-weight: bold; }
  .signatures { display: flex; justify-content: space-between; margin-top: 40px; }
  .signature-line { text-align: center; width: 45%; }
  .signature-line hr { border: none; border-top: 1px solid #1a1a2e; margin-bottom: 4px; }
  .signature-label { font-size: 10px; color: #64748b; }
  .footer { text-align: center; border-top: 1px solid #e2e8f0; padding-top: 12px; font-size: 10px; color: #94a3b8; }
</style>
</head>
<body>
  <div class="header">
    <h1>FATURA</h1>
    <p>Documento fiscal não substitui nota fiscal eletrônica</p>
  </div>

  <div class="invoice-meta">
    <div class="box">
      <div class="label">Número da Fatura</div>
      <div class="value">${data.invoiceNumber}</div>
    </div>
    <div class="box">
      <div class="label">Data de Emissão</div>
      <div class="value">${data.issueDate}</div>
    </div>
    <div class="box">
      <div class="label">Data de Vencimento</div>
      <div class="value">${data.dueDate}</div>
    </div>
  </div>

  <div class="parties">
    <div class="party">
      <div class="party-title">Emitente</div>
      <div class="party-name">${data.issuerName}</div>
      <div class="party-detail">CNPJ: ${data.issuerCNPJ}</div>
      ${data.issuerIE ? `<div class="party-detail">IE: ${data.issuerIE}</div>` : ''}
      <div class="party-detail">${data.issuerAddress}</div>
    </div>
    <div class="party">
      <div class="party-title">Cliente</div>
      <div class="party-name">${data.clientName}</div>
      <div class="party-detail">CNPJ: ${data.clientCNPJ}</div>
      <div class="party-detail">${data.clientAddress}</div>
    </div>
  </div>

  <table class="items-table">
    <thead>
      <tr>
        <th>Descrição do Serviço / Produto</th>
        <th style="text-align:center;">Qtd</th>
        <th class="amount-col">Valor Unitário</th>
        <th class="amount-col">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${data.description}</td>
        <td style="text-align:center;">${data.quantity}</td>
        <td class="amount-col">${formatBRL(parseCurrency(data.unitPrice))}</td>
        <td class="amount-col">${data.totalPrice}</td>
      </tr>
    </tbody>
  </table>

  <div class="totals">
    <div class="totals-box">
      <div class="total-row">
        <span>Subtotal</span>
        <span>${formatBRL(subtotal)}</span>
      </div>
      <div class="total-row">
        <span>Impostos (10%)</span>
        <span>${formatBRL(tax)}</span>
      </div>
      <div class="total-row grand">
        <span>Total a Pagar</span>
        <span>${formatBRL(total)}</span>
      </div>
    </div>
  </div>

  <div class="payment">
    <div class="payment-title">Forma de Pagamento</div>
    <div>${data.paymentMethod}</div>
  </div>

  <div class="signatures">
    <div class="signature-line">
      <hr />
      <div class="signature-label">Assinatura do Emitente</div>
    </div>
    <div class="signature-line">
      <hr />
      <div class="signature-label">Assinatura do Cliente</div>
    </div>
  </div>

  <div class="footer">
    Fatura emitida por Fatura Express — Alternative Down<br>
    Este documento é de inteira responsabilidade do emissor.
  </div>
</body>
</html>`;
}
