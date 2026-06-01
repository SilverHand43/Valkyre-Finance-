import { useState } from 'react';
import { useNavigate } from 'react-router';
import AuthShell from '../components/auth/AuthShell';
import FormField from '../components/auth/FormField';

export default function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    navigate('/onboarding');
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

        <button type="submit" className="vf-primary-button mt-6">
          Criar Conta
        </button>
      </form>
    </AuthShell>
  );
}
