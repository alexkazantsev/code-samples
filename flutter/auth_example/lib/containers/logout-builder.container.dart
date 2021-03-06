import 'package:auth_example/utils/utils.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class LogoutBuilder extends StatelessWidget {
  final Function onPress;

  LogoutBuilder({Key key, @required this.onPress})
      : super(key: Keys.LOGOUT_BUILDER_CONTAINER);

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        IconButton(
            icon: Icon(
              FontAwesomeIcons.arrowLeft,
              color: Colors.white,
              size: 30.0,
            ),
            onPressed: onPress),
      ],
    );
    ;
  }
}
