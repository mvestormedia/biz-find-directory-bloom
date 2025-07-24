import React from 'react';
import { Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TrustedMemberBadgeProps {
  onClick?: () => void;
  className?: string;
}

const TrustedMemberBadge: React.FC<TrustedMemberBadgeProps> = ({ onClick, className = "" }) => {
  return (
    <Badge 
      variant="secondary" 
      className={`bg-blue-100 text-blue-800 border-blue-200 cursor-pointer hover:bg-blue-200 transition-colors ${className}`}
      onClick={onClick}
    >
      <Shield className="h-3 w-3 mr-1" />
      Trusted Member
    </Badge>
  );
};

export default TrustedMemberBadge;