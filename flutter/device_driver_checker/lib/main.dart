import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';

import 'models/models.dart';
import 'presentations/home.screen.dart';
import 'reducers/combine.reducers.dart';
import 'utils/routes.dart';

void main() => runApp(new DDCApp());

class DDCApp extends StatelessWidget {
  final store = new Store(appReducer, // ignore: strong_mode_uses_dynamic_as_bottom
      initialState:
          new AppState.loading());

  DDCApp();

  @override
  Widget build(BuildContext context) {
    return new StoreProvider(
        store: store,
        child: new MaterialApp(
          title: 'Device Driver Checker',
          theme: new ThemeData(
            primarySwatch: Colors.blue,
          ),
          routes: {
            AppRoutes.home: (context) {
              return new StoreBuilder<AppState>(
                onInit: (store) => store.state,
                builder: (context, store) => new HomeScreen(),
              );
            }
          },
        ));
  }
}


