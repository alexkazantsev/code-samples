import 'package:auth_example/models/models.dart';
import 'package:auth_example/utils/utils.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';

class MainInfoBuilder extends StatelessWidget {
  MainInfoBuilder({Key key}) : super(key: Keys.MAIN_INFO_BUILDER_CONTAINER);

  @override
  Widget build(BuildContext context) {
    return StoreConnector<AppState, _ViewModel>(
      distinct: true,
      converter: _ViewModel.fromStore,
      builder: (_, vm) {
        print(vm.toString());
        final mainTextStyle = new TextStyle(
            fontFamily: 'Timeburner',
            color: Colors.white,
            fontWeight: FontWeight.w700,
            fontSize: 20.0);
        final subTextStyle = new TextStyle(
            fontFamily: 'Timeburner',
            fontSize: 16.0,
            color: Colors.white70,
            fontWeight: FontWeight.w700);

        return new Row(
          children: <Widget>[
            new Container(
              width: 70.0,
              height: 60.0,
              decoration: new BoxDecoration(
                image: new DecorationImage(
                    image: new NetworkImage(vm.photo), fit: BoxFit.cover),
                borderRadius: new BorderRadius.all(new Radius.circular(20.0)),
              ),
            ),
            new Padding(padding: const EdgeInsets.only(right: 20.0)),
            new Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                new Text(vm.fullName, style: mainTextStyle),
                new Text(vm.email, style: subTextStyle),
              ],
            ),
          ],
        );
      },
    );
  }
}

class _ViewModel {
  final String fullName;
  final String email;
  final String photo;

  static const LOADING = 'Loading...';
  static const DEFAULT_PHOTO =
      'https://alexisvt.gallerycdn.vsassets.io/extensions/alexisvt/flutter-snippets/0.0.2/1529817162825/Microsoft.VisualStudio.Services.Icons.Default';

  _ViewModel(
      {@required this.fullName, @required this.email, @required this.photo});

  static _ViewModel fromStore(Store<AppState> store) {
    var processing = store.state.user.processing;
    var firstName = store.state.user.firstName;
    var lastName = store.state.user.lastName;
    var email = store.state.user.email;
    var photo = store.state.user.photo;

    return _ViewModel(
      fullName: processing ? LOADING : '$lastName $firstName',
      email: processing ? LOADING : email,
      photo: [null, ""].contains(photo) ? DEFAULT_PHOTO : photo,
    );
  }

  @override
  String toString() {
    return '_ViewModel{fullName: $fullName, email: $email, photo: $photo}';
  }
}
