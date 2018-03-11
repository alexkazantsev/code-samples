import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from './../utils';
import { homeActions } from './../actions';
import { HomeState, RootState, Dispatch } from './../reducers';

interface Props {
  home: HomeState;
  actions: any;
}

@connect(
  (state: RootState) => ({ home: state.home }),
  (dispatch: Dispatch) => ({
    actions: bindActionCreators({ ...homeActions }, dispatch),
  })
)
export class HomeContainer extends React.Component<Props, {}> {

  componentDidMount() {
    this.props.actions.test();
  }

  render() {
    return <div>Foakbgsgo</div>;
  }
}
