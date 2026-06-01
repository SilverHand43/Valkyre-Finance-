import type { ReactNode } from 'react';

type FormFieldProps = {
  label: string;
  children: ReactNode;
  fullWidth?: boolean;
};

export default function FormField({ label, children, fullWidth = false }: FormFieldProps) {
  return (
    <div className={fullWidth ? 'vf-form-field vf-form-field-full' : 'vf-form-field'}>
      <label className="vf-form-label">{label}</label>
      {children}
    </div>
  );
}
