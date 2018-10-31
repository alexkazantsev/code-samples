import 'dart:convert';

import 'package:auth_example/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class LoginScreen extends StatefulWidget {
  LoginScreen() : super(key: Keys.LOGIN_SCREEN);

  @override
  State<StatefulWidget> createState() => new LoginScreenState();
}

class _LoginResponse {
  final String token;
  final String expires;

  _LoginResponse({this.token, this.expires});

  factory _LoginResponse.fromJson(Map<String, dynamic> json) =>
      _LoginResponse(token: json['access_token'], expires: json['expires_in']);
}

Future<_LoginResponse> _loginRequest(_LoginData data) async {
  final response = await http.post('https://cms.incode-it.com/auth/login',
      body: data.toJson());

  if (response.statusCode < 300) {
    return _LoginResponse.fromJson(json.decode(response.body));
  } else {
    throw Exception(response.body);
  }
}

class _LoginData {
  String email = '';
  String password = '';

  _LoginData({email, password});

  Map<String, dynamic> toJson() => {'email': email, 'password': password};
}

class LoginScreenState extends State<LoginScreen> {
  final GlobalKey<FormState> _formKey = new GlobalKey<FormState>();
  final String _emailErrorText =
      'The E-mail Address must be a valid email address.';
  final String _passwordErrorText =
      'The Password must be at least 8 characters.';

  _LoginData _data;
  bool processing;
  String errorMessage;

  @override
  void initState() {
    super.initState();

    processing = false;
    errorMessage = null;
    _data = new _LoginData();
  }

  String _validateEmail(String value) =>
      !!Validators.isEmail(value) ? null : this._emailErrorText;

  String _validatePassword(String value) =>
      Validators.isPassword(value) ? null : this._passwordErrorText;

  void submit() async {
    if (this._formKey.currentState.validate()) {
      this._formKey.currentState.save();

      setState(() {
        this.processing = true;
        this.errorMessage = null;
      });

      try {
        final data = await _loginRequest(this._data);
        print('data -> ${data.token}');
      } catch (e) {
        print(e.message);
        setState(() => this.errorMessage = 'Email or password is incorrect.');
      } finally {
        setState(() => this.processing = false);
      }
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
                  obscureText: true,
                  decoration: new InputDecoration(
                      hintText: 'Password', labelText: 'Enter your password'),
                  onSaved: (String value) => this._data.password = value,
                  validator: this._validatePassword,
                ),
                new Container(
                  padding: new EdgeInsets.only(top: 10.0),
                  child: new Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      new RichText(
                        text: TextSpan(
                            text: errorMessage,
                            style: TextStyle(
                                color: Colors.red, fontStyle: FontStyle.italic)),
                      ),
                    ],
                  )
                ),
                new Container(
                  width: MediaQuery.of(context).size.width,
                  child: new RaisedButton(
                    child: new Text(
                      processing ? '...' : 'Login',
                      style: new TextStyle(color: Colors.white),
                    ),
                    onPressed: processing ? null : () => this.submit(),
                    color: Colors.blue,
                  ),
                  margin: new EdgeInsets.only(top: 20.0),
                )
              ],
            ),
          )));
}
