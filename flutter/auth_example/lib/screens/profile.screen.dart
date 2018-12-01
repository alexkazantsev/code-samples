import 'package:auth_example/actions/actions.dart';
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
          height: 490.0,
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
                height: 490.0,
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
              new CustomPaint(
                painter: new HeaderGradientPainter(),
              ),
              new Padding(
                padding: new EdgeInsets.only(
                    top: topPadding, left: 15.0, right: 15.0, bottom: 20.0),
                child: new Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    _buildBellIcon(),
                    new Padding(
                      padding: const EdgeInsets.only(bottom: 15.0),
                      child: _buildTitle(),
                    ),
                    new Padding(
                      padding: const EdgeInsets.only(bottom: 20.0),
                      child: _buildAvatar(),
                    ),
                  ],
                ),
              )
            ],
          )),
    );
  }
}

class HeaderGradientPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // TODO: paint background radial gradient
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}

Widget _buildTitle() {
  return new Text("Profile",
      style: new TextStyle(
          fontFamily: 'Timeburner',
          fontWeight: FontWeight.w700,
          color: Colors.white,
          fontSize: 40.0,
          letterSpacing: 1.0));
}

Widget _buildBellIcon() {
  return new Row(
    mainAxisAlignment: MainAxisAlignment.end,
    crossAxisAlignment: CrossAxisAlignment.start,
    children: <Widget>[
      new IconButton(
          icon: new Icon(
            LineAwesomeIcons.bell, color: Colors.white, size: 30.0,),
          onPressed: () {}),
    ],
  );
}

Widget _buildAvatar() {
  final mainTextStyle = new TextStyle(fontFamily: 'Timeburner',
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
      new Padding(padding: const EdgeInsets.only(right: 20.0)),
      new Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          new Text('Some full name', style: mainTextStyle),
          new Text('some@email.com', style: subTextStyle),
        ],
      ),
    ],
  );
}

