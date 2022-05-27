import React from 'react';
import { Quill } from 'react-quill';
import sendIcon from '../../assets/images/send.png';

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly

// Undo and redo functions for Custom Toolbar
function undoChange() {
    this.quill.history.undo();
}
function redoChange() {
    this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import('formats/size');
Size.whitelist = ['extra-small', 'small', 'medium', 'large'];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font');
Font.whitelist = ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida'];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
    toolbar: {
        container: '#toolbar',
        handlers: {
            undo: undoChange,
            redo: redoChange,
        },
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
    },
};

// Formats objects for setting up the Quill editor
export const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'align',
    'strike',
    'script',
    'blockquote',
    'background',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'code-block',
];

// Quill Toolbar component
export const QuillToolbar = () => (
    <div id="toolbar" style={{ border: '0px solid #eee', borderTopWidth: 1, position: 'relative' }}>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />

        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />

        <button className="ql-blockquote" />
        <button className="ql-direction" />
        {/* <select className="ql-align" />
        <select className="ql-color" />
        <select className="ql-background" /> */}
        <button className="ql-link" />
        {/* <button className="ql-image" />
      <button className="ql-video" /> */}

        <button className="ql-code-block" />
        <button className="ql-clean" />
        <button form="chat-form" type="submit" style={{ position: 'absolute', right: 10 }}>
            <img src={sendIcon} style={{ height: 20, marginTop: -7 }} />
        </button>
    </div>
);

export default QuillToolbar;
