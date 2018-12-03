import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class LogoutBuilder extends StatelessWidget {
  final Function onPress;

  LogoutBuilder({Key key, @required this.onPress}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Row(
      mainAxisAlignment: MainAxisAlignment.end,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        new IconButton(
            icon: new Icon(
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
