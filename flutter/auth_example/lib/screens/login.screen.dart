import 'package:auth_example/actions/actions.dart';
import 'package:auth_example/models/models.dart';
import 'package:auth_example/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';

class LoginScreen extends StatefulWidget {
  LoginScreen({@required this.store}) : super(key: Keys.LOGIN_SCREEN);

  final Store<AppState> store;

  @override
  State<StatefulWidget> createState() => new LoginScreenState();
}

class LoginScreenState extends State<LoginScreen> {
  final GlobalKey<FormState> _formKey = new GlobalKey<FormState>();
  final String _emailErrorText =
      'The E-mail Address must be a valid email address.';
  final String _passwordErrorText =
      'The Password must be at least 8 characters.';

  LoginData _data;

  @override
  void initState() {
    super.initState();

    _data = new LoginData(email: 'admin@mail.com', password: '8eKBUc');
  }

  String _validateEmail(String value) =>
      !!Validators.isEmail(value) ? null : this._emailErrorText;

  String _validatePassword(String value) =>
      Validators.isPassword(value) ? null : this._passwordErrorText;

  void submit(ctx) async {
    if (this._formKey.currentState.validate()) {
      this._formKey.currentState.save();

      widget.store.dispatch(new LoginRequest(
          data: this._data, onSuccess: () => this._onLoginSuccess(ctx)));
    }
  }

  void _onLoginSuccess(ctx) {
    this._formKey.currentState.reset();
    Navigator.of(ctx)
        .pushNamedAndRemoveUntil('/profile', (Route<dynamic> route) => false);
  }

  @override
  Widget build(BuildContext context) => Scaffold(
          body: Center(
              child: Form(
        key: this._formKey,
        child: ListView(
          shrinkWrap: true,
          padding: EdgeInsets.only(left: 24.0, right: 24.0),
          children: <Widget>[
            Center(
              child: Text(
                'Login',
                style: TextStyle(
                    color: Colors.black,
                    fontFamily: Fonts.TIMEBURNER,
                    fontSize: 40.0,
                    fontWeight: FontWeight.w700),
              ),
            ),
            TextFormField(
              keyboardType: TextInputType.emailAddress,
              initialValue: 'admin@mail.com',
              style:
                  TextStyle(fontFamily: Fonts.TIMEBURNER, color: Colors.black),
              decoration: InputDecoration(
                  hintText: 'you@example.com',
                  labelText: 'E-mail Address',
                  labelStyle: TextStyle(fontWeight: FontWeight.w600)),
              onSaved: (String value) => this._data.email = value,
              validator: this._validateEmail,
            ),
            TextFormField(
              obscureText: true,
              initialValue: '8eKBUc',
              style:
                  TextStyle(fontFamily: Fonts.TIMEBURNER, color: Colors.black),
              decoration: InputDecoration(
                  hintText: 'Password',
                  labelText: 'Enter your password',
                  labelStyle: TextStyle(fontWeight: FontWeight.w600)),
              onSaved: (String value) => this._data.password = value,
              validator: this._validatePassword,
            ),
            Container(
                padding: EdgeInsets.only(top: 10.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    StoreConnector<AppState, dynamic>(
                        builder: (_, error) => RichText(
                              text: TextSpan(
                                  text: error,
                                  style: TextStyle(
                                      color: Colors.red,
                                      fontFamily: Fonts.TIMEBURNER)),
                            ),
                        converter: (store) => store.state.auth.error),
                  ],
                )),
            Padding(
                padding: EdgeInsets.symmetric(vertical: 16.0),
                child: StoreConnector<AppState, bool>(
                  converter: (store) => store.state.auth.processing,
                  builder: (ctx, processing) => Material(
                        borderRadius: BorderRadius.circular(30.0),
                        shadowColor: Color(0xFF7928D1),
                        color: Color(0xFF7928D1),
                        elevation: 5.0,
                        child: MaterialButton(
                          minWidth: 200.0,
                          height: 42.0,
                          onPressed: processing ? null : () => this.submit(ctx),
                          child: Text(
                            'Login',
                            style: TextStyle(
                                fontFamily: Fonts.TIMEBURNER,
                                color: Colors.white),
                          ),
                        ),
                      ),
                ))
          ],
        ),
      )));
}
