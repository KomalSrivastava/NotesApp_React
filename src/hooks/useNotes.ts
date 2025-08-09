import { useState, useEffect, useCallback } from 'react';
import type { Note, NoteFormData } from '../types/note';
import { loadNotes, saveNotes, generateNotesId } from '../utils/storage';

export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Load notes on mount
    useEffect(() => {
        const savedNotes = loadNotes();
        setNotes(savedNotes);
    }, []);

    // Save notes whenever they change
    useEffect(() => {
        saveNotes(notes);
    }, [notes]);

    const addNote = useCallback((noteData: NoteFormData) => {
        const now = new Date();
        const newNote: Note = {
            id: generateNotesId(),
            title: noteData.title.trim(),
            content: noteData.content.trim(),
            createdAt: now,
            updatedAt: now
        };
        setNotes(prev => [newNote, ...prev]);
    }, []);

    const updateNote = useCallback((id: string, noteData: NoteFormData) => {
        setNotes(prev => prev.map(note =>
            note.id === id
                ? {
                    ...note,
                    title: noteData.title.trim(),
                    content: noteData.content.trim(),
                    updatedAt: new Date()
                }
                : note
        ));
    }, []);

    const deleteNote = useCallback((id: string) => {
        setNotes(prev => prev.filter(note => note.id !== id));
    }, []);

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
        notes: filteredNotes,
        searchTerm,
        setSearchTerm,
        addNote,
        updateNote,
        deleteNote,
        totalNotes: notes.length
    };
};