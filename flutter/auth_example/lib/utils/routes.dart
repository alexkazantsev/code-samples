library routes;

import 'package:auth_example/screens/screens.dart';
import 'package:flutter/material.dart';

class Routes {
  static const LOGIN = '/';
  static const PROFILE = '/profile';
}

Map<String, WidgetBuilder> getRoutes(ctx, store) {
  return {
    Routes.LOGIN: (BuildContext ctx) => new LoginScreen(store: store),
    Routes.PROFILE: (BuildContext ctx) => new ProfileScreen(store: store),
  };
}
