# Stride Street – Footwear Website

A responsive footwear store front-end built with plain **HTML, CSS and JavaScript**.
Browse shoes by category, add them to a cart, change quantities and see the live total.
The cart is saved in the browser (localStorage), so it stays after a refresh.

## Features

- Responsive layout (mobile, tablet, desktop)
- Category filters: Sneakers, Formal, Sandals, Boots
- Slide-in cart with add, increase, decrease and remove
- Cart total in ₹ and item counter
- Cart saved with localStorage
- Keyboard-friendly and respects reduced-motion settings

## Tech stack

HTML5 · CSS3 (Grid, Flexbox, custom properties) · Vanilla JavaScript (ES6)

## Project structure

```
footwear-website/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── .gitignore
└── README.md
```

## How to run

1. Download or clone this repository.
2. Open the folder in VS Code.
3. Open `index.html` in your browser (or use the **Live Server** extension → "Go Live").

No installation or build step is needed.

## Customize

- Add or edit shoes in the `products` array at the top of `js/script.js`.
- Change colors in the `:root` block of `css/style.css`.
- Replace the shoe drawings with real photos by using `<img>` in the product card template.

## Future improvements

- Real product images and a product detail page
- Search and sort by price
- Size selector
- Backend with Java (Spring Boot) or Python (Flask) and a database
- Real payment integration

## License

Free to use for learning. Add a license of your choice (for example MIT) before using it commercially.
