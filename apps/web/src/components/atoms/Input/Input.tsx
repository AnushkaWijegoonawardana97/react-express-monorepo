import type { InputProps } from './Input.types';

export const Input = ({
  error,
  fullWidth = false,
  className = '',
  ...props
}: InputProps) => {
  const baseStyles = 'px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  const normalStyles = 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
  const errorStyles = 'border-red-500 focus:ring-red-500 focus:border-red-500';
  const widthStyles = fullWidth ? 'w-full' : '';

  const combinedClassName = `${baseStyles} ${error ? errorStyles : normalStyles} ${widthStyles} ${className}`.trim();

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      <input className={combinedClassName} {...props} />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
