import 'package:auth_example/actions/actions.dart';
import 'package:auth_example/models/models.dart';
import 'package:redux/redux.dart';

final authReducer = combineReducers<Auth>([
  new TypedReducer<Auth, LoginRequest>(_onRequest),
  new TypedReducer<Auth, LogInFail>(_onRequestFailed),
]);

Auth _onRequest(Auth auth, action) {
  return auth.copyWith(processing: true);
}

Auth _onRequestFailed(Auth auth, action) {
  return auth.copyWith(processing: false);
}
