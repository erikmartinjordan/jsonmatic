# Jsonmatic
![License](https://img.shields.io/github/license/erikmartinjordan/jsonmatic)
![Test](https://img.shields.io/github/workflow/status/erikmartinjordan/jsonmatic/deployToFirebase)

The easiest way to transform a CSV into a JSON and vice versa. You can try the [webapp](https://tiempone.com) without installing any package. 

<p align = "center"> 
<img src = "https://raw.githubusercontent.com/erikmartinjordan/jsonmatic/9efc86d10687689573b13915e7b30aaea243f6f4/src/Assets/Logo.svg" width = "200"/>
</p>



However, if you like the CLI:

## Install

```
npm i jsonmatic -g
```

## Use

## 1. Transform a CSV into JSON and viceversa:

```
jsonmatic transform <source> <destination>
```

Example:

```
jsonmatic data.json result.csv
```

## 2. Merge

```
jsonmatic merge <files...>
```

Example:

```
jsonmatic merge data_1.json data_2.json data_3.json
```

## Webapp

You can use the webapp to transform the data without CLI. The webapp runs in your browser; **data isn't uploaded to any server**.

### Input

You have:

| key | road | coord.lat | coord.lng | elem |
|-----|------|-----------|-----------|------|
| 1   | AP-7 | 42.02     | 2.82      | 🦄    |
| 2   | C-32 | 41.35     | 2.09      | 🦧    |
| 3   | B-20 | 41.44     | 2.18      | 🐰    |

### Output

You get:

```javascript
{
    "1": {
        "road": "AP-7",
        "coord": {
            "lat": 42.02,
            "lng": 2.82
        },
        "elem": "🦄'"
    },
    "2": {
        "road": "C-32",
        "coord": {
            "lat": 41.35,
            "lng": 2.09
        },
        "elem": "🦧"
    },
    "3": {
        "road": "B-20",
        "coord": {
            "lat": 41.44,
            "lng": 2.18
        },
        "elem": "🐰"
    }
}
```

## Note

The first column is reserved for unique keys. Use dot notation to create properties and subproperties.

## Author

[Erik Martín Jordán](https://erikmartinjordan.com)

## License

This project is open source and available under the MIT License.
