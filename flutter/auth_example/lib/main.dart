import 'package:auth_example/models/models.dart';
import 'package:auth_example/reducers/combine-reducers.dart';
import 'package:auth_example/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';
import 'package:redux_logging/redux_logging.dart';
import 'package:redux_thunk/redux_thunk.dart';

void main() => runApp(new MyApp());

final loggerMiddleware = new LoggingMiddleware.printer();

class MyApp extends StatelessWidget {
  final store = new Store(appReducer,
      initialState: new AppState(),
      distinct: true,
      middleware: []..add(thunkMiddleware)..add(loggerMiddleware));

  MyApp();

  @override
  Widget build(BuildContext context) => new StoreProvider(
      store: store,
      child: new MaterialApp(
        title: 'Auth example',
        theme: new ThemeData.light(),
        routes: getRoutes(context, store),
        initialRoute: AppRoutes.login,
      ));
}
