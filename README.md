# ASCII Art Converter

A simple image-to-ASCII art converter made using HTML, CSS, and JavaScript.

Upload an image, adjust the detail level, and convert it into ASCII art directly in the browser.

## Live Demo

https://yashNooo.github.io/ASCII-art-convertor/

## Features

- Upload an image
- Convert image into ASCII art
- Adjustable detail slider
- Grayscale image processing
- Download ASCII output as a `.txt` file
- Simple grayscale UI

## How It Works

The image is resized and drawn on an HTML canvas.

JavaScript reads the image pixels, converts them into grayscale, and maps the brightness of each pixel to ASCII characters.

Darker pixels use heavier characters like:

```text
$ @ B % #
```

Brighter pixels use lighter characters like:

```text
: , . '
```

The characters are then arranged row by row to create the final ASCII image.

## Tech Stack

- HTML
- CSS
- JavaScript
- Canvas API
- FileReader API

## Clone and Run

Clone the repository:

```bash
git clone https://github.com/yashNooo/ASCII-art-convertor.git
```

Go inside the project folder:

```bash
cd ASCII-art-convertor
```

Then open `index.html` in your browser.

If you use VS Code, you can also run it using Live Server.

## Project Structure

```text
ASCII-art-convertor/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Features I Added

- Image to ASCII conversion
- Automatic image resizing
- Font aspect-ratio correction
- Detail/resolution slider
- TXT download feature
- Grayscale themed UI



## Author

Made by Yash

GitHub: https://github.com/yashNooo
