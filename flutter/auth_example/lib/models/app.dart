import 'package:meta/meta.dart';

import 'user.dart';
import 'token.dart';

@immutable
class AppState {
  final User user;
  final Token token;

  AppState({this.user, this.token});
}
