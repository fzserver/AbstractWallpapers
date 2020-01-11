import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) => Scaffold(
        body: Stack(
          fit: StackFit.expand,
          children: <Widget>[
            Image(
              image: AssetImage(
                'assets/images/alex-blajan-yqI40yJ7VOs-unsplash.jpg',
              ),
              fit: BoxFit.cover,
            ),
            Container(
              color: Colors.black38,
              child: Column(
                children: <Widget>[
                  SizedBox(
                    height: MediaQuery.of(context).size.height * .1,
                  ),
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisSize: MainAxisSize.max,
                      children: <Widget>[
                        Container(
                          child: Column(
                            children: <Widget>[
                              Text(
                                'ABSTRACT',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 36.0,
                                  fontFamily: 'SF Pro Display',
                                  letterSpacing: 1.5,
                                ),
                              ),
                              const SizedBox(height: 20.0),
                              Text(
                                'Beautiful Free Images',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 17.0,
                                  fontFamily: 'SF Pro Display',
                                  letterSpacing: 1.0,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 10.0),
                        Row(
                          children: <Widget>[
                            const SizedBox(
                              width: 10.0,
                            ),
                            Expanded(
                              child: MaterialButton(
                                onPressed: () {},
                                color: Colors.transparent,
                                hoverColor: Colors.red,
                                highlightColor: Colors.red,
                                splashColor: Colors.red,
                                minWidth:
                                    MediaQuery.of(context).size.width * .9,
                                child: Text(
                                  'LOGIN',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 16.0,
                                    fontFamily: 'SF Pro Display',
                                    letterSpacing: 1.0,
                                  ),
                                ),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(
                                    30.0,
                                  ),
                                  side: BorderSide(
                                    color: Colors.red,
                                    width: 2.0,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 10.0),
                            Expanded(
                              child: MaterialButton(
                                onPressed: () {},
                                color: Colors.transparent,
                                hoverColor: Colors.red,
                                highlightColor: Colors.red,
                                splashColor: Colors.red,
                                minWidth:
                                    MediaQuery.of(context).size.width * .9,
                                child: Text(
                                  'SIGN UP',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 16.0,
                                    fontFamily: 'SF Pro Display',
                                    letterSpacing: 1.0,
                                  ),
                                ),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(
                                    30.0,
                                  ),
                                  side: BorderSide(
                                    color: Colors.red,
                                    width: 2.0,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      );
}
