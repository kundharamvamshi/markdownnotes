import NoteItem from "./NoteItem";

function NotesList({notes, setTitle, setContent, setNoteId, fetchNotes,searchItem,setSearchItem}) {

    const filteredNotes = notes.filter(note=>note.title.toLowerCase().includes(searchItem.toLowerCase()) || note.content.toLowerCase().includes(searchItem.toLowerCase()));

    const handleSearch=(e) => {
        setSearchItem(e.target.value);
    }

    return(
        <div className="mt-5">
            <div className="flex justify-between">
                <h1 className=" font-bold text-left text-3xl mb-4 text-blue-600">Saved Notes</h1>
                <input type='search' placeholder="Search notes..." value={searchItem} onChange={handleSearch} className="border border-gray-300 rounded-lg p-2 mb-4 h-10" />
            </div>
            {filteredNotes.length === 0 ? (
                <p className="text-gray-500 text-lg">No notes found</p>
            ) : (
                <ul className="list-none">
                    {filteredNotes.map(note =>  <NoteItem key={note.id} note={note} updateTitle={setTitle} updateContent={setContent} updateNoteId={setNoteId} fetchNotes={fetchNotes}/>)}
                </ul>
            )}
        </div>
    )
}

export default NotesList;