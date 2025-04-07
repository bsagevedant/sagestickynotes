import { Note } from "../store";

function getNotesFromLocalStorage() {
    const key = "sagestickynotes";
    let data = localStorage.getItem(key);

    if (!data) {
      const emptyList: Note[] = [];
      localStorage.setItem(key, JSON.stringify(emptyList));
      return emptyList;
    }

    try {
      const notes: Note[] = JSON.parse(data);
      if (!Array.isArray(notes)) {
        console.error("The content of sagestickynotes is not an array.");
        return [];
      }

      return notes;
    } catch (e) {
      console.error("Error while parsing JSON:", e);
      return [];
    }
}

export default getNotesFromLocalStorage;
