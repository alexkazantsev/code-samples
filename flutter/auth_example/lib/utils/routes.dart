library routes;

import 'package:auth_example/screens/screens.dart';
import 'package:flutter/material.dart';

class AppRoutes {
  static final home = '/home';
  static final String login = '/';
}

Map<String, WidgetBuilder> getRoutes(ctx, store) {
  return {'/': (BuildContext ctx) => new LoginScreen(store: store)};
}
