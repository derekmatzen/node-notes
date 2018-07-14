const fs = require('fs')
const _ = require('lodash')
const yargs = require('yargs')

const notes = require('./notes.js')

const titleOptions =  {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('edit', 'Edit a note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('remove', 'Delete a note', {
        title: titleOptions
    })
    .command('clear', 'Delete all notes')
    .help()
    .argv
let command = argv._[0]

if (command === 'add') {
    let newNote = notes.addNote(argv.title, argv.body)
    if (newNote) {
        console.log('Note created.')
        notes.logNote(newNote)
    } else {
        console.log(`Title: "${argv.title}" is already in use.`)
    }
} else if (command === 'list') {
    notes.getAll()
} else if (command === 'read') {
    let readNote = notes.getNote(argv.title)
    if (readNote) {
        console.log('Found note.')
        notes.logNote(readNote)
    } else {
        console.log(`Title: "${argv.title}" cannot be found.`)
    }
} else if (command === 'edit') {
    let verifiedNote = notes.getNote(argv.title)
    if (verifiedNote) {
        notes.removeNote(argv.title)
        let editedNote = notes.addNote(argv.title, argv.body)
        console.log('Edited note.')
        notes.logNote(editedNote)
    } else {
        console.log(`Note: "${argv.title}" does not exist.`)
    }
} else if (command === 'remove') {
    let removedNote = notes.removeNote(argv.title)
    removedNote 
        ? console.log(`Note: "${argv.title}" has been deleted.`)
        : console.log(`Note: "${argv.title}" does not exist.`)
} else if (command === 'clear') {
    notes.removeAll()
    console.log('All of the notes have been deleted.')
} else {
    console.log('Command not found.')
}