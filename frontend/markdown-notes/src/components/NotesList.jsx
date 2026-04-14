import NoteItem from "./NoteItem";

function NotesList({notes, setTitle, setContent, setNoteId, fetchNotes}) {

    return(
        <div className="mt-5">
            <h1 className=" font-bold text-left text-3xl mb-4 text-blue-600">Saved Notes</h1>
            {notes.length === 0 ? (
                <p className="text-gray-500 text-lg">No notes found</p>
            ) : (
                <ul className="list-none">
                    {notes.map(note =>  <NoteItem key={note.id} note={note} updateTitle={setTitle} updateContent={setContent} updateNoteId={setNoteId} fetchNotes={fetchNotes}/>)}
                </ul>
            )}
        </div>
    )
}

export default NotesList;