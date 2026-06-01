import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';

export default function Despesas() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    valor: '',
    categoria: '',
    data: '',
    observacao: ''
  });

  const despesas = [
    { id: 1, valor: 4500, categoria: 'Aluguel', data: '31/05/2026', observacao: 'Aluguel escritório' },
    { id: 2, valor: 2800, categoria: 'Fornecedores', data: '30/05/2026', observacao: 'Fornecedor XYZ' },
    { id: 3, valor: 3200, categoria: 'Salários', data: '28/05/2026', observacao: 'Folha de pagamento' },
    { id: 4, valor: 1800, categoria: 'Utilidades', data: '26/05/2026', observacao: 'Luz, água e internet' },
    { id: 5, valor: 950, categoria: 'Marketing', data: '24/05/2026', observacao: 'Anúncios online' },
    { id: 6, valor: 1200, categoria: 'Manutenção', data: '22/05/2026', observacao: 'Reparos equipamentos' },
    { id: 7, valor: 680, categoria: 'Diversos', data: '20/05/2026', observacao: 'Material de escritório' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova despesa:', formData);
    setShowModal(false);
    setFormData({ valor: '', categoria: '', data: '', observacao: '' });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Despesas</h1>
          <p className="text-muted-foreground">Gerencie suas despesas</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nova Despesa
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar despesas..."
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
          <Filter className="w-5 h-5" />
          Filtros
        </button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Total do Mês</p>
          <h3 className="text-2xl text-red-500">R$ 40.000,00</h3>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Média Diária</p>
          <h3 className="text-2xl">R$ 1.333,33</h3>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Maior Despesa</p>
          <h3 className="text-2xl text-[var(--gold)]">R$ 4.500,00</h3>
        </div>
      </div>

      {/* Lista de Despesas */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-6 py-4 text-sm">Data</th>
                <th className="text-left px-6 py-4 text-sm">Categoria</th>
                <th className="text-left px-6 py-4 text-sm">Observação</th>
                <th className="text-right px-6 py-4 text-sm">Valor</th>
              </tr>
            </thead>
            <tbody>
              {despesas.map((despesa) => (
                <tr key={despesa.id} className="border-t border-border hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4">{despesa.data}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-sm">
                      {despesa.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{despesa.observacao}</td>
                  <td className="px-6 py-4 text-right text-red-500">
                    - R$ {despesa.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nova Despesa */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl mb-6">Nova Despesa</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm">Valor</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => setFormData({...formData, valor: e.target.value})}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0,00"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm">Categoria</label>
                <select
                  value={formData.categoria}
                  onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Aluguel">Aluguel</option>
                  <option value="Salários">Salários</option>
                  <option value="Fornecedores">Fornecedores</option>
                  <option value="Utilidades">Utilidades</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Manutenção">Manutenção</option>
                  <option value="Diversos">Diversos</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm">Data</label>
                <input
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({...formData, data: e.target.value})}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm">Observação</label>
                <textarea
                  value={formData.observacao}
                  onChange={(e) => setFormData({...formData, observacao: e.target.value})}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                  placeholder="Detalhes da despesa..."
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
