import type { Note } from "../types/note";
const storage_key = "notes_app_data";
export const loadNotes = (): Note[] => {
    try {
        const savedNotes = sessionStorage.getItem(storage_key);
        if (!savedNotes) return [];
        const parsedNotes = JSON.parse(savedNotes);
        return parsedNotes.map((note: any) => ({
            ...note,
            createdAt: new Date(note.createdAt) ,
            updatedAt: new Date(note.updatedAt)
        }));
    } catch (error) {
        console.error("Error loading notes :" , error)
        return [];
    }
}


export const saveNotes = (notes :Note[]) : void=>{
    try {
        sessionStorage.setItem(storage_key, JSON.stringify(notes));
    } catch (error) {
        console.error("error saving notes :", error)
    }

}


export const generateNotesId =():string =>{
    return `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}