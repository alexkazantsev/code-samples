import 'package:auth_example/actions/actions.dart';
import 'package:auth_example/models/models.dart';
import 'package:redux/redux.dart';

final authReducer = combineReducers<Auth>([
  TypedReducer<Auth, LoginRequest>(_onRequest),
  TypedReducer<Auth, LoginSuccess>(_onSuccess),
  TypedReducer<Auth, LoginFail>(_onRequestFailed),
  TypedReducer<Auth, Logout>(_onLogout),
]);

Auth _onRequest(Auth auth, dynamic action) {
  return auth.copyWith(processing: true, error: null);
}

Auth _onSuccess(Auth auth, dynamic action) {
  return auth.copyWith(
      processing: false,
      token: action.auth.token,
      expires: action.auth.expires);
}

Auth _onRequestFailed(Auth auth, dynamic action) {
  return auth.copyWith(processing: false, error: action.error);
}

Auth _onLogout(Auth auth, dynamic action) {
  return auth.copyWith(token: null, expires: null);
}
