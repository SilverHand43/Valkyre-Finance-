const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

type ApiErrorPayload = {
  message?: string | string[];
};

type CompanyCreatePayload = {
  fantasyName: string;
  corporateName: string;
  cnpj: string;
  email: string;
  phone: string;
  cep: string;
  address: string;
  number: string;
  district: string;
  city: string;
  state: string;
  stateRegistration?: string;
};

type AuthRegisterPayload = {
  companyId: string;
  name: string;
  email: string;
  password: string;
  phone: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type AuthResult = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    companyId: string;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? ((await response.json()) as ApiErrorPayload | T) : null;

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? payload.message
        : 'Falha ao processar a requisição.';

    throw new Error(Array.isArray(message) ? message.join(' | ') : message ?? 'Erro inesperado.');
  }

  return payload as T;
}

export async function hasRegisteredUsers(): Promise<boolean> {
  const data = await request<{ hasUsers: boolean }>('/auth/has-users');
  return data.hasUsers;
}

export async function createCompany(payload: CompanyCreatePayload): Promise<{ id: string }> {
  return request<{ id: string }>('/company', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function registerAccount(payload: AuthRegisterPayload): Promise<AuthResult> {
  return request<AuthResult>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function login(payload: LoginPayload): Promise<AuthResult> {
  return request<AuthResult>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function saveSession(auth: AuthResult) {
  localStorage.setItem('vf.accessToken', auth.accessToken);
  localStorage.setItem('vf.refreshToken', auth.refreshToken);
  localStorage.setItem('vf.user', JSON.stringify(auth.user));
}
