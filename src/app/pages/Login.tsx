import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AuthShell from '../components/auth/AuthShell';
import FormField from '../components/auth/FormField';
import { hasRegisteredUsers, login, saveSession } from '../services/auth-api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasUsers, setHasUsers] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const checkHasUsers = async () => {
      try {
        const usersRegistered = await hasRegisteredUsers();
        setHasUsers(usersRegistered);
        if (!usersRegistered) {
          setFeedback('Nenhuma conta cadastrada no sistema. Clique em Criar Conta para começar.');
        }
      } catch {
        setHasUsers(null);
        setFeedback('Não foi possível validar contas cadastradas. Verifique se a API está online.');
      }
    };

    void checkHasUsers();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasUsers) {
      setFeedback('Nenhuma conta encontrada. Crie uma conta antes de entrar.');
      return;
    }

    try {
      setLoading(true);
      setFeedback('');
      const auth = await login({ email, password: senha });
      saveSession(auth);
      navigate('/dashboard');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Falha ao realizar login.');
    } finally {
      setLoading(false);
    }
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

        {feedback ? (
          <p role="alert" className="text-sm text-[var(--warning)]">
            {feedback}
          </p>
        ) : null}

        <button type="submit" className="vf-primary-button" disabled={loading || !hasUsers}>
          {loading ? 'Entrando...' : 'Entrar'}
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
