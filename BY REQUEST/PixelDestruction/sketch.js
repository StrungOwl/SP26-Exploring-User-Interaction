// Canvas and image setup
const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const img = new Image();

// Effect parameters
const pixelSize = 8; // Smaller size for more pixels
const distortionHeight = 50; // percentage of image height to blend

// Store banana colors for filling transparent areas
let bananaColors = [];

// Load the banana image
img.src = '../../xAssets/banana.png';

img.onload = function() {
    // Set canvas dimensions to match image
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw original image
    ctx.drawImage(img, 0, 0);

    // Collect banana colors from the image
    collectBananaColors();

    // Apply blending effect
    applyBlenderEffect();
};

/**
 * Collect color samples from the banana (non-transparent pixels)
 */
function collectBananaColors() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
        const a = pixels[i + 3];
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        // Only collect colors from visible banana pixels
        if (a > 50 && !(r < 50 && g < 50 && b < 50)) {
            bananaColors.push({ r, g, b });
        }
    }
}

/**
 * Get a random banana color
 */
function getRandomBananaColor() {
    if (bananaColors.length === 0) {
        return { r: 255, g: 220, b: 100 }; // Default yellow
    }
    return bananaColors[Math.floor(Math.random() * bananaColors.length)];
}

/**
 * Apply blender effect to the top portion of the image
 */
function applyBlenderEffect() {
    // Calculate the height of the blending area
    const blendHeight = Math.floor(canvas.height * (distortionHeight / 100));

    // Create blender effect on top portion
    blenderRegion(0, 0, canvas.width, blendHeight, pixelSize);
}

/**
 * Create blender/turbulent mixing effect with depth
 * @param {number} startX - Starting X coordinate
 * @param {number} startY - Starting Y coordinate
 * @param {number} width - Width of the region
 * @param {number} height - Height of the region
 * @param {number} blockSize - Size of the pixel blocks
 */
function blenderRegion(startX, startY, width, height, blockSize) {
    // Center of the blender effect (top-center of banana)
    const centerX = canvas.width / 2;
    const centerY = 0;

    // Store all pixel blocks with their properties
    const pixelBlocks = [];

    // Loop through the region to collect pixel data
    for (let y = startY; y < startY + height; y += blockSize) {
        for (let x = startX; x < startX + width; x += blockSize) {
            // Calculate distance from bottom of blend region
            const distanceFromBottom = (startY + height) - y;
            const intensityFactor = 1 - (distanceFromBottom / height);

            // Calculate angle from center for swirl effect
            const dx = x - centerX;
            const dy = y - centerY;
            const angle = Math.atan2(dy, dx);
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Swirl/turbulent displacement
            const swirlIntensity = intensityFactor * 2;
            const turbulence = Math.sin(angle * 3 + distance * 0.05) * swirlIntensity;

            // Outward radial expansion
            const radialExpansion = intensityFactor * 80;
            const offsetX = Math.cos(angle) * radialExpansion +
                           (Math.random() - 0.5) * intensityFactor * 100 +
                           Math.cos(angle + Math.PI/2) * turbulence * 30;

            const offsetY = Math.sin(angle) * radialExpansion -
                           intensityFactor * 80 +
                           (Math.random() - 0.5) * intensityFactor * 80 +
                           Math.sin(angle + Math.PI/2) * turbulence * 30;

            // Get the pixel data at the current position
            const blockWidth = Math.min(blockSize, canvas.width - x);
            const blockHeight = Math.min(blockSize, canvas.height - y);

            // Get average color of block
            const blockData = ctx.getImageData(x, y, blockWidth, blockHeight);
            const pixels = blockData.data;

            let r = 0, g = 0, b = 0, a = 0;
            const pixelCount = (blockWidth * blockHeight);

            for (let i = 0; i < pixels.length; i += 4) {
                r += pixels[i];
                g += pixels[i + 1];
                b += pixels[i + 2];
                a += pixels[i + 3];
            }

            r = Math.floor(r / pixelCount);
            g = Math.floor(g / pixelCount);
            b = Math.floor(b / pixelCount);
            a = a / pixelCount;

            // If pixel is transparent or very dark, replace with banana color
            if (a < 50 || (r < 50 && g < 50 && b < 50)) {
                const bananaColor = getRandomBananaColor();
                r = bananaColor.r;
                g = bananaColor.g;
                b = bananaColor.b;
                a = 255;
            }

            // Calculate depth (distance from original position)
            const displacementDistance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

            // Add rotation based on intensity and swirl
            const rotation = intensityFactor * (Math.random() - 0.5) * Math.PI +
                           turbulence * 0.5;

            // Vary block size slightly for more organic look
            const sizeVariation = 1 + (Math.random() - 0.5) * 0.3;

            // Store pixel block data
            pixelBlocks.push({
                x: x + offsetX,
                y: y + offsetY,
                originalX: x,
                originalY: y,
                width: blockWidth,
                height: blockHeight,
                r, g, b, a,
                rotation,
                sizeVariation,
                intensityFactor,
                displacementDistance,
                depth: intensityFactor * displacementDistance // Combined depth metric
            });
        }
    }

    // Clear the original region
    ctx.clearRect(startX, startY, width, height);

    // Sort pixels by depth (furthest back first)
    pixelBlocks.sort((a, b) => b.depth - a.depth);

    // Draw pixels with depth-based opacity and color variations
    pixelBlocks.forEach(block => {
        // Calculate opacity based on displacement (further = more transparent)
        const normalizedDepth = Math.min(block.depth / 200, 1);
        const opacity = 0.3 + (1 - normalizedDepth) * 0.7; // Range from 0.3 to 1.0

        // Add depth-based color variation (darker when further)
        const depthDarken = 1 - (normalizedDepth * 0.4); // Darken up to 40%
        const colorR = Math.floor(block.r * depthDarken);
        const colorG = Math.floor(block.g * depthDarken);
        const colorB = Math.floor(block.b * depthDarken);

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(block.x + block.width/2, block.y + block.height/2);
        ctx.rotate(block.rotation);

        // Draw block
        ctx.fillStyle = `rgb(${colorR}, ${colorG}, ${colorB})`;
        ctx.fillRect(
            -block.width/2 * block.sizeVariation,
            -block.height/2 * block.sizeVariation,
            block.width * block.sizeVariation,
            block.height * block.sizeVariation
        );

        ctx.restore();
    });
}
