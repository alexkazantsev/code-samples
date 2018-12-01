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
  Widget build(BuildContext ctx) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Profile'),
      ),
      body: new Container(),
    );
  }
}
