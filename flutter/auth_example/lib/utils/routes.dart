library routes;

import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:auth_example/models/models.dart';
import 'package:auth_example/screens/screens.dart';

class AppRoutes {
  static final home = '/home';
  static final login = '/login';
}

Map<String, WidgetBuilder> getRoutes(ctx, store) {
  return {
    AppRoutes.login: (BuildContext ctx) =>
    new StoreBuilder<AppState>(
      builder: (ctx, store) {
        return new LoginScreen();
      },
    )
  };
}