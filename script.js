const $userImg = document.getElementById("userPic");
const $previewImg = document.getElementById("previewImg");
const $scaleRange = document.getElementById("imgScale");
const $resetBtn = document.getElementById("reset");
const $display = document.getElementById("display");
const $canvas = document.getElementById("canvas");
const $modalCapBtn = document.getElementById("openDownload");
const $modal = document.getElementById("postcardBox");

// CUSTOM BALL COLOUR VARIABLES

// Custom Ball Colour Inputs
const $color1Input = document.getElementById("color-1");
const $color2Input = document.getElementById("color-2");
const $color3Input = document.getElementById("color-3");
const $color4Input = document.getElementById("color-4");
const $ballpitColorInput = document.getElementById("ballpitColor")

// Selecting All Of Each Colour, By Class
const $allColor1 = document.querySelectorAll(".ball-color-1")
const $allColor2 = document.querySelectorAll(".ball-color-2")
const $allColor3 = document.querySelectorAll(".ball-color-3")
const $allColor4 = document.querySelectorAll(".ball-color-4")
const $ballpitColorFills = document.querySelectorAll(".ballpit-fill, .ballpit-stroke")

const $allPresetColorRadios = document.getElementById("presetOptions").querySelectorAll("input[type='radio']")

const defaultColors = {
    ballpit: '#1F4686',
    ball1: '#2B8CD8',
    ball2: '#B672DB',
    ball3: '#EFD8CB',
    ball4: '#F6D64F'
}

const edmundColors = {
    ballpit: '#171F2A',
    ball1: '#174A7C',
    ball2: '#391D33',
    ball3: '#DA3966',
    ball4: '#F8DB3B'
}

const melColors = {
    ballpit: '#190E26',
    ball1: '#74789E',
    ball2: '#22141F',
    ball3: '#956798',
    ball4: '#FBF9F6'
}

const valColors = {
    ballpit: '#6C190D',
    ball1: '#BC563C',
    ball2: '#FFCC32',
    ball3: '#ED8D02',
    ball4: '#FFF9D3'
}

const blorboColors = {
    ballpit: '#0B0A17',
    ball1: '#152137',
    ball2: '#0085BF',
    ball3: '#A9D2D9',
    ball4: '#184055'
}

// BACKGROUND VARIABLES

// Background Type Inputs
const $backgroundTypeSection = document.querySelector(".backgroundType");
const $backgroundTypeImage = document.getElementById("imageBackground");
const $backgroundTypeGradient = document.getElementById("gradientBackground");
const $backgroundTypeColor = document.getElementById("colorBackground");

const $bgImgSection = document.querySelector(".backgroundTypeImg");
const $bgGradSection = document.querySelector(".backgroundTypeGradient");
const $bgColSection = document.querySelector(".backgroundTypeColor");

let gradientAngle;

const backgroundImageOptions = {
    ogDashcon: 'images/background-options/og-dashcon-ballpit.png',
    cirque: 'images/background-options/cirque-lineup.png',
    edmundSolo: 'images/background-options/edmund-on-color-background.png',
    eebyDeeby: 'images/background-options/eeby-deeby.jpg',
    horsePlinko: 'images/background-options/horse-plinko.jpg'
}

// Add Text Options
const $greetings = document.getElementById('Greetings');
const $greetToggle = document.getElementById('greetingsFromToggle');
const $greetColorContainer = document.getElementById('greetingsColorContainer');
const $greetingsColorInput = document.getElementById('greetingsTextColor');
const greetingTextColorDefault = "#FFFFFF";

const $stupidPostcard = document.getElementById('StupidPostcard');
const $stupidPostcardToggle = document.getElementById('stupidPostcardToggle');
const $postcardColorContainer = document.getElementById('postcardColorContainer');
const $postcardColorInput = document.getElementById('postcardTextColor');
const postcardTextColorDefault = "#CE2E73"

const textOptionsToHide = [$greetings, $greetColorContainer, $stupidPostcard, $postcardColorContainer]

// URL for the modal image / result
let imgURL;

// Transform of $userImg, X and Y
let imgX = 0;
let imgY = 0;

// FUNCTIONS ON LOAD
resetBallColors();
resetText();


// EVENT LISTENERS
$color1Input.addEventListener("change", () => { setSingleColorByInput($color1Input, $allColor1) });
$color2Input.addEventListener("change", () => { setSingleColorByInput($color2Input, $allColor2) });
$color3Input.addEventListener("change", () => { setSingleColorByInput($color3Input, $allColor3) });
$color4Input.addEventListener("change", () => { setSingleColorByInput($color4Input, $allColor4) });
$ballpitColorInput.addEventListener("change", () => { setSingleColorByInput($ballpitColorInput, $ballpitColorFills) });

