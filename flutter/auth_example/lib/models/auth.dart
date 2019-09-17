import 'package:meta/meta.dart';

@immutable
class Auth {
  final String token;
  final String expires;
  final bool processing;
  final String error;

  Auth({this.token, this.expires, this.processing, this.error});

  Auth copyWith({String token, String expires, bool processing, String error}) {
    return Auth(
      token: token ?? this.token,
      expires: expires ?? this.expires,
      processing: processing ?? this.processing,
      error: error ?? this.error,
    );
  }

  factory Auth.fromJson(Map<String, dynamic> json) =>
      Auth(token: json['access_token'], expires: json['expires_in']);
}
