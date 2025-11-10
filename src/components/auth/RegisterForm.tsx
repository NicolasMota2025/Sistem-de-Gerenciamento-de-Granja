import { useState, FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserPlus, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const { signUp } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    nome?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const errors: {
      nome?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!nome.trim()) {
      errors.nome = 'Nome é obrigatório';
    } else if (nome.trim().length < 3) {
      errors.nome = 'Nome deve ter no mínimo 3 caracteres';
    }

    if (!email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!validateEmail(email)) {
      errors.email = 'Email inválido';
    }

    if (!password) {
      errors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      errors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, nome);
      setSuccess(true);

      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (
    field: 'nome' | 'email' | 'password' | 'confirmPassword',
    value: string
  ) => {
    switch (field) {
      case 'nome':
        setNome(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
    }

    if (fieldErrors[field]) {
      setFieldErrors({ ...fieldErrors, [field]: undefined });
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-green-100 p-3 rounded-full">
            <UserPlus className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Criar nova conta
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Preencha os dados para se cadastrar no sistema
        </p>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800">
                Conta criada com sucesso!
              </p>
              <p className="text-sm text-green-700 mt-1">
                Redirecionando para o login...
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nome completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => handleFieldChange('nome', e.target.value)}
                placeholder="João Silva"
                className={`block w-full pl-10 pr-3 py-2.5 border ${
                  fieldErrors.nome
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                disabled={loading || success}
                aria-invalid={!!fieldErrors.nome}
                aria-describedby={fieldErrors.nome ? 'nome-error' : undefined}
              />
            </div>
            {fieldErrors.nome && (
              <p id="nome-error" className="mt-1.5 text-sm text-red-600">
                {fieldErrors.nome}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                placeholder="seu@email.com"
                className={`block w-full pl-10 pr-3 py-2.5 border ${
                  fieldErrors.email
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                disabled={loading || success}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              />
            </div>
            {fieldErrors.email && (
              <p id="email-error" className="mt-1.5 text-sm text-red-600">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => handleFieldChange('password', e.target.value)}
                placeholder="••••••••"
                className={`block w-full pl-10 pr-3 py-2.5 border ${
                  fieldErrors.password
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                disabled={loading || success}
                aria-invalid={!!fieldErrors.password}
                aria-describedby={
                  fieldErrors.password ? 'password-error' : undefined
                }
              />
            </div>
            {fieldErrors.password && (
              <p id="password-error" className="mt-1.5 text-sm text-red-600">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirmar senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  handleFieldChange('confirmPassword', e.target.value)
                }
                placeholder="••••••••"
                className={`block w-full pl-10 pr-3 py-2.5 border ${
                  fieldErrors.confirmPassword
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                disabled={loading || success}
                aria-invalid={!!fieldErrors.confirmPassword}
                aria-describedby={
                  fieldErrors.confirmPassword
                    ? 'confirm-password-error'
                    : undefined
                }
              />
            </div>
            {fieldErrors.confirmPassword && (
              <p
                id="confirm-password-error"
                className="mt-1.5 text-sm text-red-600"
              >
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Cadastrando...</span>
              </>
            ) : success ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Cadastrado!</span>
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                <span>Cadastrar</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <button
              onClick={onSwitchToLogin}
              className="font-medium text-green-600 hover:text-green-700 focus:outline-none focus:underline"
              disabled={loading || success}
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
