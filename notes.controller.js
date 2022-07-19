const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname,'db.json')

async function addNote(title) {
    // const notes = require('./db.json')
    // const notes = Buffer.from(buffer).toString('utf-8')
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.green('Note was added'))
}
async function updateNote(id, title) {
    const notes = await getNotes();
    // const upNote = notes.findIndex((note, id) => {
    //     return note.id === id;
    // })
    // notes[upNote] = { ...notes[upNote], ...title}
    const upNote = notes.map(note => {
        if (note.id === id) {
            return {
                ...note,
                title
            }
        }
        return note
    })
    await fs.writeFile(notesPath, JSON.stringify(upNote))
    console.log(chalk.blue('Note was updated'))
}
async function removeNote(id) {
    const notes = await getNotes();
    const remNote = notes.findIndex((note, i) => {
        return note.id === id;
    })
    notes.splice(remNote, 1);
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgRed('Note was deleted'))
 }
async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}
async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.bgBlue('Here is the list of notes:'))
    notes.forEach(note => {
        console.log(chalk.blue(note.id, note.title))
    })
}
module.exports = {
    addNote, getNotes, removeNote, updateNote
}