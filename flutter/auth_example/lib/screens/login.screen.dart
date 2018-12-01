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

  void _onLoginSuccess(ctx) => Navigator.of(ctx)
      .pushNamedAndRemoveUntil('/profile', (Route<dynamic> route) => false);

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
                  initialValue: 'admin@mail.com',
                  decoration: new InputDecoration(
                      hintText: 'you@example.com', labelText: 'E-mail Address'),
                  onSaved: (String value) => this._data.email = value,
                  validator: this._validateEmail,
                ),
                new TextFormField(
                  obscureText: true,
                  initialValue: '8eKBUc',
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
                        new StoreConnector<AppState, dynamic>(
                            builder: (_, error) => new RichText(
                                  text: TextSpan(
                                      text: error,
                                      style: TextStyle(
                                          color: Colors.red,
                                          fontStyle: FontStyle.italic)),
                                ),
                            converter: (store) => store.state.auth.error),
                      ],
                    )),
                new Container(
                  width: MediaQuery.of(context).size.width,
                  child: new StoreConnector<AppState, bool>(
                      builder: (ctx, processing) => new RaisedButton(
                          color: Colors.blue,
                          child: new Text(
                            'Login',
                            style: new TextStyle(color: Colors.white),
                          ),
                          onPressed:
                              processing ? null : () => this.submit(ctx)),
                      converter: (store) => store.state.auth.processing),
                  margin: new EdgeInsets.only(top: 20.0),
                )
              ],
            ),
          )));
}
