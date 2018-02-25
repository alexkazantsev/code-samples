import PropTypes from 'prop-types';

import { AddButton } from './components/AddButton';
import {
  HeaderWrap,
  PageTitle,
} from './style';


export const Header = ({ addAction }) => {
  return (
    <HeaderWrap>
      <PageTitle>My Ideas</PageTitle>
      <AddButton onClick={addAction} />
    </HeaderWrap>
  );
}

Header.propTypes = {
  addAction: PropTypes.func.isRequired,
};
