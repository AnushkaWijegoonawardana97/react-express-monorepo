import type { CardProps } from './Card.types';

export const Card = ({ children, title, className = '', headerActions }: CardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
    </div>
  );
};
