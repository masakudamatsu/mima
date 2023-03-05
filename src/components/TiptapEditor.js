import {useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// import PropTypes from 'prop-types';

export const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
  });

  return <EditorContent editor={editor} />;
};

// TiptapEditor.propTypes = {};
