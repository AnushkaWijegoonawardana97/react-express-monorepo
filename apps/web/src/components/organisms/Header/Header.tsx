import type { HeaderProps } from './Header.types';
import { Navigation } from '../Navigation/Navigation';

export const Header = ({ title = 'My App' }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          <Navigation />
        </div>
      </div>
    </header>
  );
};
