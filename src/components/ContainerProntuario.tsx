import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import '../styles/Quill.css';

const ContainerProntuario = () => {

    const [editorHtml, setEditorHtml] = useState('');
    const [theme, setTheme] = useState('snow');

    return (
    <div>
<ReactQuill
                theme={theme}
                value={editorHtml}
                className="border-none"
                style={{
                    boxShadow: '0 8px 6px rgba(82, 182, 164, 0.3), 0 1px 3px rgba(82, 182, 164, 0.1)',
                }}
                onChange={setEditorHtml}
                modules={{
                    toolbar: [
                        [{ header: '1' }, { header: '2' }, { font: [] }],
                        [{ size: [] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                        ['clean'],
                    ],
                    clipboard: { matchVisual: false },
                }}
                formats={[
                    'header',
                    'font',
                    'size',
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    'blockquote',
                    'list',
                    'bullet',
                    'indent',
                ]}
                placeholder="Escreva algo..."
            />
    </div>
  )
}

export default ContainerProntuario

