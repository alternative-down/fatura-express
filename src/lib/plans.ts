export interface Plan {
  id: 'individual' | 'ilimitado';
  name: string;
  price: number;
  invoicesPerMonth: number;
  features: string[];
  recommended?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'individual',
    name: 'Individual',
    price: 19,
    invoicesPerMonth: 30,
    features: [
      'Até 30 faturas por mês',
      'Campos fiscais completos',
      'Download em PDF',
      'Cálculo automático de impostos',
      'Histórico completo',
      'Novos campos a cada atualização',
    ],
  },
  {
    id: 'ilimitado',
    name: 'Ilimitado',
    price: 49,
    invoicesPerMonth: Infinity,
    features: [
      'Faturas ilimitadas',
      'Campos fiscais completos',
      'Download em PDF',
      'Cálculo automático de impostos',
      'Histórico completo',
      'Modelos personalizados',
      'Prioridade no suporte',
      'Novos campos a cada atualização',
    ],
    recommended: true,
  },
];
