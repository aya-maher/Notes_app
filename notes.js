const fs = require('fs')
const chalk = require('chalk')

 const addNote = (title, body) => {
   const notes = loadNote()
   const duplicateNote = notes.find((note) => note.title == title )

    if (!duplicateNote) {
        notes.push({
          title: title,
          body: body
        })
       saveNotes(notes)
       console.log(chalk.blue.inverse('New note added !'));
    } else {
       console.log(chalk.red.inverse('Note title token !'));
    }
}

 const removeNote = (title) => {
   const notes = loadNote()
   const notesToKeep = notes.filter((note) => note.title !== title)

   if (notes.length > notesToKeep.length) {
     console.log(chalk.green.inverse('Note removed !'))
     saveNotes(notesToKeep)
   } else {
     console.log(chalk.red.inverse('No note found !'))
   }

 }

 const listNotes = () =>{
   const notes = loadNote()
   console.log(chalk.inverse("Your Notes"));
   notes.forEach((note)=>{
     console.log(note.title);
   })
 }

 const readNote = (title) =>{
     const notes = loadNote()
     const note = notes.find((note) => note.title == title )

     if (note) {
       console.log(chalk.inverse(note.title))
       console.log(note.body)
     } else {
       console.log(chalk.red.inverse('Note not found!'))
     }
 }


const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}


const loadNote = () => {
  try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  }catch(e){
   return []
  }
}

module.exports = {
   addNote: addNote,
   removeNote: removeNote,
   listNotes: listNotes,
   readNote: readNote
}
