import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Target,
  AlertCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart
} from 'recharts';
import MetricCard from '../components/dashboard/MetricCard';

export default function Dashboard() {
  const receitasDespesas = [
    { mes: 'Jan', receitas: 45000, despesas: 32000 },
    { mes: 'Fev', receitas: 52000, despesas: 35000 },
    { mes: 'Mar', receitas: 48000, despesas: 33000 },
    { mes: 'Abr', receitas: 61000, despesas: 38000 },
    { mes: 'Mai', receitas: 55000, despesas: 36000 },
    { mes: 'Jun', receitas: 67000, despesas: 40000 },
  ];

  const fluxoMensal = [
    { mes: 'Jan', valor: 13000 },
    { mes: 'Fev', valor: 17000 },
    { mes: 'Mar', valor: 15000 },
    { mes: 'Abr', valor: 23000 },
    { mes: 'Mai', valor: 19000 },
    { mes: 'Jun', valor: 27000 },
  ];

  const crescimento = [
    { trimestre: 'Q1 2025', crescimento: 12 },
    { trimestre: 'Q2 2025', crescimento: 18 },
    { trimestre: 'Q3 2025', crescimento: 25 },
    { trimestre: 'Q4 2025', crescimento: 32 },
    { trimestre: 'Q1 2026', crescimento: 38 },
    { trimestre: 'Q2 2026', crescimento: 45 },
  ];

  const movimentacoes = [
    { tipo: 'Receita', descricao: 'Venda - Produto A', valor: 'R$ 5.400,00', data: '01/06/2026' },
    { tipo: 'Receita', descricao: 'Venda - Serviço B', valor: 'R$ 3.200,00', data: '01/06/2026' },
    { tipo: 'Despesa', descricao: 'Aluguel', valor: 'R$ 4.500,00', data: '31/05/2026' },
    { tipo: 'Despesa', descricao: 'Fornecedor XYZ', valor: 'R$ 2.800,00', data: '30/05/2026' },
    { tipo: 'Receita', descricao: 'Venda - Produto C', valor: 'R$ 7.100,00', data: '29/05/2026' },
  ];

  const estoquesBaixos = [
    { produto: 'Produto A', estoque: 5, minimo: 20 },
    { produto: 'Produto D', estoque: 8, minimo: 15 },
    { produto: 'Produto F', estoque: 3, minimo: 10 },
  ];

  return (
    <div className="vf-page-shell">
      {/* Header */}
      <div className="vf-page-header">
        <h1 className="vf-page-title">Dashboard</h1>
        <p className="vf-page-subtitle">Visão geral do seu negócio</p>
      </div>

      {/* Cards de Métricas */}
      <div className="vf-metric-grid">
        <MetricCard
          icon={<DollarSign className="w-6 h-6" />}
          value="R$ 127.450,00"
          label="Saldo Atual"
          trendLabel="+12%"
          trendTone="positive"
        />

        <MetricCard
          icon={<TrendingUp className="w-6 h-6" />}
          value="R$ 67.000,00"
          label="Receitas do Mês"
          trendLabel="+8%"
          trendTone="positive"
          iconToneClassName="vf-metric-icon-tone-success"
        />

        <MetricCard
          icon={<TrendingDown className="w-6 h-6" />}
          value="R$ 40.000,00"
          label="Despesas do Mês"
          trendLabel="+5%"
          trendTone="negative"
          iconToneClassName="vf-metric-icon-tone-danger"
        />

        <MetricCard
          icon={<Target className="w-6 h-6" />}
          value="R$ 27.000,00"
          label="Lucro do Mês"
          trendLabel="+15%"
          trendTone="positive"
          iconToneClassName="vf-metric-icon-tone-warning"
        />

        <MetricCard
          icon={<Package className="w-6 h-6" />}
          value="247"
          label="Total de Produtos"
          iconToneClassName="vf-metric-icon-tone-info"
        />

        <MetricCard
          icon={<Users className="w-6 h-6" />}
          value="32"
          label="Total de Funcionários"
          iconToneClassName="vf-metric-icon-tone-violet"
        />
      </div>

      {/* Gráficos */}
      <div className="vf-chart-grid">
        <div className="vf-surface-card">
          <h3 className="text-lg mb-4">Receitas x Despesas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={receitasDespesas}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27273a" />
              <XAxis dataKey="mes" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: '#13131a', border: '1px solid #27273a' }}
              />
              <Legend />
              <Bar dataKey="receitas" fill="#10b981" name="Receitas" />
              <Bar dataKey="despesas" fill="#ef4444" name="Despesas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="vf-surface-card">
          <h3 className="text-lg mb-4">Fluxo Financeiro Mensal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={fluxoMensal}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27273a" />
              <XAxis dataKey="mes" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: '#13131a', border: '1px solid #27273a' }}
              />
              <Area
                type="monotone"
                dataKey="valor"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                name="Lucro Líquido"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="vf-dashboard-growth">
        <div className="vf-surface-card">
          <h3 className="text-lg mb-4">Crescimento da Empresa (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={crescimento}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27273a" />
              <XAxis dataKey="trimestre" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: '#13131a', border: '1px solid #27273a' }}
              />
              <Line
                type="monotone"
                dataKey="crescimento"
                stroke="#f59e0b"
                strokeWidth={3}
                name="Crescimento"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Widgets */}
      <div className="vf-widget-grid">
        <div className="vf-surface-card">
          <h3 className="text-lg mb-4">Últimas Movimentações</h3>
          <div className="vf-list-stack">
            {movimentacoes.map((mov, index) => (
              <div key={index} className="flex items-center justify-between pb-3 border-b border-border last:border-0">
                <div>
                  <p className="text-sm">{mov.descricao}</p>
                  <p className="text-xs text-muted-foreground">{mov.data}</p>
                </div>
                <span className={`text-sm ${mov.tipo === 'Receita' ? 'text-green-500' : 'text-red-500'}`}>
                  {mov.tipo === 'Receita' ? '+' : '-'} {mov.valor}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="vf-surface-card">
          <h3 className="text-lg mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[var(--gold)]" />
            Produtos com Estoque Baixo
          </h3>
          <div className="vf-list-stack">
            {estoquesBaixos.map((item, index) => (
              <div key={index} className="pb-3 border-b border-border last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm">{item.produto}</p>
                  <span className="text-xs text-red-500">{item.estoque} unidades</span>
                </div>
                <div className="vf-progress-track h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(item.estoque / item.minimo) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Mínimo: {item.minimo}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="vf-surface-card">
          <h3 className="text-lg mb-4">Metas Financeiras</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm">Meta de Receita Mensal</p>
                <span className="text-sm text-green-500">89%</span>
              </div>
              <div className="vf-progress-track h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: '89%' }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">R$ 67.000 / R$ 75.000</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm">Meta de Lucro Trimestral</p>
                <span className="text-sm text-[var(--gold)]">72%</span>
              </div>
              <div className="vf-progress-track h-3">
                <div className="bg-[var(--gold)] h-3 rounded-full" style={{ width: '72%' }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">R$ 72.000 / R$ 100.000</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm">Redução de Custos</p>
                <span className="text-sm text-blue-500">45%</span>
              </div>
              <div className="vf-progress-track h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '45%' }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Meta: -15% em despesas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
