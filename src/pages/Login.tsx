import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

export default function Login() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-center gap-12">
        <div className="hidden lg:flex flex-col items-start max-w-md">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SGG - Sistema de Gerenciamento de Granja
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Gerencie sua granja de forma eficiente e profissional.
            Controle de produção, estoque e muito mais.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Controle Total
                </h3>
                <p className="text-sm text-gray-600">
                  Acompanhe todos os aspectos da sua produção em tempo real
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Relatórios Detalhados
                </h3>
                <p className="text-sm text-gray-600">
                  Análises e relatórios para tomada de decisões
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Segurança Garantida
                </h3>
                <p className="text-sm text-gray-600">
                  Seus dados protegidos com a melhor tecnologia
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md">
          {showRegister ? (
            <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
          ) : (
            <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
