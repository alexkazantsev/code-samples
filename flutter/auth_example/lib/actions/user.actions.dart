import 'package:auth_example/models/models.dart';
import 'package:flutter/foundation.dart';

class UserRequest {}

class UserSuccess {
  @required
  final User user;

  UserSuccess({this.user});
}

class UserFail {}
