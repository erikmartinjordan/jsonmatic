<p align = "center"> 
    <img src = "https://raw.githubusercontent.com/erikmartinjordan/jsonmatic/9efc86d10687689573b13915e7b30aaea243f6f4/src/Assets/Logo.svg" width = "200"/>
</p>
<p align = "center"> 
    <img src = "https://img.shields.io/github/license/erikmartinjordan/jsonmatic"/>
    <img src = "https://img.shields.io/github/workflow/status/erikmartinjordan/jsonmatic/deployToFirebase">
</p>

The easiest way to transform a CSV into a JSON and vice versa. You can try the [webapp](https://jsonmatic-pro.web.app/) without installing any package. The app runs in your browser; **data isn't uploaded to any server**.

<p align = "center">
    <img src = "https://github.com/erikmartinjordan/Screenshots/blob/master/May-12-2021%2013-05-23.gif?raw=true"/>
</p>

## Features

* Transform a CSV into a JSON (and vice versa)
* Beautify/uglify the JSON
* Configure indentation
* Replace/delete a property in multiple JSON files at once
* Merge JSON files

## Install

You can also install and use the app through the CLI:

```
npm i jsonmatic -g
```

## Use

Transform a CSV into JSON and vice versa:

```
jsonmatic transform <source> <destination>
```

Replace a property in multiple JSON files at once:

```
jsonmatic replace [options] <property> <currentValue> <replaceValue> <files...>
```

Merge multiple JSON files:

```
jsonmatic merge <files...>
```

## Note

The first column is reserved for unique keys. Use dot notation to create properties and subproperties.

## Author

[Erik Martín Jordán](https://erikmartinjordan.com)

## License

This project is open source and available under the MIT License.
