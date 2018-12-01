library routes;

import 'package:auth_example/screens/screens.dart';
import 'package:flutter/material.dart';

Map<String, WidgetBuilder> getRoutes(ctx, store) {
  return {
    '/': (BuildContext ctx) => new LoginScreen(store: store),
    '/profile': (BuildContext ctx) => new ProfileScreen(store: store),
  };
}
