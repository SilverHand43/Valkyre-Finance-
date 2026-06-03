import { useState } from 'react';
import { useNavigate } from 'react-router';
import AuthShell from '../components/auth/AuthShell';
import FormField from '../components/auth/FormField';
import { createCompany, registerAccount, saveSession } from '../services/auth-api';

export default function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    nomeEmpresa: '',
    cnpj: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      setFeedback('As senhas não coincidem.');
      return;
    }

    try {
      setLoading(true);
      setFeedback('');

      const company = await createCompany({
        fantasyName: formData.nomeEmpresa,
        corporateName: formData.nomeEmpresa,
        cnpj: formData.cnpj,
        email: formData.email,
        phone: formData.telefone,
        cep: '00000-000',
        address: 'Não informado',
        number: 'S/N',
        district: 'Não informado',
        city: 'Não informado',
        state: 'NI',
      });

      const auth = await registerAccount({
        companyId: company.id,
        name: formData.nome,
        email: formData.email,
        password: formData.senha,
        phone: formData.telefone,
      });

      saveSession(auth);
      navigate('/dashboard');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Falha ao criar conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Criar Conta"
      subtitle="Comece sua jornada com Valkyrie Finance"
      backLabel="Voltar"
      onBack={() => navigate('/')}
    >
      <form onSubmit={handleSubmit} className="vf-auth-form-dense">
        <FormField label="Nome de Usuário">
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            className="vf-input"
            placeholder="Seu nome completo"
            required
          />
        </FormField>

        <FormField label="Nome da Empresa">
          <input
            type="text"
            value={formData.nomeEmpresa}
            onChange={(e) => setFormData({ ...formData, nomeEmpresa: e.target.value })}
            className="vf-input"
            placeholder="Sua empresa"
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

        <FormField label="E-mail">
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="vf-input"
            placeholder="seu@email.com"
            required
          />
        </FormField>

        <FormField label="Senha">
          <input
            type="password"
            value={formData.senha}
            onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
            className="vf-input"
            placeholder="Mínimo 8 caracteres"
            required
            minLength={8}
          />
        </FormField>

        <FormField label="Confirmar Senha">
          <input
            type="password"
            value={formData.confirmarSenha}
            onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
            className="vf-input"
            placeholder="Digite a senha novamente"
            required
          />
        </FormField>

        {feedback ? (
          <p role="alert" className="text-sm text-[var(--warning)]">
            {feedback}
          </p>
        ) : null}

        <button type="submit" className="vf-primary-button mt-6" disabled={loading}>
          {loading ? 'Criando conta...' : 'Criar Conta'}
        </button>
      </form>
    </AuthShell>
  );
}
