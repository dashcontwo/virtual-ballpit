// import html2canvas from 'html2canvas-pro';

const $userImg = document.getElementById("userPic");
const $scaleRange = document.getElementById("imgScale");
const $resetBtn = document.getElementById("reset");
const $display = document.getElementById("display");
const $canvas = document.getElementById("canvas");
const $modalCapBtn = document.getElementById("openDownload");
const $modal = document.getElementById("modal");

// CUSTOM BALL COLOUR VARIABLES

// Custom Ball Colour Inputs
const $color1Input = document.getElementById("color-1");
const $color2Input = document.getElementById("color-2");
const $color3Input = document.getElementById("color-3");
const $color4Input = document.getElementById("color-4");

// Selecting All Of Each Colour, By Class
const $allColor1 = document.querySelectorAll(".ball-color-1")
const $allColor2 = document.querySelectorAll(".ball-color-2")
const $allColor3 = document.querySelectorAll(".ball-color-3")
const $allColor4 = document.querySelectorAll(".ball-color-4")



// BACKGROUND VARIABLES

// Background Type Inputs
const $backgroundTypeSection = document.querySelector(".backgroundType");
const $backgroundTypeImage = document.getElementById("imageBackground");
const $backgroundTypeGradient = document.getElementById("gradientBackground");
const $backgroundTypeColor = document.getElementById("colorBackground");

const $bgImgSection = document.querySelector(".backgroundTypeImg");
const $bgGradSection = document.querySelector(".backgroundTypeGradient");
const $bgColSection = document.querySelector(".backgroundTypeColor");



// URL for the modal image / result
let imgURL;

// Transform of $userImg, X and Y
let imgX = 0;
let imgY = 0;

// FUNCTIONS ON LOAD
setBallColor();

// EVENT LISTENERS
$color1Input.addEventListener("change", setBallColor);
$color2Input.addEventListener("change", setBallColor);
$color3Input.addEventListener("change", setBallColor);
$color4Input.addEventListener("change", setBallColor);


$backgroundTypeSection.addEventListener("change", (event) => {
    if (event.target.id == "imageBackground") {
        closeTypeMenus();
        $bgImgSection.classList.add("show");
        // Set initial image background? Or wait until option picked?
    } else if (event.target.id == "gradientBackground") {
        closeTypeMenus();
        $bgGradSection.classList.add("show");
    } else if (event.target.id == "colorBackground") {
        closeTypeMenus();
        $bgColSection.classList.add("show");
    }
})

// IMAGE CONTROL FUNCTIONS
const loadFile = function (event) {
    $userImg.src = URL.createObjectURL(event.target.files[0]);
    reset();
    $modalCapBtn.disabled = false;
};

// Resets the transforms of the images by removing the transform and scale styles, and resetting the slider and X and Y values for translation.
function reset() {
    $userImg.style.transform = "";
    $userImg.style.scale = "";
    $scaleRange.value = 100;
    imgX = 0;
    imgY = 0;
}

const up = function () {
    imgY -= 5;
    $userImg.style.transform = `translate(${imgX}px, ${imgY}px)`;
};

const down = function () {
    imgY += 5;
    $userImg.style.transform = `translate(${imgX}px, ${imgY}px)`;
};

const left = function () {
    imgX -= 5;
    $userImg.style.transform = `translate(${imgX}px, ${imgY}px)`;
};

const right = function () {
    imgX += 5;
    $userImg.style.transform = `translate(${imgX}px, ${imgY}px)`;
};

const scaleImg = function () {
    $userImg.style.scale = $scaleRange.value / 100;
}

function closeTypeMenus() {
    $bgImgSection.classList.remove("show");
    $bgGradSection.classList.remove("show");
    $bgColSection.classList.remove("show");
}

function setBackground(background) {
    $canvas.style.background = background;
}

function setBallColor() {
    // For each element of the color, change the fill of the element to the new value. 
    $allColor1.forEach(element => {
        element.style.fill = $color1Input.value;
    });

    $allColor2.forEach(element => {
        element.style.fill = $color2Input.value;
    });

    $allColor3.forEach(element => {
        element.style.fill = $color3Input.value;
    });

    $allColor4.forEach(element => {
        element.style.fill = $color4Input.value;
    });
}

// // html2canvas(document.body).then(function(canvas) {
//     document.body.appendChild(canvas);
// });

$modalCapBtn.addEventListener("click", async () => {
    console.log('Work')
    let canvas = await html2canvas($canvas);

    canvas.toBlob((blob) => {
        imgURL = URL.createObjectURL(blob);
        document.getElementById("downloadLink").href = imgURL;
        document.getElementById("downloadImg").src = imgURL;
    })

    openModal();
})

// Modal open and close
function openModal() {
    // Adds modal to view, and prevent body from scrolling
    $modal.classList.add('show');
    document.body.classList.toggle("modal-open");
}

function closeModal() {
    // Removes the modal from view, and allow body scrolling again
    $modal.classList.remove('show');
    document.body.classList.toggle("modal-open");
    // Revokes object URL to prevent memory leakage
    URL.revokeObjectURL(imgURL);
}