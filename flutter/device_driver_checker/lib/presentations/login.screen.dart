import 'package:device_driver_checker/utils/keys.dart';
import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  LoginScreen() : super(key: Keys.LOGIN_SCREEN);

  @override
  State<StatefulWidget> createState() => new LoginScreenState();
}

class LoginScreenState extends State<LoginScreen> {
  final formKey = new GlobalKey<FormState>();

  String email;

  @override
  Widget build(BuildContext context) => new Scaffold(
        body: new Padding(
            padding: const EdgeInsets.fromLTRB(16.0, 100.0, 16.0, 16.0),
            child: new Center(
              child: new Form(
                  key: formKey,
                  child: new Column(
                    children: <Widget>[
                      new Text(
                        'Login',
                        style: new TextStyle(
                          fontSize: 30.0,
                          fontWeight: FontWeight.bold,
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                      new TextFormField(
                        decoration: new InputDecoration(labelText: 'Email'),
                        validator: (val) =>
                            !val.contains('@') ? 'Not valid email' : null,
                        onSaved: (val) => email = val,
                      ),
                      new TextFormField(
                        decoration: new InputDecoration(labelText: 'Password'),
                        obscureText: true,
                      )
                    ],
                  )),
            )),
      );
}
