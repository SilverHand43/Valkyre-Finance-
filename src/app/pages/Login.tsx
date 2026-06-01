import { useState } from 'react';
import { useNavigate } from 'react-router';
import AuthShell from '../components/auth/AuthShell';
import FormField from '../components/auth/FormField';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <AuthShell
      title="Valkyrie Finance"
      subtitle="Gestão Financeira Empresarial"
      showBrandTagline
      footer="© 2026 Valkyrie Systems. Todos os direitos reservados."
    >
      <form onSubmit={handleLogin} className="vf-auth-form">
        <FormField label="E-mail">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="vf-input"
            placeholder="seu@email.com"
            required
          />
        </FormField>

        <FormField label="Senha">
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="vf-input"
            placeholder="••••••••"
            required
          />
        </FormField>

        <button type="submit" className="vf-primary-button">
          Entrar
        </button>

        <div className="vf-auth-actions">
          <button type="button" onClick={() => navigate('/cadastro')} className="vf-link-primary">
            Criar Conta
          </button>
          <button type="button" className="vf-link-muted">
            Esqueci Minha Senha
          </button>
        </div>
      </form>
    </AuthShell>
  );
}
