import 'package:ddc/containers/devices-list.container.dart';
import 'package:ddc/utils/keys.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  HomeScreen() : super(key: Keys.HOME_SCREEN);

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          title: new Text('Device Driver Checker'),
        ),
        body: new DevicesList(key: Keys.DEVICES_LIST_CONTAINER),
        floatingActionButton: new FloatingActionButton(
          key: Keys.ADD_TODO_FAB,
          onPressed: () => debugPrint('ON PRESS'),
          tooltip: 'Add new device',
          child: new Icon(Icons.add),
        ));
  }
}
