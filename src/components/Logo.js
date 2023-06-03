import {useContext, useEffect, useState} from 'react';
import Image from 'next/image';
import logoDay from '../../public/logo-full-day.svg';
import logoNight from '../../public/logo-full-night.svg';

import {NightModeContext} from 'src/wrappers/NightModeContext';

// import PropTypes from 'prop-types';

export const Logo = () => {
  const [clientSideRendering, setClientSideRendering] = useState(false);
  useEffect(() => {
    setClientSideRendering(true);
  }, []);
  const nightMode = useContext(NightModeContext);
  const logoFilePath = nightMode ? logoNight : logoDay;
  return (
    clientSideRendering && (
      <div data-logo>
        <Image alt="" data-logo fill priority src={logoFilePath} />
      </div>
    )
  );
};

// Logo.propTypes = {};
