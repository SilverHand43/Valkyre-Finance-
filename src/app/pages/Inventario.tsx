import { useState } from 'react';
import { Plus, Search, Filter, AlertCircle, Package } from 'lucide-react';

export default function Inventario() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    codigo: '',
    categoria: '',
    quantidade: '',
    precoCompra: '',
    precoVenda: '',
    fornecedor: ''
  });

  const produtos = [
    { id: 1, codigo: 'PRD001', nome: 'Produto A', categoria: 'Eletrônicos', quantidade: 45, precoCompra: 120, precoVenda: 199, fornecedor: 'Fornecedor X', status: 'ok' },
    { id: 2, codigo: 'PRD002', nome: 'Produto B', categoria: 'Eletrônicos', quantidade: 32, precoCompra: 85, precoVenda: 149, fornecedor: 'Fornecedor Y', status: 'ok' },
    { id: 3, codigo: 'PRD003', nome: 'Produto C', categoria: 'Acessórios', quantidade: 5, precoCompra: 45, precoVenda: 79, fornecedor: 'Fornecedor X', status: 'baixo' },
    { id: 4, codigo: 'PRD004', nome: 'Produto D', categoria: 'Informática', quantidade: 8, precoCompra: 220, precoVenda: 349, fornecedor: 'Fornecedor Z', status: 'baixo' },
    { id: 5, codigo: 'PRD005', nome: 'Produto E', categoria: 'Eletrônicos', quantidade: 28, precoCompra: 150, precoVenda: 249, fornecedor: 'Fornecedor X', status: 'ok' },
    { id: 6, codigo: 'PRD006', nome: 'Produto F', categoria: 'Acessórios', quantidade: 3, precoCompra: 30, precoVenda: 55, fornecedor: 'Fornecedor Y', status: 'baixo' },
    { id: 7, codigo: 'PRD007', nome: 'Produto G', categoria: 'Informática', quantidade: 52, precoCompra: 95, precoVenda: 159, fornecedor: 'Fornecedor Z', status: 'ok' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo produto:', formData);
    setShowModal(false);
    setFormData({ nome: '', codigo: '', categoria: '', quantidade: '', precoCompra: '', precoVenda: '', fornecedor: '' });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Inventário</h1>
          <p className="text-muted-foreground">Gerencie seu estoque de produtos</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Novo Produto
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
          <Filter className="w-5 h-5" />
          Filtros
        </button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <h3 className="text-2xl mb-1">247</h3>
          <p className="text-sm text-muted-foreground">Total de Produtos</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <h3 className="text-2xl mb-1">173</h3>
          <p className="text-sm text-muted-foreground">Estoque Normal</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-[var(--gold)]" />
            </div>
          </div>
          <h3 className="text-2xl mb-1">16</h3>
          <p className="text-sm text-muted-foreground">Estoque Baixo</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl mb-1">R$ 284.750</h3>
          <p className="text-sm text-muted-foreground">Valor em Estoque</p>
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-6 py-4 text-sm">Código</th>
                <th className="text-left px-6 py-4 text-sm">Nome</th>
                <th className="text-left px-6 py-4 text-sm">Categoria</th>
                <th className="text-center px-6 py-4 text-sm">Quantidade</th>
                <th className="text-right px-6 py-4 text-sm">Preço Compra</th>
                <th className="text-right px-6 py-4 text-sm">Preço Venda</th>
                <th className="text-left px-6 py-4 text-sm">Fornecedor</th>
                <th className="text-center px-6 py-4 text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id} className="border-t border-border hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 text-muted-foreground">{produto.codigo}</td>
                  <td className="px-6 py-4">{produto.nome}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm">
                      {produto.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">{produto.quantidade}</td>
                  <td className="px-6 py-4 text-right">R$ {produto.precoCompra.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right text-green-500">R$ {produto.precoVenda.toFixed(2)}</td>
                  <td className="px-6 py-4 text-muted-foreground">{produto.fornecedor}</td>
                  <td className="px-6 py-4 text-center">
                    {produto.status === 'baixo' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--gold)]/10 text-[var(--gold)] rounded-full text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Baixo
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm">
                        OK
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Novo Produto */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl mb-6">Novo Produto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm">Nome do Produto</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Digite o nome"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Código</label>
                  <input
                    type="text"
                    value={formData.codigo}
                    onChange={(e) => setFormData({...formData, codigo: e.target.value})}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="PRD000"
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
                    <option value="Eletrônicos">Eletrônicos</option>
                    <option value="Informática">Informática</option>
                    <option value="Acessórios">Acessórios</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm">Quantidade</label>
                  <input
                    type="number"
                    value={formData.quantidade}
                    onChange={(e) => setFormData({...formData, quantidade: e.target.value})}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Preço de Compra</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.precoCompra}
                    onChange={(e) => setFormData({...formData, precoCompra: e.target.value})}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0,00"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Preço de Venda</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.precoVenda}
                    onChange={(e) => setFormData({...formData, precoVenda: e.target.value})}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0,00"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm">Fornecedor</label>
                  <input
                    type="text"
                    value={formData.fornecedor}
                    onChange={(e) => setFormData({...formData, fornecedor: e.target.value})}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Nome do fornecedor"
                    required
                  />
                </div>
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
