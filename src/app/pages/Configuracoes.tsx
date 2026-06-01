import { useState } from 'react';
import { Building2, User, Lock, Settings as SettingsIcon, Moon, Sun } from 'lucide-react';

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState('empresa');
  const [temaEscuro, setTemaEscuro] = useState(true);

  const [dadosEmpresa, setDadosEmpresa] = useState({
    nomeEmpresa: 'Empresa Tech Ltda',
    nomeFantasia: 'Tech Solutions',
    cnpj: '12.345.678/0001-90',
    telefone: '(11) 3456-7890',
    email: 'contato@empresa.com',
    endereco: 'Rua Exemplo, 123',
    cidade: 'São Paulo',
    estado: 'SP'
  });

  const [dadosUsuario, setDadosUsuario] = useState({
    nome: 'Admin User',
    email: 'admin@empresa.com',
    telefone: '(11) 98765-4321',
    cargo: 'Administrador'
  });

  const [senhas, setSenhas] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar de Configurações */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <button
              onClick={() => setActiveTab('empresa')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'empresa' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span>Dados da Empresa</span>
            </button>
            <button
              onClick={() => setActiveTab('usuario')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'usuario' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Dados do Usuário</span>
            </button>
            <button
              onClick={() => setActiveTab('senha')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'senha' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              }`}
            >
              <Lock className="w-5 h-5" />
              <span>Alterar Senha</span>
            </button>
            <button
              onClick={() => setActiveTab('preferencias')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'preferencias' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              }`}
            >
              <SettingsIcon className="w-5 h-5" />
              <span>Preferências</span>
            </button>
          </div>
        </div>

        {/* Conteúdo das Configurações */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-lg p-6">
            {/* Dados da Empresa */}
            {activeTab === 'empresa' && (
              <div>
                <h2 className="text-xl mb-6">Dados da Empresa</h2>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-sm">Nome da Empresa</label>
                      <input
                        type="text"
                        value={dadosEmpresa.nomeEmpresa}
                        onChange={(e) => setDadosEmpresa({...dadosEmpresa, nomeEmpresa: e.target.value})}
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">Nome Fantasia</label>
                      <input
                        type="text"
                        value={dadosEmpresa.nomeFantasia}
                        onChange={(e) => setDadosEmpresa({...dadosEmpresa, nomeFantasia: e.target.value})}
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">CNPJ</label>
                      <input
                        type="text"
                        value={dadosEmpresa.cnpj}
                        onChange={(e) => setDadosEmpresa({...dadosEmpresa, cnpj: e.target.value})}
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">Telefone</label>
                      <input
                        type="tel"
                        value={dadosEmpresa.telefone}
                        onChange={(e) => setDadosEmpresa({...dadosEmpresa, telefone: e.target.value})}
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-2 text-sm">E-mail</label>
                      <input
                        type="email"
                        value={dadosEmpresa.email}
                        onChange={(e) => setDadosEmpresa({...dadosEmpresa, email: e.target.value})}
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-2 text-sm">Endereço</label>
                      <input
                        type="text"
                        value={dadosEmpresa.endereco}
                        onChange={(e) => setDadosEmpresa({...dadosEmpresa, endereco: e.target.value})}
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">Cidade</label>
                      <input
                        type="text"
                        value={dadosEmpresa.cidade}
                        onChange={(e) => setDadosEmpresa({...dadosEmpresa, cidade: e.target.value})}
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">Estado</label>
                      <input
                        type="text"
                        value={dadosEmpresa.estado}
                        onChange={(e) => setDadosEmpresa({...dadosEmpresa, estado: e.target.value})}
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                  >
                    Salvar Alterações
                  </button>
                </form>
              </div>
            )}

            {/* Dados do Usuário */}
            {activeTab === 'usuario' && (
              <div>
                <h2 className="text-xl mb-6">Dados do Usuário</h2>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-sm">Nome Completo</label>
                      <input
                        type="text"
                        value={dadosUsuario.nome}
                        onChange={(e) => setDadosUsuario({...dadosUsuario, nome: e.target.value})}
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">Cargo</label>
                      <input
                        type="text"
                        value={dadosUsuario.cargo}
                        onChange={(e) => setDadosUsuario({...dadosUsuario, cargo: e.target.value})}
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">E-mail</label>
                      <input
                        type="email"
                        value={dadosUsuario.email}
                        onChange={(e) => setDadosUsuario({...dadosUsuario, email: e.target.value})}
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm">Telefone</label>
                      <input
                        type="tel"
                        value={dadosUsuario.telefone}
                        onChange={(e) => setDadosUsuario({...dadosUsuario, telefone: e.target.value})}
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                  >
                    Salvar Alterações
                  </button>
                </form>
              </div>
            )}

            {/* Alterar Senha */}
            {activeTab === 'senha' && (
              <div>
                <h2 className="text-xl mb-6">Alterar Senha</h2>
                <form className="space-y-5 max-w-md">
                  <div>
                    <label className="block mb-2 text-sm">Senha Atual</label>
                    <input
                      type="password"
                      value={senhas.senhaAtual}
                      onChange={(e) => setSenhas({...senhas, senhaAtual: e.target.value})}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Nova Senha</label>
                    <input
                      type="password"
                      value={senhas.novaSenha}
                      onChange={(e) => setSenhas({...senhas, novaSenha: e.target.value})}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Confirmar Nova Senha</label>
                    <input
                      type="password"
                      value={senhas.confirmarSenha}
                      onChange={(e) => setSenhas({...senhas, confirmarSenha: e.target.value})}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="••••••••"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                  >
                    Alterar Senha
                  </button>
                </form>
              </div>
            )}

            {/* Preferências */}
            {activeTab === 'preferencias' && (
              <div>
                <h2 className="text-xl mb-6">Preferências do Sistema</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      {temaEscuro ? (
                        <Moon className="w-6 h-6 text-primary" />
                      ) : (
                        <Sun className="w-6 h-6 text-[var(--gold)]" />
                      )}
                      <div>
                        <h3 className="mb-1">Tema Escuro</h3>
                        <p className="text-sm text-muted-foreground">
                          Ative o modo escuro para reduzir o cansaço visual
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setTemaEscuro(!temaEscuro)}
                      className={`relative w-14 h-7 rounded-full transition-colors ${
                        temaEscuro ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          temaEscuro ? 'translate-x-7' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="mb-4">Moeda</h3>
                    <select className="w-full md:w-64 px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="BRL">Real Brasileiro (R$)</option>
                      <option value="USD">Dólar Americano ($)</option>
                      <option value="EUR">Euro (€)</option>
                    </select>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="mb-4">Idioma</h3>
                    <select className="w-full md:w-64 px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es-ES">Español</option>
                    </select>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="mb-4">Fuso Horário</h3>
                    <select className="w-full md:w-64 px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                      <option value="America/New_York">Nova York (GMT-5)</option>
                      <option value="Europe/London">Londres (GMT+0)</option>
                    </select>
                  </div>

                  <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors">
                    Salvar Preferências
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
