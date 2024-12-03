import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import '../styles/Quill.css';
import CalendarDropdownButton from './CalendarDropdownButton ';

import starEyesEmoji from '../assets/emojis/star struck.svg';
import smileFaceEmoji from '../assets/emojis/smiling face with smiling eyes emoji.svg';
import mouthlessFaceEmoji from '../assets/emojis/face without mouth emoji.svg';
import disappointedEmoji from '../assets/emojis/disappointed face.svg';
import cryingEmoji from '../assets/emojis/loudly crying face emoji.svg';

const DiarioComponent = () => {
    const [editorHtml, setEditorHtml] = useState('');
    const [theme, setTheme] = useState('snow');
    const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null); // Apenas um emoji selecionado

    const handleEmojiSelection = (id: number) => {
        setSelectedEmoji((prevSelected) => (prevSelected === id ? null : id)); // Alterna entre selecionar e desmarcar
    };

    const emojis = [
        { id: 1, image: starEyesEmoji, alt: 'Star Eyes Emoji' },
        { id: 2, image: smileFaceEmoji, alt: 'Smile Face Emoji' },
        { id: 3, image: mouthlessFaceEmoji, alt: 'Mouthless Face Emoji' },
        { id: 4, image: disappointedEmoji, alt: 'Disappointed Emoji' },
        { id: 5, image: cryingEmoji, alt: 'Crying Emoji' },
    ];

    return (
        <div className="flex flex-col">
            <div className="flex py-6 justify-around items-center">
                <div className="selectData">
                    <CalendarDropdownButton />
                </div>
                <div
                    className="w-[30rem] h-[5rem] flex bg-white rounded-3xl justify-center"
                    style={{
                        boxShadow: '0 8px 6px rgba(82, 182, 164, 0.3), 0 1px 3px rgba(82, 182, 164, 0.1)',
                    }}
                >
                    <div className="items-center justify-evenly h-full w-full flex">
                        {emojis.map((emoji) => (
                            <img
                                key={emoji.id}
                                src={emoji.image}
                                alt={emoji.alt}
                                onClick={() => handleEmojiSelection(emoji.id)}
                                className={`cursor-pointer rounded-full p-2 ${
                                    selectedEmoji === emoji.id ? 'bg-[#52b6a47c]' : ''
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
    );
};

export default DiarioComponent;
