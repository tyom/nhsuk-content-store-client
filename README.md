# NHS.UK Content Store Client Prototype

## Instructions

Install dependencies:

```
npm install
```

Run the [Content Store backend](https://github.com/nhsuk/nhsuk-content-store) with the following settings in `local.py`:
 
```py
CORS_ORIGIN_WHITELIST = (
    'localhost:8080',
)
CORS_ALLOW_CREDENTIALS = True
```

Run the app in development:

```
npm run dev
```
