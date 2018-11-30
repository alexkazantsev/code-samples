import 'package:auth_example/models/models.dart';
import 'package:flutter/foundation.dart';

class Login {
  Login();
}

class LoginSuccessful {
  final Token token;

  LoginSuccessful({@required this.token});

  @override
  String toString() {
    return 'Login{user: $token}';
  }
}
