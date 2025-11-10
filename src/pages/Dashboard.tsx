import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/layout/Navbar';
import { Activity, TrendingUp, Users, Package } from 'lucide-react';

export default function Dashboard() {
  const { profile } = useAuth();

  const stats = [
    {
      name: 'Produção Diária',
      value: '1.240',
      unit: 'ovos',
      icon: Activity,
      color: 'bg-blue-100 text-blue-600',
      trend: '+12%',
    },
    {
      name: 'Taxa de Crescimento',
      value: '98.5%',
      unit: '',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
      trend: '+2.3%',
    },
    {
      name: 'Animais Ativos',
      value: '2.540',
      unit: 'unidades',
      icon: Users,
      color: 'bg-yellow-100 text-yellow-600',
      trend: '+180',
    },
    {
      name: 'Estoque de Ração',
      value: '840',
      unit: 'kg',
      icon: Package,
      color: 'bg-purple-100 text-purple-600',
      trend: '-45kg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Olá, {profile?.nome}!
          </h2>
          <p className="text-gray-600 mt-1">
            Bem-vindo ao painel de controle da sua granja
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  {stat.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  {stat.unit && (
                    <span className="text-sm text-gray-500">{stat.unit}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Atividades Recentes
            </h3>
            <div className="space-y-4">
              {[
                {
                  action: 'Novo lote registrado',
                  time: 'Há 2 horas',
                  details: 'Lote #2024-001 com 500 aves',
                },
                {
                  action: 'Coleta de ovos realizada',
                  time: 'Há 4 horas',
                  details: '1.240 ovos coletados',
                },
                {
                  action: 'Alimentação programada',
                  time: 'Há 6 horas',
                  details: 'Distribuição de 120kg de ração',
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                    <Activity className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Alertas e Notificações
            </h3>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 p-2 rounded-full flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-yellow-900">
                      Estoque baixo
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Ração para menos de 7 dias
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Manutenção programada
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      Limpeza dos galpões amanhã às 08:00
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      Produção acima da meta
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      12% acima do esperado esta semana
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
