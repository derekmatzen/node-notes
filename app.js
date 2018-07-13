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
    .command('remove', 'Delete a note', {
        title: titleOptions
    })
    .help()
    .argv
let command = argv._[0]

if (command === 'add') {
    let note = notes.addNote(argv.title, argv.body)
    if (note) {
        console.log('Note created.')
        notes.logNote(note)
    } else {
        console.log(`Title: "${argv.title}" is already in use.`)
    }
} else if (command === 'list') {
    notes.getAll()
} else if (command === 'read') {
    let note = notes.getNote(argv.title)
    if (note) {
        console.log('Found note.')
        notes.logNote(note)
    } else {
        console.log(`Title: "${argv.title}" cannot be found.`)
    }
} else if (command === 'remove') {
    let removedNote = notes.removeNote(argv.title)
    removedNote 
        ? console.log(`Note: "${argv.title}" has been deleted.`)
        : console.log(`Note: "${argv.title}" does not exist.`)
} else {
    console.log('Command not found.')
}