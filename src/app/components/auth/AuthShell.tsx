import type { ReactNode } from 'react';
import { Shield, ArrowLeft } from 'lucide-react';

type AuthShellProps = {
  title: string;
  subtitle: string;
  footer?: ReactNode;
  children: ReactNode;
  backLabel?: string;
  onBack?: () => void;
  showBrandTagline?: boolean;
  wide?: boolean;
};

export default function AuthShell({
  title,
  subtitle,
  footer,
  children,
  backLabel,
  onBack,
  showBrandTagline = false,
  wide = false,
}: AuthShellProps) {
  return (
    <section className="vf-auth-screen">
      <div className={wide ? 'vf-auth-shell vf-auth-shell-wide' : 'vf-auth-shell'}>
        {onBack && backLabel ? (
          <button type="button" onClick={onBack} className="vf-auth-back-button">
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </button>
        ) : null}

        <header className="vf-auth-header">
          <div className="vf-auth-logo-wrap">
            <Shield className="vf-auth-logo" />
          </div>
          <h1 className="vf-auth-title">{title}</h1>
          <p className="vf-auth-subtitle">{subtitle}</p>
          {showBrandTagline ? <p className="vf-auth-brand-tagline">by Valkyrie Systems</p> : null}
        </header>

        <div className="vf-auth-panel">{children}</div>

        {footer ? <footer className="vf-auth-footer">{footer}</footer> : null}
      </div>
    </section>
  );
}
