// Adapted from https://github.com/ianstormtaylor/slate/blob/main/site/examples/forced-layout.tsx

import {useState, useCallback} from 'react';
import PropTypes from 'prop-types';

import {Slate, Editable, withReact} from 'slate-react';
import {Transforms, createEditor, Node, Element as SlateElement} from 'slate';
import {withHistory} from 'slate-history';

import {ModalPopup} from 'src/components/ModalPopup';

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
          if (SlateElement.isElement(child) && child.type !== type) {
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

const Element = ({attributes, children, element}) => {
  switch (element.type) {
    case 'title':
      return <H2PlaceName {...attributes}>{children}</H2PlaceName>;
    case 'paragraph':
      return <p {...attributes}>{children}</p>;
    default:
      return null;
  }
};

export const PlaceInfoEditor = ({
  placeName,
  placeNoteArray,
  setEditMode,
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
  const content = [titleNode].concat(placeNoteArray);
  const [value, setValue] = useState(content);
  const renderElement = useCallback(props => <Element {...props} />, []);

  const handleClickSave = event => {
    event.preventDefault();
    const [title, ...noteArray] = value;
    updateData([title, noteArray]);
    setEditMode(false);
  };

  return (
    <ModalPopup hidden={false} slideFrom="bottom" titleId="edit-place-info">
      <form>
        <Slate
          editor={editor}
          value={value}
          onChange={value => setValue(value)}
        >
          <HeaderEditor>
            <Heading as="h1" data-editor>
              {editorLabel}
            </Heading>
            <section>
              <button
                onClick={() => {
                  setEditMode(false);
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
            spellCheck
          />
        </Slate>
      </form>
    </ModalPopup>
  );
};

PlaceInfoEditor.propTypes = {
  placeName: PropTypes.string,
  placeNoteArray: PropTypes.arrayOf(Object),
  setEditMode: PropTypes.func,
  updateData: PropTypes.func,
};
