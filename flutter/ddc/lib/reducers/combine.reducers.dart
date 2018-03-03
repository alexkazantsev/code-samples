import 'package:ddc/models/models.dart';
import 'user.reducer.dart';

AppState appReducer(AppState state, action) {
  return new AppState(
    user: userReducer(state.user, action),
  );
}