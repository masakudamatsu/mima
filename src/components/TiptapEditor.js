import Document from '@tiptap/extension-document';
import Link from '@tiptap/extension-link';
import {Placeholder} from '@tiptap/extension-placeholder';
import {useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import DOMPurify from 'dompurify';

import PropTypes from 'prop-types';

import {HeaderEditor} from 'src/elements/HeaderEditor';
import {Heading} from 'src/elements/Heading';

import {buttonLabel, editorLabel} from 'src/utils/uiCopies';

const CustomDocument = Document.extend({
  content: 'heading block*', // turning the first element into <h1>
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
          content: [{type: 'text', text: 'your note...'}],
        },
      ],
    };
  }

  // Setting up text editor
  const editor = useEditor({
    extensions: [
      CustomDocument,
      Link.configure({
        HTMLAttributes: {
          rel: 'nofollow noreferrer', // to override the default of "noopener noreferrer nofollow"; see https://tiptap.dev/api/marks/link;
        },
        // for nofollow, see https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=en&visit_id=638148628535504987-2673944290&rd=1#linkwithcaution
        // we drop noopener as we don't need to support legacy browsers (Google Maps doesn't support them); for modern browsers, noreferrer implies noopener; see https://html.spec.whatwg.org/multipage/links.html#link-type-noreferrer
      }),
      StarterKit.configure({
        document: false, // to use CustomDocument, not the default Document extension included in StarterKit
        heading: {
          levels: [2, 3], // turning the first element into <h2>, not <h1>
        },
      }),
      Placeholder.configure({
        placeholder: ({node}) => {
          if (node.type.name === 'heading') {
            return 'Enter the place name'; // Shown when no place name is provided
          }

          return 'Enter your notes on the place'; // Shown when no note is provided
        },
      }),
    ],
    content: content,
    autofocus: true, // so users can immediately start typing once the editor is opened
    editorProps: {
      attributes: {
        role: 'textbox', // for accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/textbox_role
        'aria-multiline': 'true', // for accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-multiline
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
    let userPlaceName, userPlaceNote;
    if (json.content[0].content) {
      // User has provided place name
      userPlaceName = json.content[0].content[0].text;
      userPlaceNote = DOMPurify.sanitize(
        editor.getHTML(),
        {ADD_ATTR: ['target']}, // see https://github.com/cure53/DOMPurify/issues/317#issuecomment-470429778
      );
    } else {
      // User has failed to provide place name
      userPlaceName = 'Unnamed place';
      json.content[0].content = [{type: 'text', text: userPlaceName}]; // fill in to <h2>, which would otherwise be empty
      const {generateHTML} = await import('@tiptap/core'); // import here as it's needed only if user fails to provide place name.
      userPlaceNote = DOMPurify.sanitize(
        generateHTML(json, [StarterKit]), // docs: https://tiptap.dev/api/utilities/html#generate-html-from-json
        {ADD_ATTR: ['target']}, // see https://github.com/cure53/DOMPurify/issues/317#issuecomment-470429778
      ); // editor.getHTML() would include an empty <h2> element whose text content (apparently) cannot be modified...
    }

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
                  address: data.address,
                  'Google Maps place name': data.name, // to be used for constructing Directions URL
                  'Google Maps URL': data.url,
                  name: userPlaceName, // edited by user, not the one returned from Google Maps API server
                  note: userPlaceNote,
                },
                type: 'Feature',
              }
            : {
                id: data.id,
                properties: {
                  address: data.address, // cannot be omitted; otherwise deleted
                  'Google Maps URL': data.url, // cannot be omitted; otherwise deleted
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
        <Heading as="h1" data-editor id="editor-heading">
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
          <button data-save onClick={handleClickSave} type="submit">
            {buttonLabel.saveEdit}
          </button>
        </section>
      </HeaderEditor>
      <EditorContent editor={editor} />
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
