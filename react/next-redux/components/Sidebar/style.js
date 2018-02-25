import styled from 'styled-components';

export const SidebarWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  background-color: rgba(0,168,67,1);
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 37px;
`;

export const Logo = styled.img`
  width: 64px;
  height: 64px;
`;

export const LogoTitle = styled.span`
  margin-top: 13px;
  font-size: 16px;
  color: #fff;
  text-align: center;
`;

export const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  vertical-align: center;
  align-items: center;
`;

export const SeparateLine = styled.div`
  background-color: rgba(255,255,255,0.2);
  height: 2px;
  width: 146px;
  margin-top: 41px;
`;

export const UserLogo = styled.img`
  border-radius: 50%;
  width: 64px;
  height: 64px;
  margin-top: 37px;
`;

export const UserName = styled.span`
  text-align: center;
  margin-top: 6px;
  font-size: 20px;
  color: rgba(255,255,255,1);
`;

export const Logout = styled.span`
  font-size: 16px;
  color: rgba(42,56,66,0.65);
  text-align: center;
  margin-top: 9px;
  cursor: pointer;
`;

