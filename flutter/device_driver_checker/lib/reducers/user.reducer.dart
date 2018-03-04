import 'package:redux/redux.dart';
import 'package:device_driver_checker/models/models.dart';
import 'package:device_driver_checker/actions/user.actions.dart';

final userReducer = combineTypedReducers<User>([
  new ReducerBinding<User, FillUserAction>(_fillUser),
]);

User _fillUser(User user, FillUserAction action) {
  return action.user;
}

