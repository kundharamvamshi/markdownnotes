import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function Preview ({title, content}) {
    return (
        <div className='flex flex-col'>
            <p className="font-bold text-3xl mb-2 text-blue-500">Preview</p>
            <div className='flex flex-col border border-gray-900 rounded-lg p-4 w-100 h-full overflow-y-auto'>
                {(!title || !content) && <p className='text-gray-600'>Preview...</p>}
                <h1 className='font-bold text-2xl'>{title}</h1>
                <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
            </div>
        </div>
    )
}

export default Preview;