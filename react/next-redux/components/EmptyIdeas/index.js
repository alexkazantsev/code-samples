import React from 'react';

import {
  EmptyIdeasWrapper,
  EmptyIdeasLogo,
  EmptyIdeasText,
} from './style';

export class EmptyIdeas extends React.Component {
  render() {
    return (
      <EmptyIdeasWrapper>
        <EmptyIdeasLogo src="/static/images/bulb.png" />
        <EmptyIdeasText>Got Ideas?</EmptyIdeasText>
      </EmptyIdeasWrapper>
    )
  }
}