import 'dart:io';
import 'dart:async';

import 'package:device_driver_checker/utils/keys.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:device_driver_checker/utils/routes.dart';
import 'package:device_driver_checker/components/loading.component.dart';

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
//        timeout(new Duration(seconds: 5));
        Future timeout = new Future(() {});
        timeout.timeout(new Duration(seconds: 5), onTimeout: () {
          debugPrint('foo');
          setState(() {
            isLoading = false;
          });
          Navigator.of(context).pushNamed(AppRoutes.login);
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
          child: isLoading ? new Loading() : const Text('Loaded'),
        ),
        floatingActionButton: new FloatingActionButton(
          key: Keys.ADD_TODO_FAB,
          onPressed: () => debugPrint('PRESS'),
          tooltip: 'Add new device',
          child: new Icon(Icons.add),
        ));
  }
}
