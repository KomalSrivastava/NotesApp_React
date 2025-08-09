import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { formatDate , isDateSame } from '../utils/dateUtils';
import type { NoteCardProps } from '../types/note';
const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(note.id);
    }
  };

  const handleEdit = () => {
    onEdit(note);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow group">
      {/* Header with Title and Actions */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate flex-1 mr-2">
          {note.title || 'Untitled'}
        </h3>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleEdit}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Edit note"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete note"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      {/* Content Preview */}
      <div className="mb-4">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
          {note.content || 'No content'}
        </p>
      </div>
      
      {/* Timestamps */}
      <div className="text-xs text-gray-400 space-y-1">
        <p>Created: {formatDate(note.createdAt)}</p>
        {!isDateSame(note.updatedAt, note.createdAt) && (
          <p>Updated: {formatDate(note.updatedAt)}</p>
        )}
      </div>
    </div>
  );
};

export default NoteCard;