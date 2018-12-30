library routes;

import 'package:auth_example/screens/screens.dart';
import 'package:flutter/material.dart';

class Routes {
  static const LOGIN = '/';
  static const PROFILE = '/profile';
}

Map<String, WidgetBuilder> getRoutes(ctx, store) {
  return {
    Routes.LOGIN: (BuildContext ctx) => LoginScreen(store: store),
    Routes.PROFILE: (BuildContext ctx) => ProfileScreen(store: store),
  };
}
