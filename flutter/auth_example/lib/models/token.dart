import 'package:meta/meta.dart';

@immutable
class Token {
  final String token;
  final String expires;

  Token({this.token, this.expires});
}
