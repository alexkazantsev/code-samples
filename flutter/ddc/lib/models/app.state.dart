import 'package:meta/meta.dart';
import 'user.dart';

@immutable
class AppState {
  final User user;

  AppState({this.user});

  factory AppState.loading() => new AppState();
}