import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';

import 'package:auth_example/models/models.dart';
import 'package:auth_example/reducers/combine-reducers.dart';
import 'package:auth_example/screens/screens.dart';
import 'package:auth_example/utils/utils.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  final store =
      new Store(appReducer, // ignore: strong_mode_uses_dynamic_as_bottom
          initialState: new AppState.loading());

  MyApp();

  @override
  Widget build(BuildContext context) => new StoreProvider(
      store: store,
      child: new MaterialApp(
        title: 'Auth example',
        theme: new ThemeData.light(),
        routes: {
          AppRoutes.login: (context) => new StoreBuilder<AppState>(
              builder: (context, store) => new LoginScreen())
        },
      ));
}
