import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  width:  100%;
  height: 100vh;
  flex-shrink: 0;
`;

export const MainWrapper = styled.div`
  flex: 1;
  padding: 0 87px;
  overflow-y: auto;
`;

export const AuthContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MainFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 485px;
`;

export const PageWrapper = styled.div`
  width: 100%;
  height: calc(100% - 126px);
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;
  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #455E70;
    padding: 8px 0;
    font-size: 20px;
    color: #2A3842;
    transition: all 0.3s ease-in-out;
    &:focus {
      outline: none;
      border-bottom-color: #00A843;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus
    &:-webkit-autofill {
      -webkit-text-fill-color: #2A3842;
      -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    }
  }
`;

export const Button = styled.button`
  width: 150px;
  height: 40px;
  background-color: #00A843;
  border: 1px solid #00A843;
  font-size: 14px;
  color: #fff;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  &:hover {
    color: #00A843;
    background-color: #fff;
  } 
`;

export const InlineRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

export const NavLink = styled.a`
  font-size: 16px;
  color: #00A843;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  margin-left: 5px;
  &:hover {
    color: #015f27;
  }
`;

export const TextDescription = styled.span`
  font-size: 16px;
  color: #2A3842;
`;

export const FormTitle = styled.p`
  font-size: 40px;
  color: rgba(42,56,66,1);
  text-align: center;
  margin: 0 0 62px;
`;

export const IdeaListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const IdeaListHeaderWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
`;

export const IdeaListHeaderItem = styled.p`
  font-size: 14px;
  color: #2A3842;
  margin-right: 14.5%;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
`;

export const ModalWrapper = styled.div`
  padding: 0 30xp 0 25px;
  display: flex;
  flex-direction: column;
  width: 400px;
`;

export const ModalTitle = styled.span`
  color: rgba(42,56,66,1);
  text-align: center;
  font-size: 24px;
`;

export const ModalContent = styled.span`
  color: rgba(42,56,66,1);
  font-size: 16px;
  margin-top: 36px;
  text-align: center;
`;

export const ModalBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: middle;
  justify-content: space-around;
  margin-top: 86px;
`;

export const ModalBtn = styled.span`
  color: ${({ ok }) => ok ? 'rgba(0,168,67,1)' : 'rgba(42,56,66,1)'};
  font-size: 18px;
  cursor: pointer;
`;
