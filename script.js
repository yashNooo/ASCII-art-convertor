const canvas = document.getElementById("preview"); //canvas element of html
const fileInput = document.querySelector('input[type = "file"]'); 
const context = canvas.getContext("2d");

const detailSlider = document.getElementById("detail");
const detailValue = document.getElementById("detailValue");
let currentImage = null;

fileInput.onchange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = (event) => {

        const image = new Image();

        image.onload = () => {
            currentImage = image;
            renderAscii(image);
        };

            

        image.src = event.target.result;
    };

    reader.readAsDataURL(file);
};


const toGrayScale = (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b;

const convertToGrayScales = (context, width, height) => {
    const imageData = context.getImageData(0, 0, width, height);

    const grayScales = [];

    for (let i = 0; i<imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i+1];
        const b = imageData.data[i+2];

        const grayScale = toGrayScale(r, g, b);
        imageData.data[i] = grayScale;
            imageData.data[i + 1] = grayScale;
            imageData.data[i + 2] = grayScale;
                
                
            grayScales.push(grayScale);
    }
    context.putImageData(imageData, 0, 0);

    return grayScales;
}

const grayRamp = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
const rampLength = grayRamp.length;

const getCharacterForGrayScale = (grayScale) => 
    grayRamp[Math.ceil(((rampLength - 1) * grayScale) / 255)];

const asciiImage = document.querySelector("pre#ascii");



const drawAscii = (grayScales, width) => {
    const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
        let nextChars = getCharacterForGrayScale(grayScale);

        if((index + 1) % width === 0) {
            nextChars += "\n";
        }

        return asciiImage + nextChars;
    }, "");

    asciiImage.textContent = ascii;
};

let MAXIMUM_WIDTH = Number(detailSlider.value);
const MAXIMUM_HEIGHT = 70;



const getFontRatio = () => {
    const pre = document.createElement("pre");
    pre.style.display = "inline";
    pre.textContent = " ";

    document.body.appendChild(pre);
    const { width, height } = pre.getBoundingClientRect();
    document.body.removeChild(pre);

    return height / width;
};
 

const fontRatio = getFontRatio();


const clampDimensions = (width, height) => {
    const rectifiedWidth = Math.floor(fontRatio * width);

    
    if (rectifiedWidth > MAXIMUM_WIDTH) {
        const reducedHeight = Math.floor(
            (height * MAXIMUM_WIDTH) / rectifiedWidth
        );
        return [MAXIMUM_WIDTH, reducedHeight];
    }
    return [rectifiedWidth, height]
};

 

// adding download feature
const downloadTxtButton = document.getElementById("downloadTxt");

downloadTxtButton.onclick = () => {
    const asciiText = asciiImage.textContent;
    
    if(!asciiText) {
        alert("First convert an image to ASCII");
        return;
    }
    const blob = new Blob([asciiText], {
        type: "text/plain"
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "ascii-art.txt";

    link.click();
    
    URL.revokeObjectURL(url);
};



detailSlider.oninput = () => {
    MAXIMUM_WIDTH = Number(detailSlider.value);
    detailValue.textContent = MAXIMUM_WIDTH;

    if (currentImage) {
        renderAscii(currentImage);
    }
};

const renderAscii = (image) => {
    const [width, height] = clampDimensions(
        image.width,
        image.height
    );

    canvas.width = width;
    canvas.height = height;

    context.drawImage(image, 0, 0, width, height);

    const grayScales = convertToGrayScales(context,width,height);
    drawAscii(grayScales, width);
}; 

