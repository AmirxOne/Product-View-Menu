# 🛍️ Product View Menu

A clean **product image gallery** with thumbnail picker and a quick-view **lightbox** — pure HTML/CSS/JS, zero dependencies.

## Demo

👉 https://amirxone.github.io/Product-View-Menu/

## What it is

- A product card with a main image and a row of circular thumbnails
- Click any thumbnail to swap the main image
- Click the main image to open the **quick-view lightbox** with vertical thumbnails
- Close with the ✕ button, overlay click, or <kbd>Esc</kbd>

## Features

- ⚡ **Zero dependencies** — vanilla JS, no jQuery
- ⌨️ **Accessible** — full keyboard support (arrows, Home/End, Enter/Space, Esc), ARIA `listbox` + `dialog` pattern, focus trap in the lightbox, focus returns to the trigger on close
- 🖥️ **Responsive** — desktop / mobile (thumbnails move below the image in the lightbox)
- 🎞️ Smooth open/close fade & scale (respects `prefers-reduced-motion`)
- 🖼️ `object-fit: contain` everywhere — images never stretch
- 🇮🇷 IRANYekan font embedded

## Structure

```
├── index.html      # product card + lightbox markup
├── css/style.css   # styling, responsive breakpoints
├── js/app.js       # gallery + lightbox logic
├── img/            # product photos
└── font/           # IRANYekan
```

## License

MIT © AmirxOne
