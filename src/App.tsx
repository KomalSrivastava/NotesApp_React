import React, { useState } from 'react';
import type { Note } from './types/note';
import { useNotes } from './hooks/useNotes';
import NotesHeader from './Notes/NoteHeader';
import NotesList from './Notes/NoteList';
import NoteForm from './Notes/NoteForm';
const App: React.FC = () => {
  const {
    notes,
    searchTerm,
    setSearchTerm,
    addNote,
    updateNote,
    deleteNote,
    totalNotes
  } = useNotes();

  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleCreateNote = () => {
    setShowForm(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
  };

  const handleSaveNote = (noteData: { title: string; content: string }) => {
    if (editingNote) {
      updateNote(editingNote.id, noteData);
      setEditingNote(null);
    } else {
      addNote(noteData);
      setShowForm(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  const isFormOpen = showForm || editingNote !== null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NotesHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onCreateNote={handleCreateNote}
          totalNotes={totalNotes}
        />
        
        <NotesList
          notes={notes}
          searchTerm={searchTerm}
          onEditNote={handleEditNote}
          onDeleteNote={deleteNote}
          onCreateNote={handleCreateNote}
        />
        
        {isFormOpen && (
          <NoteForm
            note={editingNote || undefined}
            onSave={handleSaveNote}
            onCancel={handleCancelForm}
          />
        )}
      </div>
    </div>
  );
};

export default App;