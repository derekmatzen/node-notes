const fs = require('fs')

let fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json')
        return JSON.parse(notesString)
    } catch (e) {
        return []
    }
}

let saveNotes = notes => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}

let addNote = (title, body) => {
    let notes = fetchNotes()
    let note = {
        title,
        body
    }

    let duplicateNotes = notes.filter(note => note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push(note)
        saveNotes(notes)
        return note
    }
}

let getAll = () => {
    let notes = fetchNotes()
    if (notes.length > 0) {
        notes.forEach(note => {
            logNote(note)
        })
    } else {
        console.log("You don't have any notes.")
    }
}

let getNote = title => {
    let notes = fetchNotes()
    let note = notes.filter(note => note.title === title)
    return note[0]
}

let removeNote = title => {
    let notes = fetchNotes()
    let filteredNotes = notes.filter(note => note.title !== title)
    saveNotes(filteredNotes)
    return notes.length !== filteredNotes.length
}

let logNote = note => {
    debugger
    console.log('-'.repeat(64))
    console.log('\n')
    console.log(`Title: ${note.title}`)
    console.log(`Body: ${note.body}`)
    console.log('\n')
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}