$backgroundTypeSection.addEventListener("change", (event) => {
    if (event.target.id == "imageBackground") {
        closeTypeMenus();
        $bgImgSection.classList.remove("hidden");
        // Set initial image background? Or wait until option picked?
    } else if (event.target.id == "gradientBackground") {
        closeTypeMenus();
        $bgGradSection.classList.remove("hidden");
    } else if (event.target.id == "colorBackground") {
        closeTypeMenus();
        $bgColSection.classList.remove("hidden");
    }
})

$stupidPostcardToggle.addEventListener("change", (event) => {
    $stupidPostcard.classList.toggle('hidden');
    $postcardColorContainer.classList.toggle('hidden');
})

$greetToggle.addEventListener("change", (event) => {
    $greetings.classList.toggle('hidden');
    $greetColorContainer.classList.toggle('hidden');
})

$greetingsColorInput.addEventListener("change", (event) => {
    setTextColor($greetings, event.target.value)
})

$postcardColorInput.addEventListener("change", (event) => {
    setTextColor($stupidPostcard, event.target.value)
})

$modalCapBtn.addEventListener("click", async () => {
    let canvas = await html2canvas($canvas, {
        imageSmoothing: true,
        scale: 2,
        imageSmoothingQuality: 'high'
    });

    canvas.toBlob((blob) => {
        imgURL = URL.createObjectURL(blob);
        document.getElementById("downloadLink").href = imgURL;
        document.getElementById("downloadImg").src = imgURL;
    })

})

// IMAGE CONTROL FUNCTIONS
const loadFile = function (event) {
    let userImgUrl = URL.createObjectURL(event.target.files[0]);
    $userImg.src = userImgUrl;
    $previewImg.src = userImgUrl;
    $previewImg.hidden = false;
    resetImg();
    $modalCapBtn.disabled = false;
};

// Resets the transforms of the images by removing the transform and scale styles, and resetting the slider and X and Y values for translation.
function resetImg() {
    $userImg.style.transform = "";
    $scaleRange.value = 100;
    imgX = 0;
    imgY = 0;
}

const up = function () {
    imgY -= 5;
    $userImg.style.transform = `translate(${imgX}px, ${imgY}px) scale(${$scaleRange.value / 100})`;
};

const down = function () {
    imgY += 5;
    $userImg.style.transform = `translate(${imgX}px, ${imgY}px) scale(${$scaleRange.value / 100})`;
};

const left = function () {
    imgX -= 5;
    $userImg.style.transform = `translate(${imgX}px, ${imgY}px) scale(${$scaleRange.value / 100})`;
};

const right = function () {
    imgX += 5;
    $userImg.style.transform = `translate(${imgX}px, ${imgY}px) scale(${$scaleRange.value / 100})`;
};

const scaleImg = function () {
    $userImg.style.transform = `translate(${imgX}px, ${imgY}px) scale(${$scaleRange.value / 100})`
}

function setTextColor(textElement, color) {
    textElement.style.color = color;
}

function resetText() {
    $greetToggle.checked = false;
    $stupidPostcardToggle.checked = false;

    setTextColor($greetings, greetingTextColorDefault);
    setTextColor($stupidPostcard, postcardTextColorDefault);


    $greetingsColorInput.value = greetingTextColorDefault;
    $postcardColorInput.value = postcardTextColorDefault;

    textOptionsToHide.forEach(element => {
        if (!element.classList.contains('hidden')) {
            element.classList.add('hidden');
        }
    })
}

function closeTypeMenus() {
    $bgImgSection.classList.add("hidden");
    $bgGradSection.classList.add("hidden");
    $bgColSection.classList.add("hidden");
}

function setBackground(background) {
    $canvas.style.backgroundImage = background;
}



function resetBallColors() {
    $allPresetColorRadios.forEach(radio => radio.checked = false)
    setAllBallColors(defaultColors);
}

function setAllBallColors(colorObj) {
    setColorInputValue($color1Input, colorObj.ball1);
    setColorInputValue($color2Input, colorObj.ball2);
    setColorInputValue($color3Input, colorObj.ball3);
    setColorInputValue($color4Input, colorObj.ball4);
    setColorInputValue($ballpitColorInput, colorObj.ballpit);

    setSingleColorByValue(colorObj.ball1, $allColor1);
    setSingleColorByValue(colorObj.ball2, $allColor2);
    setSingleColorByValue(colorObj.ball3, $allColor3);
    setSingleColorByValue(colorObj.ball4, $allColor4);
    setSingleColorByValue(colorObj.ballpit, $ballpitColorFills);
}

function setColorInputValue(colorInput, newValue) {
    colorInput.value = newValue;
}

function setSingleColorByInput(colorInput, elementsToChange) {
    elementsToChange.forEach(element => {
        element.style.fill = colorInput.value;
    });
}

function setSingleColorByValue(colorValue, elementsToChange) {
    elementsToChange.forEach(element => {
        element.style.fill = colorValue;
    });
}

function revokeURL() {
    // Revokes object URL to prevent memory leakage
    URL.revokeObjectURL(imgURL);
}