export interface Plan {
  id: 'free' | 'individual' | 'ilimitado';
  name: string;
  price: number;
  invoicesPerMonth: number;
  features: string[];
  recommended?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Grátis',
    price: 0,
    invoicesPerMonth: 3,
    features: [
      '3 faturas por mês',
      'Todos os campos fiscais',
      'Download em PDF',
      'Sem cadastro obrigatório',
    ],
  },
  {
    id: 'individual',
    name: 'Individual',
    price: 19,
    invoicesPerMonth: 30,
    features: [
      'Até 30 faturas por mês',
      'Todos os campos fiscais',
      'Download em PDF',
      'Histórico completo',
      'Cálculo automático de impostos',
    ],
  },
  {
    id: 'ilimitado',
    name: 'Ilimitado',
    price: 49,
    invoicesPerMonth: Infinity,
    features: [
      'Faturas ilimitadas',
      'Todos os campos fiscais',
      'Download em PDF',
      'Histórico completo',
      'Cálculo automático de impostos',
      'Modelos personalizados',
      'Prioridade no suporte',
    ],
    recommended: true,
  },
];