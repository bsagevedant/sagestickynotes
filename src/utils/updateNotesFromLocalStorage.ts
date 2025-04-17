import { Note } from "../store";

function updateNotesFromLocalStorage(notes: Note[]) {
    const key = "sagestickynotes";
    localStorage.setItem(key, JSON.stringify(notes));
}

export default updateNotesFromLocalStorage;
