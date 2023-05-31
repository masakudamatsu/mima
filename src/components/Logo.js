import {useContext} from 'react';

import {NightModeContext} from 'src/wrappers/NightModeContext';

import {ImgLogo} from 'src/elements/ImgLogo';
import {VisuallyHidden} from 'src/elements/VisuallyHidden';

// import PropTypes from 'prop-types';

export const Logo = () => {
  const nightMode = useContext(NightModeContext);
  const logoFilePath = nightMode
    ? '/logo-full-night.svg'
    : '/logo-full-day.svg';
  return (
    <>
      <VisuallyHidden as="h1">My Ideal Map</VisuallyHidden>
      <ImgLogo src={logoFilePath} alt="" />
    </>
  );
};

// Logo.propTypes = {};
