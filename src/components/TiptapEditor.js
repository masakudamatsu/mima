import {generateHTML} from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import Link from '@tiptap/extension-link';
import Paragraph from '@tiptap/extension-paragraph';
import {Placeholder} from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import {useEditor, EditorContent} from '@tiptap/react';

import DOMPurify from 'dompurify';

import PropTypes from 'prop-types';

import {HeaderEditor} from 'src/elements/HeaderEditor';
import {H2} from 'src/elements/H2';

import {buttonLabel, editorLabel} from 'src/utils/uiCopies';

const CustomDocument = Document.extend({
  content: 'heading block+', // turning the first element into <h1>
});

const SingleBlockDocument = Document.extend({
  content: 'block',
});

export const TiptapEditor = ({
  data,
  handleCancel,
  handleResponse,
  searchedPlace,
  setUi,
}) => {
  // Handling input
  let content;
  if (data.html) {
    // saved place
    content = DOMPurify.sanitize(data.html);
  } else {
    // searched place
    content = {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: {level: 2},
          content: [{type: 'text', text: data.name}],
        },
        {
          type: 'paragraph',
        },
      ],
    };
  }

  // Setting up text editor
  const editor = useEditor({
    extensions: [
      CustomDocument,
      Heading.configure({
        levels: [2, 3], // turning the first element into <h2>, not <h1>
      }),
      Link.configure({
        HTMLAttributes: {
          rel: 'nofollow noreferrer', // to override the default of "noopener noreferrer nofollow"; see https://tiptap.dev/api/marks/link;
        },
        // for nofollow, see https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=en&visit_id=638148628535504987-2673944290&rd=1#linkwithcaution
        // we drop noopener as we don't need to support legacy browsers (Google Maps doesn't support them); for modern browsers, noreferrer implies noopener; see https://html.spec.whatwg.org/multipage/links.html#link-type-noreferrer
      }),
      Paragraph,
      Text,
      History,
      Placeholder.configure({
        placeholder: ({node}) => {
          if (node.type.name === 'heading') {
            return editorLabel.placeholder.placeName; // Shown when no place name is provided
          }

          return editorLabel.placeholder.placeNote; // Shown when no note is provided
        },
        showOnlyCurrent: false, // Show placeholder text for notes when the cursor is on place name (and vice versa)
      }),
    ],
    content: content,
    autofocus: true, // so users can immediately start typing once the editor is opened
    editorProps: {
      attributes: {
        role: 'textbox', // for accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/textbox_role
        'aria-label': editorLabel.ariaLabel.note,
        'aria-multiline': 'true', // for accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-multiline
      },
    },
    injectCSS: false, // remove the default style
  });
  // setting up address editor
  const addressEditor = useEditor({
    extensions: [
      SingleBlockDocument,
      Paragraph,
      Text,
      History, // for undo feature; Docs: https://tiptap.dev/api/extensions/history
      Placeholder.configure({
        placeholder: editorLabel.placeholder.placeAddress, // Shown when no address is provided
      }),
    ],
    content: `<p>${DOMPurify.sanitize(data.address)}</p>`,
    editorProps: {
      attributes: {
        role: 'textbox', // for accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/textbox_role
        'aria-label': editorLabel.ariaLabel.address,
      },
    },
    injectCSS: false, // remove the default style
  });
  // setting up URL editor
  const urlEditor = useEditor({
    extensions: [
      SingleBlockDocument,
      Paragraph,
      Text,
      History, // for undo feature; Docs: https://tiptap.dev/api/extensions/history
      Placeholder.configure({
        placeholder: editorLabel.placeholder.placeUrl, // Shown when no address is provided
      }),
    ],
    content: `<p>${DOMPurify.sanitize(data.url)}</p>`,
    editorProps: {
      attributes: {
        role: 'textbox', // for accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/textbox_role
        'aria-label': editorLabel.ariaLabel.url,
      },
    },
    injectCSS: false, // remove the default style
  });

  // Handling output
  const handleClickSave = async event => {
    event.preventDefault();
    setUi(searchedPlace ? {status: 'saving'} : {ui: 'saving'});
    // retrieve user's note
    const json = editor.getJSON();
    // handle place name
    let userPlaceName;
    if (json.content[0].content) {
      // User has provided place name
      userPlaceName = json.content[0].content[0].text;
    } else {
      // User has failed to provide place name
      userPlaceName = editorLabel.unnamedPlace;
      json.content[0].content = [{type: 'text', text: userPlaceName}]; // fill in to <h2>, which would otherwise be empty
    }
    // handle place note (including place name)
    const userPlaceNote = DOMPurify.sanitize(
      generateHTML(json, [CustomDocument, Heading, Link, Paragraph, Text]), // docs: https://tiptap.dev/api/utilities/html#generate-html-from-json
      {ADD_ATTR: ['target']}, // see https://github.com/cure53/DOMPurify/issues/317#issuecomment-470429778
    ); // editor.getHTML() would include an empty <h2> element whose text content (apparently) cannot be modified...
    // handle address
    const userPlaceAddress = addressEditor.getJSON().content[0].content
      ? addressEditor.getJSON().content[0].content[0].text
      : ''; // when the user provides no address, `addressEditor.getJSON()` returns  {"type":"doc","content":[{"type":"paragraph"}]}
    // handle URL
    const userPlaceUrl = urlEditor.getJSON().content[0].content
      ? urlEditor.getJSON().content[0].content[0].text
      : '';
    try {
      const response = await fetch('/api/places', {
        method: searchedPlace ? 'POST' : 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
          searchedPlace
            ? {
                geometry: {
                  coordinates: [data.lng, data.lat],
                  type: 'Point',
                },
                properties: {
                  address: userPlaceAddress,
                  'Google Maps place name': data.name, // to be used for constructing Directions URL
                  'Google Maps URL': userPlaceUrl,
                  name: userPlaceName, // edited by user, not the one returned from Google Maps API server
                  note: userPlaceNote,
                },
                type: 'Feature',
              }
            : {
                id: data.id,
                properties: {
                  address: userPlaceAddress, // cannot be omitted; otherwise deleted
                  'Google Maps URL': userPlaceUrl, // cannot be omitted; otherwise deleted
                  name: userPlaceName, // edited by user, not the one returned from Google Maps API server
                  note: userPlaceNote,
                },
              },
        ),
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        handleResponse(jsonResponse);
      } else {
        throw new Error(
          searchedPlace
            ? 'POST request to /api/places has failed.'
            : 'PUT request to /api/places has failed.',
        );
      }
    } catch (error) {
      // TODO #282: handle database access error
      console.error(error);
    }
  };

  return (
    <form aria-labelledby="editor-heading">
      <HeaderEditor>
        <H2 as="h1" data-editor id="editor-heading">
          {editorLabel.title}
        </H2>
        <section>
          <button
            onClick={() => {
              handleCancel();
            }}
            type="button"
          >
            {buttonLabel.cancel}
          </button>
          <button data-save onClick={handleClickSave} type="submit">
            {buttonLabel.saveEdit}
          </button>
        </section>
      </HeaderEditor>
      <EditorContent editor={editor} />
      <H2 data-address-editor>{editorLabel.address}</H2>
      <EditorContent editor={addressEditor} />
      <H2 data-url-editor>{editorLabel.url}</H2>
      <EditorContent editor={urlEditor} />
    </form>
  );
};

TiptapEditor.propTypes = {
  data: PropTypes.object,
  handleCancel: PropTypes.func,
  handleResponse: PropTypes.func,
  searchedPlace: PropTypes.bool,
  setUi: PropTypes.func,
};
