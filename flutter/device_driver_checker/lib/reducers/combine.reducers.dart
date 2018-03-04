import 'package:device_driver_checker/models/models.dart';
import 'user.reducer.dart';

AppState appReducer(AppState state, action) {
  return new AppState(
    user: userReducer(state.user, action),
  );
}