import 'package:auth_example/models/models.dart';

import 'auth.reducer.dart';
import 'user.reducer.dart';

AppState appReducer(AppState state, dynamic action) => AppState(
    auth: authReducer(state.auth, action),
    user: userReducer(state.user, action));
