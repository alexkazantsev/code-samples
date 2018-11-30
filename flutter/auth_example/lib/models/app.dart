import 'package:meta/meta.dart';

import 'user.dart';
import 'auth.dart';

@immutable
class AppState {
  final User user;
  final Auth auth;

  AppState({this.user, this.auth});
}
