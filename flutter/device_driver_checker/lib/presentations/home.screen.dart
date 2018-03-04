import 'package:device_driver_checker/containers/devices-list.container.dart';
import 'package:device_driver_checker/utils/keys.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomeScreen extends StatelessWidget {
  HomeScreen() : super(key: Keys.HOME_SCREEN);

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          title: new Text('Device Driver Checker'),
        ),
//        body: new DevicesList(key: Keys.DEVICES_LIST_CONTAINER),
        floatingActionButton: new FloatingActionButton(
          key: Keys.ADD_TODO_FAB,
          onPressed: _increment,
          tooltip: 'Add new device',
          child: new Icon(Icons.add),
        ));
  }
}

_increment() async {
  SharedPreferences preferences = await SharedPreferences.getInstance();
  int counter = (preferences.getInt('counter') ?? 0) + 1;
  print('Pressed $counter times.');
  preferences.setInt('counter', counter);
}

//class DDCState extends State<HomeScreen> {
//  Future _prefs = SharedPreferences.getInstance();
//  @override
//  Widget build(BuildContext context) {
//    return new Scaffold(
//      appBar: new AppBar(title: const Text('Device Driver Checker'),),
//    );
//  }

//}
