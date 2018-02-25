import styled from 'styled-components';

export const IdeaItem = styled.form`
  display: flex;
  align-items: flex-end;
`;

export const IdeaFiledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: ${props => (props.content ? '50px' : '20px')};
  flex-grow: ${props => (props.content ? '1' : 0)};
  max-width: ${props => (props.content ? '50%' : 'auto')};
  & > input[name="content"] {
    width: 100%;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid rgba(42,56,66,0.50);
    margin-left: 25px;
    outline: none;
    font-size: 16px;
    color: #2A3842;
    &:focus {
      outline: none;
    };
  }
`;

export const IdeaSelectFiledWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const IdeaFiledLabel = styled.label`
  font-size: 14px;
  color: #2A3842;
  margin-bottom: 20px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
`;

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const BtnDone = styled.div`
  max-width: 19px;
  margin-right: 20px;
`;

export const BtnClose = styled.div`
  max-width: 16px;
`;
