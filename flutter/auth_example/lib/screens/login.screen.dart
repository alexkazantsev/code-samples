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
  State<StatefulWidget> createState() =>
      new LoginScreenState(store: this.store);
}

class LoginScreenState extends State<LoginScreen> {
  final GlobalKey<FormState> _formKey = new GlobalKey<FormState>();
  final String _emailErrorText =
      'The E-mail Address must be a valid email address.';
  final String _passwordErrorText =
      'The Password must be at least 8 characters.';

  final Store<AppState> store;

  LoginScreenState({@required this.store});

  LoginData _data;
  String errorMessage;

  @override
  void initState() {
    super.initState();

    errorMessage = null;
    _data = new LoginData(email: null, password: null);
  }

  String _validateEmail(String value) =>
      !!Validators.isEmail(value) ? null : this._emailErrorText;

  String _validatePassword(String value) =>
      Validators.isPassword(value) ? null : this._passwordErrorText;

  void submit() async {
    if (this._formKey.currentState.validate()) {
      this._formKey.currentState.save();

      this.store.dispatch(new LoginRequest(data: this._data));
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
//                        new StoreConnector(builder: null, converter: null)
                        new RichText(
                          text: TextSpan(
                              text: errorMessage,
                              style: TextStyle(
                                  color: Colors.red,
                                  fontStyle: FontStyle.italic)),
                        ),
                      ],
                    )),
                new Container(
                  width: MediaQuery.of(context).size.width,
                  child: new StoreConnector<AppState, bool>(
                      builder: (_, processing) => new RaisedButton(
                          color: Colors.blue,
                          child: new Text(
                            'Login',
                            style: new TextStyle(color: Colors.white),
                          ),
                          onPressed: processing ? null : () => this.submit()),
                      converter: (store) => store.state.auth.processing),
                  margin: new EdgeInsets.only(top: 20.0),
                )
              ],
            ),
          )));
}
