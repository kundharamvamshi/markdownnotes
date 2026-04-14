import { useEffect, useState } from 'react';

import { ToastContainer, toast,Bounce } from 'react-toastify';


import Editor from '../components/Editor';
import Preview from '../components/Preview';
import NotesList from '../components/NotesList';

import api from '../services/api';


function Home() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [noteId,setNoteId] = useState(null);

    const [notes, setNotes] = useState([]);

    const [searchItem , setSearchItem] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await api.get('/');
            setNotes(response.data);
        } catch (error) {
            console.log(`Error fetching notes:${error}`);
        }
    };

    const saveNote = async () => {

        try {
            if (noteId) {
                const updatedNote={
                    title,content 
                }
                const response = await api.put(`/${noteId}`, updatedNote);
                toast.success(response.data.message);
            }
            else{
                const newNote = {
                    title, content
                }
                const response = await api.post('/', newNote);
                toast.success(response.data.message);
            }
        }
        catch (error) {
            console.log(`Error saving note:${error}`);
            toast.error('Error saving note');
        }
    }

    const handleSave = async () => {
        if (!title || !content) {
            toast.error('Title or content cannot be empty');
            return;
        }

        await saveNote();
        await fetchNotes();
        setTitle('');
        setContent('');
        setNoteId(null);
    };

return (
    <div className='flex flex-col mx-auto p-4 gap-4 m-4'>
        <h1 className='font-bold text-5xl text-blue-600 mb-5'>Markdown Notes</h1>
        <div className='flex item-center justify-center gap-8 border rounded-lg p-6 pl-8 w-full h-100'>
            <Editor title={title} setTitle={setTitle} content={content} setContent={setContent} />
            <Preview title={title} content={content} />
        </div>
        <button onClick={handleSave} className='text-white bg-blue-500 rounded-lg w-[150px] h-[40px]'>Save</button>
        <NotesList searchItem={searchItem} setSearchItem={setSearchItem} notes={notes} setTitle={setTitle} setContent={setContent} setNoteId={setNoteId} fetchNotes={fetchNotes} />
        <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
        />
    </div>
)
}

export default Home;