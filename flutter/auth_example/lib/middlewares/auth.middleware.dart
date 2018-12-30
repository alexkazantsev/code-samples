import 'dart:convert';

import 'package:auth_example/actions/actions.dart';
import 'package:auth_example/models/models.dart';
import 'package:auth_example/utils/utils.dart';
import 'package:http/http.dart' as http;
import 'package:redux/redux.dart';

List<Middleware<AppState>> createAuthMiddleware(context) {
  final login = _createLoginMiddleware(context);
  return [new TypedMiddleware<AppState, LoginRequest>(login)];
}

Middleware<AppState> _createLoginMiddleware(context) {
  return (Store store, dynamic action, NextDispatcher next) async {
    next(action);
    if (action is LoginRequest) {
      final response = await http.post('${Config.API_URL}/auth/login',
          body: action.data.toJson());
      if (response.statusCode < 300) {
        store.dispatch(
            new LoginSuccess(auth: Auth.fromJson(json.decode(response.body))));
        if (action.onSuccess is Function) action.onSuccess();
      } else {
        store.dispatch(new LoginFail('Email or password is incorrect'));
      }
    }
  };
}
