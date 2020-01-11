import 'package:Abstract/pages/home.dart';
import 'package:flutter/material.dart';

void main() => runApp(Abstract());

class Abstract extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Abstract Wallpapers',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blueGrey,
      ),
      home: Home(),
    );
  }
}
