import 'dart:io';

import 'package:device_driver_checker/utils/keys.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomeScreen extends StatefulWidget {
  HomeScreen() : super(key: Keys.HOME_SCREEN);

  @override
  State<StatefulWidget> createState() => new HomeScreenState();
}

class HomeScreenState extends State<HomeScreen> {
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    /** CHECK IF USER HAS A TOKEN AND VERIFY IT */
    (() async {
      final SharedPreferences state = await SharedPreferences.getInstance();
      final String key = state.getString('token');
      if (key == null) {
        /** MOVE TO LOGIN SCREEN */
        debugPrint('key is NULL');
        sleep(new Duration(seconds: 5));
        setState(() {
          isLoading = false;
        });
      }
    })();
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          title: const Text('Device Driver Checker'),
        ),
        body: new Center(
          child: isLoading ? const Text('Loading...') : const Text('Loaded'),
        ),
        floatingActionButton: new FloatingActionButton(
          key: Keys.ADD_TODO_FAB,
          onPressed: () => debugPrint('PRESS'),
          tooltip: 'Add new device',
          child: new Icon(Icons.add),
        ));
  }
}
