import {useEffect, useRef, useState} from 'react';
// import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';

import {CloseButton} from './CloseButton';
import {Button} from 'src/elements/Button';
import {SpanRipple} from 'src/elements/SpanRipple';
import {SvgCloud} from 'src/elements/SvgCloud';

import {DivSearchBackground} from 'src/elements/DivSearchBackground';
import {ParagraphLoading} from 'src/elements/ParagraphLoading';

import {useOnClickOutside} from 'src/hooks/useOnClickOutside';
import {useOnEscKeyDown} from 'src/hooks/useOnEscKeyDown';

import {buttonLabel} from 'src/utils/uiCopies';

import dynamic from 'next/dynamic';
const importSearchBox = () =>
  import('src/components/SearchBox').then(module => module.SearchBox);
const SearchBox = dynamic(importSearchBox, {
  loading: () => (
    <ParagraphLoading aria-live="polite" role="status">
      Loading search box...
    </ParagraphLoading>
  ),
});

export const Search = () => {
  const [ui, setUi] = useState({
    searchButton: 'open',
    searchBox: 'closed',
  });

  // Open search box
  const handleClickSearchButton = () => {
    setUi({
      searchButton: 'closing',
      searchBox: 'opening',
    });
  };

  // Close search box by pressing close button
  const handleClickCloseButton = ({
    rippleDiameter,
    ripplePositionLeft,
    ripplePositionTop,
  } = {}) => {
    closeButtonPressed.current = true;
    setUi({
      searchButton: 'opening',
      searchBox: 'closing',
      rippleDiameter,
      ripplePositionLeft,
      ripplePositionTop,
    });
  };
  // Close search box by selecting an autocomplete suggestion
  const closeSearchBox = () => {
    closeButtonPressed.current = false;
    setUi({
      searchButton: 'opening',
      searchBox: 'closing',
    });
  };
  // Remove from DOM after transition animation is over
  const handleAnimationEnd = () => {
    if (ui.searchButton === 'closing') {
      setUi({
        searchButton: 'closed',
        searchBox: 'open',
      });
    }
    if (ui.searchBox === 'closing') {
      setUi({
        searchButton: 'open',
        searchBox: 'closed',
      });
    }
  };

  // close with Esc key
  useOnEscKeyDown({
    state: ui.searchBox === 'open',
    handler: handleClickCloseButton,
  });

  // close by clicking outside
  const popup = useRef(null);
  useOnClickOutside(popup, handleClickCloseButton);

  // Focus the search button after closing the searchbox
  const buttonElement = useRef();
  const closeButtonPressed = useRef(false);
  useEffect(() => {
    if (ui.searchBox === 'closed') {
      if (closeButtonPressed.current === true) {
        buttonElement.current.focus();
      }
    }
  });

  return (
    <form role="search" onAnimationEnd={handleAnimationEnd}>
      {ui.searchButton !== 'closed' ? (
        <Button
          aria-expanded="false"
          aria-label={buttonLabel.search}
          data-closing={ui.searchButton === 'closing'}
          data-position="top-right"
          data-testid="search-button"
          onClick={handleClickSearchButton}
          onFocus={importSearchBox}
          onMouseEnter={importSearchBox}
          ref={buttonElement}
          type="button"
        >
          <SvgCloud icon="search" />
        </Button>
      ) : null}
      {ui.searchBox !== 'closed' ? (
        <FocusLock>
          <DivSearchBackground.Wrapper
            data-closing={ui.searchBox === 'closing'}
          >
            <DivSearchBackground
              data-closing={ui.searchBox === 'closing'}
              data-testid="div-search-background"
              ref={popup}
            >
              <CloseButton
                ariaExpanded="true"
                ariaLabel={buttonLabel.closeSearchbox}
                handleClick={handleClickCloseButton}
                testId="searchbox-last-focusable-element" // to test focus management
              />
              <SearchBox closeSearchBox={closeSearchBox} id="searchbox" />
            </DivSearchBackground>
            {ui.searchBox === 'closing' ? (
              <SpanRipple
                id="ripple"
                style={{
                  height: ui.rippleDiameter,
                  left: ui.ripplePositionLeft,
                  top: ui.ripplePositionTop,
                  width: ui.rippleDiameter,
                }}
              />
            ) : null}
          </DivSearchBackground.Wrapper>
        </FocusLock>
      ) : null}
    </form>
  );
};

// Search.propTypes = {};
