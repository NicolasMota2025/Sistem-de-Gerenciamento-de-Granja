import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { profile, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SGG</h1>
              <p className="text-xs text-gray-500">
                Sistema de Gerenciamento de Granja
              </p>
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <User className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {profile?.nome || 'Usuário'}
                  </p>
                  <p className="text-xs text-gray-500">{profile?.email}</p>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {profile?.nome}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {profile?.email}
                  </p>
                </div>

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
