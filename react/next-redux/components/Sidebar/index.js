import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';

import { logout } from './../../actions/auth.actions';

import {
  SidebarWrap,
  LogoWrapper,
  Logo,
  LogoTitle,
  SeparateLine,
  UserProfile,
  UserLogo,
  UserName,
  Logout,
} from './style';

@connect(
  state => ({ user: state.user, isAuth: state.auth.isAuth }),
  dispatch => ({ actions: bindActionCreators({ logout }, dispatch) }),
)
export class Sidebar extends React.Component {

  onLogoutClick = () => this.props.actions.logout(this.onLogoutSuccess);
  onLogoutSuccess = () => Router.push('/login');

  render() {
    const { isAuth, user } = this.props;
    return (
      <SidebarWrap>
        <LogoWrapper>
          <Logo src="/static/images/IdeaPool_icon.png" />
        </LogoWrapper>
        <LogoTitle>The Idea Pool</LogoTitle>
        {isAuth &&
          (<UserProfile>
            <SeparateLine></SeparateLine>
            <UserLogo src={user.avatar_url} />
            <UserName>{user.name}</UserName>
            <Logout onClick={this.onLogoutClick}>Log out</Logout>
          </UserProfile>)
        }
      </SidebarWrap>
    )
  }
}
