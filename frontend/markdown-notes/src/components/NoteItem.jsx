import Markdown from "react-markdown";

import api from "../services/api";
import { toast} from "react-toastify";
import remarkGfm from "remark-gfm";


function NoteItem({note,updateTitle,updateContent,updateNoteId,fetchNotes}) {

    const {title,content,id} = note;

    const handleUpdate = () => {
        updateTitle(title);
        updateContent(content);
        updateNoteId(id);
    }

    const handleDelete = async () => {
        try {
            const response = await api.delete(`/${id}`);
            toast.warning(response.data.message);
            await fetchNotes();

        } catch (error) {
            console.error("Error deleting note:", error);
            toast.error("Error deleting note");
        }
    };


    return(
        <li className="border border-gray-300 rounded-lg p-4 mb-4">
            <div>
                <h3 className="font-bold text-xl text-cyan-500 mb-4">{title}</h3>
                <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
            </div>
            <div className="mt-4">
                <button onClick={handleUpdate} className="text-white bg-blue-500 rounded-lg w-[100px] h-[40px] mr-2">Update</button>
                <button onClick={handleDelete} className="text-white bg-red-500 rounded-lg w-[100px] h-[40px]">Delete</button>
            </div>
        </li>
    )
}

export default NoteItem;