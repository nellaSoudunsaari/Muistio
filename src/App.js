import {useEffect, useState} from "react";
import uuid from "react-uuid";
import './App.css';
import Main from './Main';
import Sidebar from './Sidebar';


function App() {

  const[notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.notes) : []);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // lisää uuden muistion
  const onAddNote = () =>{
    const newNote = {
      // asettaa ID:n muistiolle
      id: uuid(),
      title: "Untitled",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
  };

  // päivittää muistion
  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
    if(note.id === activeNote){
      return updatedNote;
    }

    return note;
  });

  setNotes(updatedNotesArray);
  };

  // poistaa muistion sen ID:n perusteella
  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  const getActiveNote = () => {
    // hakee objektin jolla on active-luokka
    return notes.find((note) => note.id === activeNote);
  };

  return (
    <div className="App">
      {/*Muistion rakenne, sidebar sisältää tehdyt muistiot ja toiminnot niille*/}
      <Sidebar 
      notes={notes} 
      onAddNote={onAddNote} 
      onDeleteNote={onDeleteNote}
      activeNote={activeNote}
      setActiveNote={setActiveNote}
      />
      {/*sisältää aktiivisen muistion ja funktion, joka päivittää muistion*/}
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>
    </div>
  );
}

export default App;
