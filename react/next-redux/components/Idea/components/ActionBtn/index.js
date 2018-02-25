import PropTypes from 'prop-types';
import { ActionBtnWrapper } from './style';

export const ActionBtn = ({ onClick, src }) => {
  return <ActionBtnWrapper src={src} onClick={onClick} />
}

ActionBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};