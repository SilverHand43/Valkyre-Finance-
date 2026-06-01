import { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function FluxoCaixa() {
  const [periodo, setPeriodo] = useState('mensal');

  const fluxoData = [
    { data: '01/06', entradas: 8500, saidas: 5200, saldo: 3300 },
    { data: '02/06', entradas: 6200, saidas: 4800, saldo: 1400 },
    { data: '03/06', entradas: 9100, saidas: 6100, saldo: 3000 },
    { data: '04/06', entradas: 7400, saidas: 5500, saldo: 1900 },
    { data: '05/06', entradas: 10200, saidas: 7300, saldo: 2900 },
    { data: '06/06', entradas: 8800, saidas: 6400, saldo: 2400 },
    { data: '07/06', entradas: 11500, saidas: 8200, saldo: 3300 },
  ];

  const movimentacoes = [
    { tipo: 'Receita', descricao: 'Venda - Produto A', valor: 5400, data: '07/06/2026 14:30', categoria: 'Vendas' },
    { tipo: 'Despesa', descricao: 'Fornecedor ABC', valor: 2800, data: '07/06/2026 10:15', categoria: 'Fornecedores' },
    { tipo: 'Receita', descricao: 'Serviço de Consultoria', valor: 3200, data: '06/06/2026 16:45', categoria: 'Serviços' },
    { tipo: 'Despesa', descricao: 'Aluguel Mensal', valor: 4500, data: '06/06/2026 09:00', categoria: 'Aluguel' },
    { tipo: 'Receita', descricao: 'Venda - Produto B', valor: 4500, data: '05/06/2026 11:20', categoria: 'Vendas' },
    { tipo: 'Despesa', descricao: 'Energia Elétrica', valor: 980, data: '05/06/2026 08:30', categoria: 'Utilidades' },
    { tipo: 'Receita', descricao: 'Venda - Produto C', valor: 7100, data: '04/06/2026 15:10', categoria: 'Vendas' },
    { tipo: 'Despesa', descricao: 'Material de Escritório', valor: 650, data: '04/06/2026 13:00', categoria: 'Diversos' },
    { tipo: 'Receita', descricao: 'Projeto Especial', valor: 6800, data: '03/06/2026 10:45', categoria: 'Serviços' },
    { tipo: 'Despesa', descricao: 'Manutenção Equipamentos', valor: 1200, data: '03/06/2026 09:15', categoria: 'Manutenção' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Fluxo de Caixa</h1>
          <p className="text-muted-foreground">Acompanhe suas movimentações financeiras</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPeriodo('diario')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              periodo === 'diario' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border'
            }`}
          >
            Diário
          </button>
          <button
            onClick={() => setPeriodo('semanal')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              periodo === 'semanal' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border'
            }`}
          >
            Semanal
          </button>
          <button
            onClick={() => setPeriodo('mensal')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              periodo === 'mensal' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border'
            }`}
          >
            Mensal
          </button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <h3 className="text-2xl text-green-500 mb-1">R$ 61.700,00</h3>
          <p className="text-sm text-muted-foreground">Total de Entradas</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <h3 className="text-2xl text-red-500 mb-1">R$ 43.500,00</h3>
          <p className="text-sm text-muted-foreground">Total de Saídas</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[var(--gold)]" />
            </div>
          </div>
          <h3 className="text-2xl text-[var(--gold)] mb-1">R$ 18.200,00</h3>
          <p className="text-sm text-muted-foreground">Saldo do Período</p>
        </div>
      </div>

      {/* Gráfico de Fluxo */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl">Fluxo Financeiro</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Últimos 7 dias</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={fluxoData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27273a" />
            <XAxis dataKey="data" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: '#13131a', border: '1px solid #27273a' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="entradas"
              stroke="#10b981"
              strokeWidth={2}
              name="Entradas"
            />
            <Line
              type="monotone"
              dataKey="saidas"
              stroke="#ef4444"
              strokeWidth={2}
              name="Saídas"
            />
            <Line
              type="monotone"
              dataKey="saldo"
              stroke="#f59e0b"
              strokeWidth={3}
              name="Saldo"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Histórico de Movimentações */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl mb-6">Histórico Completo</h2>
        <div className="space-y-3">
          {movimentacoes.map((mov, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  mov.tipo === 'Receita' ? 'bg-green-500/10' : 'bg-red-500/10'
                }`}>
                  {mov.tipo === 'Receita' ? (
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="mb-1">{mov.descricao}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{mov.data}</span>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded ${
                      mov.tipo === 'Receita' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {mov.categoria}
                    </span>
                  </div>
                </div>
              </div>
              <div className={`text-lg ${mov.tipo === 'Receita' ? 'text-green-500' : 'text-red-500'}`}>
                {mov.tipo === 'Receita' ? '+' : '-'} R$ {mov.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
