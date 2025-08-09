import React from 'react';
import { Search, FileText } from 'lucide-react';

import Button from '../components/ui/Button';
interface EmptyStateProps {
  type: 'no-notes' | 'no-search-results';
  searchTerm?: string;
  onCreateNote?: () => void;
}

const EmptyStates: React.FC<EmptyStateProps> = ({
  type,
  searchTerm,
  onCreateNote
}) => {
  if (type === 'no-search-results') {
    return (
      <div className="text-center py-12">
        <Search size={48} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No notes found
        </h3>
        <p className="text-gray-500">
          No notes match "{searchTerm}". Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <FileText size={48} className="mx-auto mb-4 text-gray-400" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No notes yet
      </h3>
      <p className="text-gray-500 mb-6">
        Create your first note to get started organizing your thoughts.
      </p>
      {onCreateNote && (
        <Button onClick={onCreateNote} size="lg">
          Create First Note
        </Button>
      )}
    </div>
  );
};

export default EmptyStates;