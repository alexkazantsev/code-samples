import 'package:auth_example/actions/actions.dart';
import 'package:auth_example/models/models.dart';
import 'package:redux/redux.dart';

final userReducer = combineReducers<User>([
  new TypedReducer<User, UserRequest>(_onRequest),
  new TypedReducer<User, UserSuccess>(_onSuccess),
  new TypedReducer<User, UserFail>(_onRequestFailed),
  new TypedReducer<User, Logout>(_clearUser),
]);

User _onRequest(User user, dynamic action) {
  return user.copyWith(processing: true);
}

User _onSuccess(User user, UserSuccess action) {
  return user.copyWith(
      processing: false,
      firstName: action.user.firstName,
      lastName: action.user.lastName,
      email: action.user.email,
      gender: action.user.gender,
      prone: action.user.phone);
}

User _onRequestFailed(User user, dynamic action) {
  return user.copyWith(processing: false);
}

User _clearUser(User user, dynamic action) {
  return User.clean();
}
