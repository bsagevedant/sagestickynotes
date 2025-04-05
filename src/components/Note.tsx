import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Trash2 } from 'lucide-react';
import { Note as NoteType } from '../store';

interface NoteProps {
  note: NoteType;
  onUpdate: (content: string) => void;
  onDelete: () => void;
  onBringToFront: () => void;
}

export function Note({ note, onUpdate, onDelete, onBringToFront }: NoteProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: note.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    left: `${note.position.x}%`,
    top: `${note.position.y}%`,
    zIndex: note.zIndex,
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onBringToFront();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`note note-${note.color} absolute w-64 p-4 rounded-lg shadow-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onContextMenu={handleContextMenu}
    >
      <div {...attributes} {...listeners} className="absolute top-0 left-0 w-full h-8 cursor-move" />
      <textarea
        className="w-full h-32 bg-transparent resize-none focus:outline-none text-gray-700 text-lg leading-relaxed mt-4"
        value={note.content}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder="Write your note here..."
        spellCheck="false"
      />
      {isHovered && (
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}