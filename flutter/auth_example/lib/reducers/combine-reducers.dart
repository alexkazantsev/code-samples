import 'package:auth_example/models/models.dart';

import 'auth-reducer.dart';

AppState appReducer(AppState state, dynamic action) =>
    new AppState(auth: authReducer(state.auth, action), user: null);
