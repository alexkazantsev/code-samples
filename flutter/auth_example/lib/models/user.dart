import 'package:meta/meta.dart';

@immutable
class User {
  final int id;
  final String firstName;
  final String lastName;
  final String email;
  final String gender;
  final String phone;
  final int experience;
  final String photo;
  final bool processing;

  User(
      {this.id,
      this.firstName,
      this.lastName,
      this.email,
      this.gender,
      this.phone,
      this.experience,
      this.photo,
      this.processing});

  User copyWith(
      {int id,
      String firstName,
      String lastName,
      String email,
      String gender,
      String phone,
      int experience,
      String photo,
      bool processing}) {
    return User(
      id: id ?? this.id,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      email: email ?? this.email,
      gender: gender ?? this.gender,
      phone: phone ?? this.phone,
      experience: experience ?? this.experience,
      photo: photo ?? this.photo,
      processing: processing ?? this.processing,
    );
  }

  factory User.clean() => User();

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
        id: json['id'],
        firstName: json['first_name'],
        lastName: json['last_name'],
        email: json['email'],
        gender: json['gender'],
        phone: json['phone'],
        experience: json['experience'],
        photo: json['photo']);
  }

  @override
  String toString() {
    return 'User{id: $id, firstName: $firstName, lastName: $lastName, email: $email, gender: $gender, phone: $phone, experience: $experience, photo: $photo, processing: $processing}';
  }
}
