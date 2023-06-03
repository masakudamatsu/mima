import {useContext, useEffect, useState} from 'react';

import {NightModeContext} from 'src/wrappers/NightModeContext';

import {ImgLogo} from 'src/elements/ImgLogo';

// import PropTypes from 'prop-types';

export const Logo = () => {
  const [clientSideRendering, setClientSideRendering] = useState(false);
  useEffect(() => {
    setClientSideRendering(true);
  }, []);
  const nightMode = useContext(NightModeContext);
  const logoFilePath = nightMode
    ? '/logo-full-night.svg'
    : '/logo-full-day.svg';
  return <>{clientSideRendering && <ImgLogo src={logoFilePath} alt="" />}</>;
};

// Logo.propTypes = {};
