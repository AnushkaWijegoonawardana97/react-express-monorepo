import type { LabelProps } from './Label.types';

export const Label = ({
  children,
  required = false,
  className = '',
  ...props
}: LabelProps) => {
  const baseStyles = 'block text-sm font-medium text-gray-700 mb-1';
  const combinedClassName = `${baseStyles} ${className}`.trim();

  return (
    <label className={combinedClassName} {...props}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};
