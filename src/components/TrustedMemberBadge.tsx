import React from 'react';
import { Shield } from 'lucide-react';

interface TrustedMemberBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const TrustedMemberBadge: React.FC<TrustedMemberBadgeProps> = ({ 
  className = "", 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-20 h-20 text-base'
  };

  return (
    <a 
      href="/trusted-membership" 
      target="_blank" 
      rel="noopener noreferrer"
      className={`inline-flex flex-col items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium ${sizeClasses[size]} ${className}`}
    >
      <Shield className="h-4 w-4 mb-1" />
      <span className="leading-tight text-center">Trusted Member</span>
    </a>
  );
};

export default TrustedMemberBadge;