import 'package:meta/meta.dart';

@immutable
class User {
  final int id;
  final String firstName;
  final String lastName;
  final String email;
  final String gender;
  final String phone;
  final bool processing;

  User(
      {this.id,
      this.firstName,
      this.lastName,
      this.email,
      this.gender,
      this.phone,
      this.processing});

  User copyWith(
      {int id,
      String firstName,
      String lastName,
      String email,
      String gender,
      String prone,
      bool processing}) {
    return User(
      id: id ?? this.id,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      email: email ?? this.email,
      gender: gender ?? this.gender,
      phone: phone ?? this.phone,
      processing: processing ?? this.processing,
    );
  }

  factory User.clean() => User();

  factory User.fromJson(Map<String, dynamic> json) => User(
      id: json['id'],
      firstName: json['first_name'],
      lastName: json['last_name'],
      email: json['email'],
      gender: json['gender'],
      phone: json['phone']);
}
