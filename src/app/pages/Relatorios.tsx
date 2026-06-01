import { useState } from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

export default function Relatorios() {
  const [tipoRelatorio, setTipoRelatorio] = useState('financeiro');
  const [periodo, setPeriodo] = useState('mensal');

  const relatoriosSalvos = [
    { id: 1, nome: 'Relatório Financeiro - Maio 2026', tipo: 'Financeiro', data: '01/06/2026', tamanho: '2.4 MB' },
    { id: 2, nome: 'Relatório de Estoque - Maio 2026', tipo: 'Estoque', data: '01/06/2026', tamanho: '1.8 MB' },
    { id: 3, nome: 'Relatório de Funcionários - Q1 2026', tipo: 'Funcionários', data: '31/03/2026', tamanho: '1.2 MB' },
    { id: 4, nome: 'Relatório Geral - Abril 2026', tipo: 'Geral', data: '30/04/2026', tamanho: '3.6 MB' },
    { id: 5, nome: 'Relatório Financeiro - Abril 2026', tipo: 'Financeiro', data: '01/05/2026', tamanho: '2.3 MB' },
  ];

  const handleGerarRelatorio = () => {
    alert(`Gerando ${tipoRelatorio} - Período: ${periodo}`);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Relatórios</h1>
        <p className="text-muted-foreground">Gere relatórios detalhados em PDF</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Geração de Relatório */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl">Gerar Relatório</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block mb-2 text-sm">Tipo de Relatório</label>
                <select
                  value={tipoRelatorio}
                  onChange={(e) => setTipoRelatorio(e.target.value)}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="financeiro">Relatório Financeiro</option>
                  <option value="estoque">Relatório de Estoque</option>
                  <option value="funcionarios">Relatório de Funcionários</option>
                  <option value="geral">Relatório Geral da Empresa</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm">Período</label>
                <select
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="diario">Diário</option>
                  <option value="semanal">Semanal</option>
                  <option value="mensal">Mensal</option>
                  <option value="trimestral">Trimestral</option>
                  <option value="anual">Anual</option>
                  <option value="personalizado">Personalizado</option>
                </select>
              </div>

              {periodo === 'personalizado' && (
                <>
                  <div>
                    <label className="block mb-2 text-sm">Data Inicial</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Data Final</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </>
              )}

              <button
                onClick={handleGerarRelatorio}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
              >
                <FileText className="w-5 h-5" />
                Gerar Relatório PDF
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-sm mb-3">O relatório incluirá:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {tipoRelatorio === 'financeiro' && (
                  <>
                    <li>• Receitas e despesas</li>
                    <li>• Fluxo de caixa</li>
                    <li>• Lucro líquido</li>
                    <li>• Gráficos e análises</li>
                  </>
                )}
                {tipoRelatorio === 'estoque' && (
                  <>
                    <li>• Lista de produtos</li>
                    <li>• Níveis de estoque</li>
                    <li>• Alertas de estoque baixo</li>
                    <li>• Valor total em estoque</li>
                  </>
                )}
                {tipoRelatorio === 'funcionarios' && (
                  <>
                    <li>• Lista de funcionários</li>
                    <li>• Cargos e salários</li>
                    <li>• Folha de pagamento</li>
                    <li>• Histórico de admissões</li>
                  </>
                )}
                {tipoRelatorio === 'geral' && (
                  <>
                    <li>• Visão geral financeira</li>
                    <li>• Status do inventário</li>
                    <li>• Informações da equipe</li>
                    <li>• Métricas de desempenho</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Relatórios Salvos */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Relatórios Salvos</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Últimos 90 dias</span>
              </div>
            </div>

            <div className="space-y-3">
              {relatoriosSalvos.map((relatorio) => (
                <div
                  key={relatorio.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-[var(--gold)]" />
                    </div>
                    <div>
                      <h3 className="mb-1">{relatorio.nome}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded">
                          {relatorio.tipo}
                        </span>
                        <span>•</span>
                        <span>{relatorio.data}</span>
                        <span>•</span>
                        <span>{relatorio.tamanho}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    Baixar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-2">Total de Relatórios</p>
              <h3 className="text-2xl">47</h3>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-2">Gerados Este Mês</p>
              <h3 className="text-2xl text-primary">12</h3>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-2">Mais Gerado</p>
              <h3 className="text-sm text-[var(--gold)]">Relatório Financeiro</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
