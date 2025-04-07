import { create } from 'zustand';
import getNotesFromLocalStorage from './utils/getNotesFromLocalStorage';

export interface Note {
  id: string;
  content: string;
  position: { x: number; y: number };
  color: string;
  zIndex: number;
}

interface NotesStore {
  notes: Note[];
  addNote: () => void;
  updateNote: (id: string, content: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  deleteNote: (id: string) => void;
  bringToFront: (id: string) => void;
}

const colors = ['yellow', 'pink', 'blue', 'green', 'purple'];

export const useNotesStore = create<NotesStore>((set) => ({
  notes: getNotesFromLocalStorage(),
  addNote: () => set((state) => ({
    notes: [...state.notes, {
      id: crypto.randomUUID(),
      content: '',
      position: { x: Math.random() * 100, y: Math.random() * 100 },
      color: colors[Math.floor(Math.random() * colors.length)],
      zIndex: Math.max(0, ...state.notes.map(n => n.zIndex)) + 1
    }]
  })),
  updateNote: (id, content) => set((state) => ({
    notes: state.notes.map(note => 
      note.id === id ? { ...note, content } : note
    )
  })),
  updatePosition: (id, position) => set((state) => ({
    notes: state.notes.map(note =>
      note.id === id ? { ...note, position } : note
    )
  })),
  deleteNote: (id) => set((state) => ({
    notes: state.notes.filter(note => note.id !== id)
  })),
  bringToFront: (id) => set((state) => ({
    notes: state.notes.map(note => 
      note.id === id 
        ? { ...note, zIndex: Math.max(0, ...state.notes.map(n => n.zIndex)) + 1 }
        : note
    )
  }))
}));