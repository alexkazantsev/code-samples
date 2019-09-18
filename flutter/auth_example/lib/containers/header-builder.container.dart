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
      this.childrenBefore: const <Widget>[],
      @required this.childrenAfter,
      @required this.title})
      : super(key: Keys.HEADER_BUILDER_CONTAINER);

  @override
  Widget build(BuildContext context) {
    final topPadding = MediaQuery.of(context).padding.top;

    return Scaffold(
      body: Container(
          height: 303.0,
          decoration: BoxDecoration(color: Colors.blue, boxShadow: <BoxShadow>[
            BoxShadow(
                spreadRadius: 2.0,
                blurRadius: 4.0,
                offset: Offset(0.0, 1.0),
                color: Colors.black38),
          ]),
          child: Stack(
            fit: StackFit.expand,
            children: <Widget>[
              Container(
                height: 600.0,
                decoration: BoxDecoration(
                  gradient: LinearGradient(colors: <Color>[
                    //7928D1
                    const Color(0xFF7928D1), const Color(0xFF9A4DFF)
                  ], stops: <double>[
                    0.3,
                    0.5
                  ], begin: Alignment.topRight, end: Alignment.bottomLeft),
                ),
              ),
              Padding(
                padding: EdgeInsets.only(
                    top: topPadding, left: 15.0, right: 15.0, bottom: 20.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[]
                    ..addAll(this.childrenBefore)
                    ..add(
                      Padding(
                        padding: const EdgeInsets.only(bottom: 15.0),
                        child: Text(this.title,
                            style: TextStyle(
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
