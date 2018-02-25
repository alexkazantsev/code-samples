import styled from 'styled-components';

export const ListItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  &:hover {
    div:last-of-type div {
      opacity: 1;
      pointer-events: auto;
    }
  }
`;

export const SideWrapper = styled.div`
  flex: 1;
  display flex;
  flex-direction: row;
  justify-content: ${({ position }) => (position === 'left' ? 'left' : 'space-between')};
  align-items: center;
`;

export const TextWrapper = styled.span`
  font-size: ${({ small }) => (small ? '14px' : '16px')};
  font-weight: ${({ bold }) => (bold ? 800 : 400)};
  padding-left: ${({ hasPadding }) => (hasPadding ? '17px' : '0px')};
  width: ${props => (props.content ? 'auto' : '45px')};
  text-align: ${props => (props.content ? 'left' : 'center')};;
`;

export const ActionBtnsWrapper = styled.div`
  display: flex;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease-in-out;
`;

export const ActionBtnWrapper = styled.img`
  max-width: 100%;
  height: auto;
`;

export const BtnEdit = styled.div`
  width: 20px;
  margin-right: 20px;
  cursor: pointer;
`;

export const BtnDelete = styled.div`
  width: 20px;
  cursor: pointer;
`;
