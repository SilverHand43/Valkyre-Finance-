import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Building2 } from 'lucide-react';
import AuthShell from '../components/auth/AuthShell';
import FormField from '../components/auth/FormField';

export default function Onboarding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    nomeFantasia: '',
    cnpj: '',
    telefone: '',
    emailEmpresarial: '',
    endereco: '',
    cidade: '',
    estado: '',
    segmento: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <AuthShell title="Cadastro da Empresa" subtitle="Complete as informações da sua empresa" wide>
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
        <Building2 className="w-6 h-6 text-[var(--gold)]" />
        <h2 className="text-xl">Dados Empresariais</h2>
      </div>

      <form onSubmit={handleSubmit} className="vf-auth-form-dense">
        <div className="vf-form-grid">
          <FormField label="Nome da Empresa">
            <input
              type="text"
              value={formData.nomeEmpresa}
              onChange={(e) => setFormData({ ...formData, nomeEmpresa: e.target.value })}
              className="vf-input"
              placeholder="Razão social"
              required
            />
          </FormField>

          <FormField label="Nome Fantasia">
            <input
              type="text"
              value={formData.nomeFantasia}
              onChange={(e) => setFormData({ ...formData, nomeFantasia: e.target.value })}
              className="vf-input"
              placeholder="Nome comercial"
              required
            />
          </FormField>

          <FormField label="CNPJ">
            <input
              type="text"
              value={formData.cnpj}
              onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
              className="vf-input"
              placeholder="00.000.000/0000-00"
              required
            />
          </FormField>

          <FormField label="Telefone">
            <input
              type="tel"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              className="vf-input"
              placeholder="(00) 00000-0000"
              required
            />
          </FormField>

          <FormField label="E-mail Empresarial" fullWidth>
            <input
              type="email"
              value={formData.emailEmpresarial}
              onChange={(e) => setFormData({ ...formData, emailEmpresarial: e.target.value })}
              className="vf-input"
              placeholder="contato@empresa.com"
              required
            />
          </FormField>

          <FormField label="Endereço" fullWidth>
            <input
              type="text"
              value={formData.endereco}
              onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
              className="vf-input"
              placeholder="Rua, número, complemento"
              required
            />
          </FormField>

          <FormField label="Cidade">
            <input
              type="text"
              value={formData.cidade}
              onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
              className="vf-input"
              placeholder="Sua cidade"
              required
            />
          </FormField>

          <FormField label="Estado">
            <select
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              className="vf-select"
              required
            >
              <option value="">Selecione</option>
              <option value="SP">São Paulo</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="MG">Minas Gerais</option>
              <option value="RS">Rio Grande do Sul</option>
            </select>
          </FormField>

          <FormField label="Segmento de Atuação" fullWidth>
            <select
              value={formData.segmento}
              onChange={(e) => setFormData({ ...formData, segmento: e.target.value })}
              className="vf-select"
              required
            >
              <option value="">Selecione o segmento</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Comércio">Comércio</option>
              <option value="Serviços">Serviços</option>
              <option value="Indústria">Indústria</option>
              <option value="Educação">Educação</option>
              <option value="Saúde">Saúde</option>
            </select>
          </FormField>
        </div>

        <button type="submit" className="vf-primary-button mt-6">
          Concluir Cadastro
        </button>
      </form>
    </AuthShell>
  );
}
