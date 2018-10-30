import 'package:auth_example/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:validate/validate.dart';

class LoginScreen extends StatefulWidget {
  LoginScreen() : super(key: Keys.LOGIN_SCREEN);

  State<StatefulWidget> createState() => new LoginScreenState();
}

class _LoginData {
  String email = '';
  String password = '';
}

class LoginScreenState extends State<LoginScreen> {
  final GlobalKey<FormState> _formKey = new GlobalKey<FormState>();

  _LoginData _data = new _LoginData();

  String _validateEmail(String value) {
    try {
      Validate.isEmail(value);
    } catch (e) {
      return 'The E-mail Address must be a valid email address.';
    }
    return null;
  }

  String _validatePassword(String value) {
    if (value.length < 8) {
      return 'The Password must be at least 8 characters.';
    }

    return null;
  }

  void submit() {
    if (this._formKey.currentState.validate()) {
      this._formKey.currentState.save();

      print('Printing the login data.');
      print('Email: ${_data.email}');
      print('Password: ${_data.password}');
    }
  }

  @override
  Widget build(BuildContext context) => new Scaffold(
      appBar: new AppBar(
        title: new Text('Login'),
      ),
      body: new Container(
          padding: new EdgeInsets.all(20.0),
          child: new Form(
            key: this._formKey,
            child: new ListView(
              children: <Widget>[
                new TextFormField(
                  keyboardType: TextInputType.emailAddress,
                  decoration: new InputDecoration(
                      hintText: 'you@example.com', labelText: 'E-mail Address'),
                  onSaved: (String value) => this._data.email = value,
                  validator: this._validateEmail,
                ),
                new TextFormField(
                  obscureText: true, // Use secure text for passwords.
                  decoration: new InputDecoration(
                      hintText: 'Password', labelText: 'Enter your password'),
                  onSaved: (String value) => this._data.password = value,
                  validator: this._validatePassword,
                ),
                new Container(
                  width: MediaQuery.of(context).size.width,
                  child: new RaisedButton(
                    child: new Text(
                      'Login',
                      style: new TextStyle(color: Colors.white),
                    ),
                    onPressed: () => this.submit(),
                    color: Colors.blue,
                  ),
                  margin: new EdgeInsets.only(top: 20.0),
                )
              ],
            ),
          )));
}
