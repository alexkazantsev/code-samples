import 'package:auth_example/models/models.dart';
import 'package:auth_example/reducers/combine-reducers.dart';
import 'package:auth_example/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';
import 'package:redux_logging/redux_logging.dart';

import 'middlewares/middlewares.dart';

void main() => runApp(MyApp());

final loggerMiddleware = LoggingMiddleware.printer();

class MyApp extends StatelessWidget {
  MyApp();

  @override
  Widget build(BuildContext context) {
    var store = Store<AppState>(appReducer,
        initialState: AppState(
            auth: Auth(processing: false), user: User(processing: true)),
        distinct: true,
        middleware: []
          ..addAll(createAuthMiddleware(context))
          ..addAll(createUserMiddleware(context))
          ..add(loggerMiddleware));

    return StoreProvider<AppState>(
        store: store,
        child: MaterialApp(
          title: 'Auth example',
          routes: getRoutes(context, store),
          initialRoute: Routes.LOGIN,
        ));
  }
}
