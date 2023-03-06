// Adapted from https://github.com/ianstormtaylor/slate/blob/main/site/examples/forced-layout.tsx

import {useRef, useState, useCallback} from 'react';
import PropTypes from 'prop-types';

import {Slate, Editable, withReact} from 'slate-react';
import {Transforms, createEditor, Node, Element} from 'slate';
import {withHistory} from 'slate-history';

import {InlineChromiumBugfix} from './InlineChromiumBugfix';
import {H2PlaceName} from 'src/elements/H2PlaceName';
import {HeaderEditor} from 'src/elements/HeaderEditor';
import {Heading} from 'src/elements/Heading';

import {buttonLabel, editorLabel} from 'src/utils/uiCopies';

const withLayout = editor => {
  const {normalizeNode} = editor;

  editor.normalizeNode = ([node, path]) => {
    // At the top node
    if (path.length === 0) {
      // If there is no child node at all, create a node of title type with placeholder text
      if (editor.children.length < 1) {
        const title = {
          type: 'title',
          children: [{text: 'Unnamed place'}],
        };
        Transforms.insertNodes(editor, title, {at: path.concat(0)});
      }
      // If there is at most one child node, create a second node of paragraph type
      if (editor.children.length < 2) {
        const paragraph = {
          type: 'paragraph',
          children: [{text: ''}],
        };
        Transforms.insertNodes(editor, paragraph, {at: path.concat(1)});
      }

      // Convert 0th node into title type, 1st node into paragraph type
      for (const [child, childPath] of Node.children(editor, path)) {
        const enforceType = type => {
          if (Element.isElement(child) && child.type !== type) {
            const newProperties = {type};
            Transforms.setNodes(editor, newProperties, {
              at: childPath,
            });
          }
        };
        const slateIndex = childPath[0];
        switch (slateIndex) {
          case 0:
            enforceType('title');
            break;
          case 1:
            enforceType('paragraph');
            break;
          default:
            break;
        }
      }
    }

    return normalizeNode([node, path]);
  };

  return editor;
};

export const PlaceInfoEditor = ({
  handleCancel,
  placeName,
  placeNoteArray,
  updateData,
}) => {
  const [editor] = useState(() =>
    withLayout(withReact(withHistory(createEditor()))),
  );
  const titleNode = {
    type: 'title',
    children: [
      {
        text: placeName,
      },
    ],
  };
  const initialContent = [titleNode].concat(placeNoteArray);
  const content = useRef(initialContent);
  const renderElement = useCallback(({attributes, children, element}) => {
    switch (element.type) {
      case 'title':
        return <H2PlaceName {...attributes}>{children}</H2PlaceName>;
      case 'paragraph':
        return <p {...attributes}>{children}</p>;
      case 'link':
        return (
          <a {...attributes} href={element.url}>
            <InlineChromiumBugfix />
            {children}
            <InlineChromiumBugfix />
          </a>
        );
      default:
        return null;
    }
  }, []);

  const handleClickSave = event => {
    event.preventDefault();
    const [title, ...noteArray] = content.current;
    updateData([title, noteArray]);
  };

  return (
    <form>
      <Slate
        editor={editor}
        value={initialContent}
        onChange={value => (content.current = value)}
      >
        <HeaderEditor>
          <Heading as="h1" data-editor>
            {editorLabel}
          </Heading>
          <section>
            <button
              onClick={() => {
                handleCancel();
              }}
              type="button"
            >
              {buttonLabel.cancel}
            </button>
            <button data-save onClick={handleClickSave} type="button">
              {buttonLabel.saveEdit}
            </button>
          </section>
        </HeaderEditor>
        <Editable
          data-autofocus // autoFocus won't work due to the use of react-focus-lock package
          placeholder="Enter a place name"
          renderElement={renderElement}
        />
      </Slate>
    </form>
  );
};

PlaceInfoEditor.propTypes = {
  handleCancel: PropTypes.func,
  placeName: PropTypes.string,
  placeNoteArray: PropTypes.arrayOf(Object),
  updateData: PropTypes.func,
};
