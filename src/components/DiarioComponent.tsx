import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import '../styles/Quill.css';
import CalendarDropdownButton from './CalendarDropdownButton ';

import Emoji from '../assets/emoji.svg';

const DiarioComponent = () => {
    const [editorHtml, setEditorHtml] = useState('');
    const [theme, setTheme] = useState('snow');
    const [selectedEmoji, setSelectedEmoji] = useState(null);

    const handleEmojiClick = (index: any) => {
        setSelectedEmoji(index);
    };

    return (
        <div className="flex flex-col">
            <div className="flex py-6 justify-around items-center">
                <div className="selectData">
                    <CalendarDropdownButton />
                </div>
                <div className="w-[30rem] h-[5rem] flex bg-white rounded-3xl justify-center"
                    style={{
                        boxShadow: "0 8px 6px rgba(82, 182, 164, 0.3), 0 1px 3px rgba(82, 182, 164, 0.1)"
                    }}>
                    <div className="items-center justify-evenly h-full w-full flex">
                        {[...Array(5)].map((_, index) => (
                            <img
                                key={index}
                                src={Emoji}
                                alt=""
                                onClick={() => handleEmojiClick(index)}
                                className={`cursor-pointer rounded-full p-2 ${selectedEmoji === index ? 'bg-[#52b6a47c]' : ''
                                    }`}

                            />
                        ))}
                    </div>
                </div>
            </div>
            <ReactQuill
                theme={theme}
                value={editorHtml}
                className="border-none"
                style={{
                    boxShadow: "0 8px 6px rgba(82, 182, 164, 0.3), 0 1px 3px rgba(82, 182, 164, 0.1)"
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
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                ]}
                placeholder="Escreva algo..."
            />
        </div>
    );
};

export default DiarioComponent;
