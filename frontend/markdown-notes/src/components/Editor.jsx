function Editor({title,setTitle,content,setContent}) {

    return( 
        <div className="flex flex-col">
            <p className="font-bold text-3xl mb-2 text-blue-500">Editor</p>
            <div className="flex flex-col border border-gray-900 rounded-lg p-4 mr-4 w-100 h-100">
                <input type="text" placeholder='Enter Your title here...' className="border border-gray-300 rounded-lg p-2 mb-2 w-full h-15" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <textarea placeholder='Write your markdown here...' className="border border-gray-300 rounded-lg p-2 w-full h-full" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
            </div>
        </div>
    )
}

export default Editor;