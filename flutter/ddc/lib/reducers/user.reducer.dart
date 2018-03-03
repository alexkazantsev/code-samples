import 'package:redux/redux.dart';
import 'package:ddc/models/models.dart';
import 'package:ddc/actions/user.actions.dart';

final userReducer = combineTypedReducers<User>([
  new ReducerBinding<User, FillUserAction>(_fillUser),
]);

User _fillUser(User user, FillUserAction action) {
  return action.user;
}

