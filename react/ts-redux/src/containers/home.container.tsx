import * as React from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from './../utils';
// import { HomeActions } from './../actions';
// import { HomeState, RootState, Dispatch } from './../reducers';
// import { Dispatch } from 'react-redux';

// interface Props {
//   home: HomeState;
//   actions: any;
// }

// @connect(
//   (state: RootState) => ({ home: state.home }),
//   (dispatch: Dispatch) => ({
//     actions: bindActionCreators({
//       test: HomeActions.test
//     }, dispatch),
//   })
// )
@connect()
export class HomeContainer extends React.Component<{}, {}> {
  render() {
    console.log(this.props);
    return <div>Foo</div>;
  }
}
