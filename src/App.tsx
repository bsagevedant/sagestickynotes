import React from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { PlusCircle } from 'lucide-react';
import { Note } from './components/Note';
import { useNotesStore } from './store';

function App() {
  const { notes, addNote, updateNote, updatePosition, deleteNote } = useNotesStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const note = notes.find(n => n.id === active.id);
    if (note) {
      const newX = Math.max(0, Math.min(100, note.position.x + (delta.x / window.innerWidth) * 100));
      const newY = Math.max(0, Math.min(100, note.position.y + (delta.y / window.innerHeight) * 100));
      updatePosition(note.id, { x: newX, y: newY });
    }
  };

  return (
    <div className="min-h-screen board relative overflow-hidden">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={addNote}
          className="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <PlusCircle className="w-8 h-8 text-gray-700" />
        </button>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        {notes.map(note => (
          <Note
            key={note.id}
            note={note}
            onUpdate={(content) => updateNote(note.id, content)}
            onDelete={() => deleteNote(note.id)}
          />
        ))}
      </DndContext>
    </div>
  );
}

export default App;