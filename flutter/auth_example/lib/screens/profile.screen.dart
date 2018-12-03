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
        .pushNamedAndRemoveUntil('/', (Route<dynamic> route) => false);
  }

  @override
  Widget build(BuildContext ctx) {
    final topPadding = MediaQuery.of(ctx).padding.top;

    return new Scaffold(
      body: new Container(
          height: 303.0,
          decoration:
              new BoxDecoration(color: Colors.blue, boxShadow: <BoxShadow>[
            new BoxShadow(
                spreadRadius: 2.0,
                blurRadius: 4.0,
                offset: new Offset(0.0, 1.0),
                color: Colors.black38),
          ]),
          child: new Stack(
            fit: StackFit.expand,
            children: <Widget>[
              new Container(
                height: 303.0,
                decoration: new BoxDecoration(
                  gradient: new LinearGradient(colors: <Color>[
                    //7928D1
                    const Color(0xFF7928D1), const Color(0xFF9A4DFF)
                  ], stops: <double>[
                    0.3,
                    0.5
                  ], begin: Alignment.topRight, end: Alignment.bottomLeft),
                ),
              ),
              new Padding(
                padding: new EdgeInsets.only(
                    top: topPadding, left: 15.0, right: 15.0, bottom: 20.0),
                child: new Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    new LogoutBuilder(onPress: () => onLogoutPressed(ctx)),
                    new Padding(
                      padding: const EdgeInsets.only(bottom: 15.0),
                      child: new Text("Profile",
                          style: new TextStyle(
                              fontFamily: Fonts.TIMEBURNER,
                              fontWeight: FontWeight.w700,
                              color: Colors.white,
                              fontSize: 40.0,
                              letterSpacing: 1.0)),
                    ),
                    new Padding(
                      padding: const EdgeInsets.only(bottom: 20.0),
                      child: new MainInfoBuilder(),
                    ),
                    new InfoBuilder(),
                  ],
                ),
              )
            ],
          )),
    );
  }
}
