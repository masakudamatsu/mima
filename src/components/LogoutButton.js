import PropTypes from 'prop-types';
import {useRouter} from 'next/router';
import {buttonLabel} from 'src/utils/uiCopies';

export const LogoutButton = ({closeMenu}) => {
  const router = useRouter();
  const handleClick = async event => {
    closeMenu();
    try {
      await fetch('/api/logout', {
        method: 'POST',
      });
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={handleClick} type="button">
        {buttonLabel.logout}
      </button>
    </>
  );
};

LogoutButton.propTypes = {
  closeMenu: PropTypes.func,
};
