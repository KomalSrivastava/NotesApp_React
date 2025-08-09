import React from 'react';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
interface NotesHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onCreateNote: () => void;
  totalNotes: number;
}

const NotesHeader: React.FC<NotesHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onCreateNote,
  totalNotes
}) => {
  return (
    <div className="mb-8">
      {/* Title Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Notes</h1>
        <p className="text-gray-600">
          {totalNotes === 0 
            ? 'Create, edit, and organize your thoughts' 
            : `${totalNotes} ${totalNotes === 1 ? 'note' : 'notes'} in your collection`
          }
        </p>
      </div>

      {/* Search and Add Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search notes..."
          className="flex-1"
        />
        <Button
          onClick={onCreateNote}
          className="flex items-center space-x-2 whitespace-nowrap"
        >
          <Plus size={20} />
          <span>Add Note</span>
        </Button>
      </div>
    </div>
  );
};

export default NotesHeader;