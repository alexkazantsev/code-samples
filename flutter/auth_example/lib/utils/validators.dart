import 'package:validate/validate.dart';

class Validators {
  static bool isEmail(String value) {
    try {
      Validate.isEmail(value);
    } catch (e) {
      return false;
    }
    return true;
  }

  static bool isPassword(String value) {
    if (value.length < 8) {
      return false;
    }

    return true;
  }
}