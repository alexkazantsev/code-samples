import 'package:auth_example/actions/actions.dart';
import 'package:auth_example/models/models.dart';
import 'package:redux/redux.dart';

final authReducer = combineReducers<Auth>([
  new TypedReducer<Auth, LoginRequest>(_onRequest),
  new TypedReducer<Auth, LogInSuccessful>(_onSuccess),
  new TypedReducer<Auth, LogInFail>(_onRequestFailed),
]);

Auth _onRequest(Auth auth, dynamic action) {
  return auth.copyWith(processing: true, error: null);
}

Auth _onSuccess(Auth auth, dynamic action) {
  print(action);
  return auth.copyWith(
      processing: false, token: action.auth.token, expires: action.auth.expires);
}

Auth _onRequestFailed(Auth auth, dynamic action) {
  return auth.copyWith(processing: false, error: action.error);
}
