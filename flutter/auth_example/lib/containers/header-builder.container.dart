import 'package:auth_example/utils/utils.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class HeaderBuilder extends StatelessWidget {
  final List<Widget> childrenBefore;
  final List<Widget> childrenAfter;
  final String title;

  HeaderBuilder(
      {Key key,
      this.childrenBefore = const <Widget>[],
      @required this.childrenAfter,
      @required this.title})
      : super(key: Keys.HEADER_BUILDER_CONTAINER);

  @override
  Widget build(BuildContext context) {
    final topPadding = MediaQuery.of(context).padding.top;

    return new Scaffold(
      body: new Container(
          height: 303.0,
          decoration:
              new BoxDecoration(color: Colors.blue, boxShadow: <BoxShadow>[
            new BoxShadow(
                spreadRadius: 2.0,
                blurRadius: 4.0,
                offset: new Offset(0.0, 1.0),
                color: Colors.black38),
          ]),
          child: new Stack(
            fit: StackFit.expand,
            children: <Widget>[
              new Container(
                height: 600.0,
                decoration: new BoxDecoration(
                  gradient: new LinearGradient(colors: <Color>[
                    //7928D1
                    const Color(0xFF7928D1), const Color(0xFF9A4DFF)
                  ], stops: <double>[
                    0.3,
                    0.5
                  ], begin: Alignment.topRight, end: Alignment.bottomLeft),
                ),
              ),
              new Padding(
                padding: new EdgeInsets.only(
                    top: topPadding, left: 15.0, right: 15.0, bottom: 20.0),
                child: new Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[]
                    ..addAll(this.childrenBefore)
                    ..add(
                      new Padding(
                        padding: const EdgeInsets.only(bottom: 15.0),
                        child: new Text(this.title,
                            style: new TextStyle(
                                fontFamily: Fonts.TIMEBURNER,
                                fontWeight: FontWeight.w700,
                                color: Colors.white,
                                fontSize: 40.0,
                                letterSpacing: 1.0)),
                      ),
                    )
                    ..addAll(this.childrenAfter),
                ),
              )
            ],
          )),
    );
  }
}
