# Jsonmatic

Transform a CSV into a JSON.

You have:

| key | road | coord.lat | coord.lng | elem |
|-----|------|-----------|-----------|------|
| 1   | AP-7 | 42.02     | 2.82      | 🦄    |
| 2   | C-32 | 41.35     | 2.09      | 🦧    |
| 3   | B-20 | 41.44     | 2.18      | 🐰    |

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

## Author

[Erik Martín Jordán](https://erikmartinjordan.com)

## License

This project is open source and available under the MIT License.
