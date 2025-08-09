import React from 'react';
import type { Note } from '../types/note'
import NoteCard from './NoteCard';
import EmptyStates from '../layout/EmptyStates';
interface NotesListProps {
  notes: Note[];
  searchTerm: string;
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  onCreateNote: () => void;
}

const NotesList: React.FC<NotesListProps> = ({
  notes,
  searchTerm,
  onEditNote,
  onDeleteNote,
  onCreateNote
}) => {
  if (notes.length === 0) {
    return (
      <EmptyStates
        type={searchTerm ? 'no-search-results' : 'no-notes'}
        searchTerm={searchTerm}
        onCreateNote={searchTerm ? undefined : onCreateNote}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEditNote}
          onDelete={onDeleteNote}
        />
      ))}
    </div>
  );
};

export default NotesList;