import 'dart:convert';

import 'package:auth_example/actions/actions.dart';
import 'package:auth_example/models/models.dart';
import 'package:auth_example/utils/utils.dart';
import 'package:http/http.dart' as http;
import 'package:redux/redux.dart';

List<Middleware<AppState>> createUserMiddleware(ctx) {
  final me = _createUserMiddleware(ctx);
  return [new TypedMiddleware<AppState, UserRequest>(me)];
}

Middleware<AppState> _createUserMiddleware(ctx) {
  return (Store store, dynamic action, NextDispatcher next) async {
    next(action);
    if (action is UserRequest) {
      final response = await http.get('${Config.API_URL}/user/me',
          headers: {'Authorization': 'Bearer ${store.state.auth.token}'});
      if (response.statusCode < 300) {
        store.dispatch(
            new UserSuccess(user: User.fromJson(json.decode(response.body))));
      } else {
        store.dispatch(new UserFail());
      }
    }
  };
}
