import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import type { NoteFormProps } from '../types/note';
import Modal from '../components/ui/Modal';
import Input ,{Textarea} from '../components/ui/Input';
import Button from '../components/ui/Button';
const NoteForm: React.FC<NoteFormProps> = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      return;
    }

    setIsSaving(true);
    try {
      await onSave({ title, content });
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSave();
    }
  };

  const isFormEmpty = !title.trim() && !content.trim();

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={note ? 'Edit Note' : 'Create New Note'}
      maxWidth="2xl"
    >
      <div className="space-y-4">
        <Input
          id="note-title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter note title..."
          autoFocus
        />
        
        <Textarea
          id="note-content"
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={12}
          placeholder="Write your note here..."
        />
        
        <div className="flex justify-between items-center pt-4">
          <p className="text-sm text-gray-500">
            Press Ctrl+Enter to save quickly
          </p>
          <div className="flex space-x-3">
            <Button
              onClick={onCancel}
              variant="secondary"
              disabled={isSaving}
            >
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isFormEmpty || isSaving}
            >
              <Save size={16} className="mr-2" />
              {isSaving ? 'Saving...' : (note ? 'Update' : 'Save')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NoteForm;