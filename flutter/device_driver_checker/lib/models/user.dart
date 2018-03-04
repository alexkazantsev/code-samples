import 'package:meta/meta.dart';


@immutable
class User {

  final int id;
  final String first_name; // ignore: non_constant_identifier_names
  final String last_name; // ignore: non_constant_identifier_names
  final String email;
  final bool is_admin; // ignore: non_constant_identifier_names

  User(this.id, this.first_name, this.last_name, this.email, this.is_admin);

  @override
  String toString() {
    return 'User{id: $id, first_name: $first_name, last_name: $last_name}';
  }

}