import { useState } from 'react';
import { Plus, Search, Filter, User, Mail, Phone } from 'lucide-react';

export default function Funcionarios() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    telefone: '',
    email: '',
    salario: '',
    dataAdmissao: ''
  });

  const funcionarios = [
    { id: 1, nome: 'João Silva', cargo: 'Gerente de Vendas', telefone: '(11) 98765-4321', email: 'joao@empresa.com', salario: 8500, dataAdmissao: '15/01/2024' },
    { id: 2, nome: 'Maria Santos', cargo: 'Analista Financeiro', telefone: '(11) 98765-4322', email: 'maria@empresa.com', salario: 6200, dataAdmissao: '20/02/2024' },
    { id: 3, nome: 'Carlos Oliveira', cargo: 'Desenvolvedor', telefone: '(11) 98765-4323', email: 'carlos@empresa.com', salario: 7800, dataAdmissao: '10/03/2024' },
    { id: 4, nome: 'Ana Costa', cargo: 'Designer', telefone: '(11) 98765-4324', email: 'ana@empresa.com', salario: 5500, dataAdmissao: '05/04/2024' },
    { id: 5, nome: 'Pedro Mendes', cargo: 'Assistente Administrativo', telefone: '(11) 98765-4325', email: 'pedro@empresa.com', salario: 3800, dataAdmissao: '12/05/2024' },
    { id: 6, nome: 'Juliana Lima', cargo: 'Coordenadora de Marketing', telefone: '(11) 98765-4326', email: 'juliana@empresa.com', salario: 7200, dataAdmissao: '18/06/2024' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo funcionário:', formData);
    setShowModal(false);
    setFormData({ nome: '', cargo: '', telefone: '', email: '', salario: '', dataAdmissao: '' });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Funcionários</h1>
          <p className="text-muted-foreground">Gerencie sua equipe</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Novo Funcionário
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar funcionários..."
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
          <Filter className="w-5 h-5" />
          Filtros
        </button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Total de Funcionários</p>
          <h3 className="text-2xl text-primary">32</h3>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Folha de Pagamento Mensal</p>
          <h3 className="text-2xl text-[var(--gold)]">R$ 187.400,00</h3>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Admissões Este Mês</p>
          <h3 className="text-2xl text-green-500">3</h3>
        </div>
      </div>

      {/* Grid de Funcionários */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {funcionarios.map((func) => (
          <div key={func.id} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="mb-1 truncate">{func.nome}</h3>
                <p className="text-sm text-[var(--gold)] mb-2">{func.cargo}</p>
                <p className="text-xs text-muted-foreground">Desde {func.dataAdmissao}</p>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="truncate">{func.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{func.telefone}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Salário</span>
                <span className="text-green-500">R$ {func.salario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Novo Funcionário */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl mb-6">Novo Funcionário</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm">Nome Completo</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Nome completo"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Cargo</label>
                  <input
                    type="text"
                    value={formData.cargo}
                    onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Função na empresa"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Telefone</label>
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">E-mail</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="email@empresa.com"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Salário</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.salario}
                    onChange={(e) => setFormData({...formData, salario: e.target.value})}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0,00"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Data de Admissão</label>
                  <input
                    type="date"
                    value={formData.dataAdmissao}
                    onChange={(e) => setFormData({...formData, dataAdmissao: e.target.value})}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
