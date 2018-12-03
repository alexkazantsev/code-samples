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
      id: action.user.id,
      firstName: action.user.firstName,
      lastName: action.user.lastName,
      email: action.user.email,
      gender: action.user.gender,
      phone: action.user.phone,
      photo: action.user.photo,
      experience: action.user.experience,
  );
}

User _onRequestFailed(User user, dynamic action) {
  return user.copyWith(processing: false);
}

User _clearUser(User user, dynamic action) {
  return User.clean();
}
