import 'package:auth_example/models/models.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';

class InfoBuilder extends StatelessWidget {
  InfoBuilder({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, _ViewModel>(
      distinct: true,
      converter: _ViewModel.fromStore,
      builder: (_, vm) {
        return new Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            _buildFollowerStat("Experience", vm.experience),
            _buildVerticalDivider(),
            _buildFollowerStat("Gender", vm.gender),
            _buildVerticalDivider(),
            _buildFollowerStat("Phone", vm.phone),
          ],
        );
      }
    );
  }
}

class _ViewModel {
  final String experience;
  final String gender;
  final String phone;

  static const LOADING = 'Loading...';

  _ViewModel(
      {@required this.experience, @required this.gender, @required this.phone});

  static _ViewModel fromStore(Store<AppState> store) {
    var processing = store.state.user.processing;
    var experience = store.state.user.experience;
    var gender = store.state.user.gender;
    var phone = store.state.user.phone;

    return _ViewModel(
      experience: processing ? _ViewModel.LOADING : '$experience years',
      gender: processing ? _ViewModel.LOADING : gender,
      phone: processing ? _ViewModel.LOADING : phone,
    );
  }

  @override
  String toString() {
    return '_ViewModel{experience: $experience, gender: $gender, phone: $phone}';
  }
}

Widget _buildVerticalDivider() {
  return new Container(
    height: 30.0,
    width: 1.0,
    color: Colors.white30,
    margin: const EdgeInsets.only(left: 10.0, right: 10.0),
  );
}

Widget _buildFollowerStat(String title, String value) {
  final titleStyle = new TextStyle(
      fontSize: 16.0, fontFamily: 'Timeburner', color: Colors.white);
  final valueStyle = new TextStyle(
      fontFamily: 'Timeburner',
      fontSize: 18.0,
      fontWeight: FontWeight.w700,
      color: Colors.white);
  return new Column(
    mainAxisAlignment: MainAxisAlignment.center,
    crossAxisAlignment: CrossAxisAlignment.center,
    children: <Widget>[
      new Text(title, style: titleStyle),
      new Text(value, style: valueStyle),
    ],
  );
}
