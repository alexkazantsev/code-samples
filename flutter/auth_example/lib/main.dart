import 'package:auth_example/models/models.dart';
import 'package:auth_example/reducers/combine-reducers.dart';
import 'package:auth_example/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';
import 'package:redux_logging/redux_logging.dart';

import 'middlewares/middlewares.dart';

void main() => runApp(new MyApp());

final loggerMiddleware = new LoggingMiddleware.printer();

class MyApp extends StatelessWidget {
  MyApp();

  @override
  Widget build(BuildContext context) {
    var store = new Store<AppState>(appReducer,
        initialState: new AppState(
            auth: new Auth(processing: false),
            user: new User(processing: true)),
        distinct: true,
        middleware: []
          ..addAll(createAuthMiddleware(context))
          ..addAll(createUserMiddleware(context))
          ..add(loggerMiddleware));

    return new StoreProvider<AppState>(
        store: store,
        child: new MaterialApp(
          title: 'Auth example',
          routes: getRoutes(context, store),
          initialRoute: Routes.LOGIN,
        ));
  }
}
