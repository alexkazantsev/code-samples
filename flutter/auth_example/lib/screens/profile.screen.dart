import 'package:auth_example/actions/actions.dart';
import 'package:auth_example/containers/containers.dart';
import 'package:auth_example/models/models.dart';
import 'package:auth_example/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:redux/redux.dart';

class ProfileScreen extends StatefulWidget {
  ProfileScreen({@required this.store}) : super(key: Keys.PROFILE_SCREEN);

  final Store<AppState> store;

  @override
  State<StatefulWidget> createState() => new ProfileScreenState();
}

class ProfileScreenState extends State<ProfileScreen> {
  @override
  void initState() {
    widget.store.dispatch(new UserRequest());
    super.initState();
  }

  void onLogoutPressed(BuildContext ctx) {
    widget.store.dispatch(new Logout());
    Navigator.of(ctx)
        .pushNamedAndRemoveUntil(Routes.LOGIN, (Route<dynamic> route) => false);
  }

  @override
  Widget build(BuildContext context) {
    return HeaderBuilder(title: 'Profile', childrenBefore: <Widget>[
      LogoutBuilder(onPress: () => onLogoutPressed(context))
    ], childrenAfter: <Widget>[
      Padding(
        padding: const EdgeInsets.only(bottom: 20.0),
        child: MainInfoBuilder(),
      ),
      InfoBuilder(),
    ]);
  }
}
