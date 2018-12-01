import 'package:auth_example/models/models.dart';
import 'package:flutter/foundation.dart';

typedef void VoidCallback();
typedef void ErrorCallback(error);

class LoginData {
  String email = '';
  String password = '';

  LoginData({email, password});

  Map<String, dynamic> toJson() => {'email': email, 'password': password};
}

class LoginResponse {
  @required
  final String token;

  @required
  final String expires;

  LoginResponse({this.token, this.expires});

  factory LoginResponse.fromJson(Map<String, dynamic> json) =>
      LoginResponse(token: json['access_token'], expires: json['expires_in']);
}

class LoginRequest {
  @required
  LoginData data;

  VoidCallback onSuccess;
  ErrorCallback onError;

  LoginRequest({this.data, this.onSuccess, this.onError});
}

class LoginSuccess {
  final Auth auth;

  LoginSuccess({@required this.auth});

  @override
  String toString() {
    return 'Login{user: $auth}';
  }
}

class LoginFail {
  @required
  final String error;

  LoginFail(this.error);

  @override
  String toString() {
    return 'Login{There was an error logging in: $error}';
  }
}

class Logout {}
