import { Outlet, useNavigate, useLocation } from 'react-router';
import {
  Shield,
  LayoutDashboard,
  DollarSign,
  Package,
  Users,
  FileText,
  Settings,
  LogOut,
  TrendingUp,
  TrendingDown,
  Wallet
} from 'lucide-react';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    {
      icon: DollarSign,
      label: 'Financeiro',
      path: '/dashboard/receitas',
      submenu: [
        { label: 'Receitas', path: '/dashboard/receitas', icon: TrendingUp },
        { label: 'Despesas', path: '/dashboard/despesas', icon: TrendingDown },
        { label: 'Fluxo de Caixa', path: '/dashboard/fluxo-caixa', icon: Wallet },
      ]
    },
    { icon: Package, label: 'Inventário', path: '/dashboard/inventario' },
    { icon: Users, label: 'Funcionários', path: '/dashboard/funcionarios' },
    { icon: FileText, label: 'Relatórios', path: '/dashboard/relatorios' },
    { icon: Settings, label: 'Configurações', path: '/dashboard/configuracoes' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-[var(--electric-blue)]" />
            <div>
              <h1 className="font-semibold">Valkyrie Finance</h1>
              <p className="text-xs text-[var(--gold)]">Valkyrie Systems</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
              {item.submenu && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.submenu.map((subitem) => (
                    <button
                      key={subitem.path}
                      onClick={() => navigate(subitem.path)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                        isActive(subitem.path)
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-[var(--electric-blue)]'
                          : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground'
                      }`}
                    >
                      <subitem.icon className="w-4 h-4" />
                      <span>{subitem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm">AD</span>
            </div>
            <div className="flex-1">
              <p className="text-sm">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@empresa.com</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
