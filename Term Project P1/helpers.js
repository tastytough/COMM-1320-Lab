
function grayImage (pixels) {
    for (var y = 0; y < pixels.height; y++) {
        for (var x = 0; x < pixels.width; x++) {
          var idx = (pixels.width * y + x) << 2;
  
          const gray = ((pixels.data[idx] + pixels.data[idx + 1] + pixels.data[idx + 2])/3);
          
          pixels.data[idx] = gray;
          pixels.data[idx + 1] = gray;
          pixels.data[idx + 2] = gray;
        }
      }
      return pixels;
    };

function sepiaImage (pixels) {
  for (let y = 0; y < pixels.height; y++) {
    for (let x = 0; x < pixels.width; x++) {
      let idx = (pixels.width * y + x) << 2;
      
      const newRed =   (0.393 * pixels.data[idx] + 0.769 * pixels.data[idx + 1] + 0.189 * pixels.data[idx + 2]);
      const newGreen = (0.349 * pixels.data[idx] + 0.686 * pixels.data[idx + 1] + 0.168 * pixels.data[idx + 2]);
      const newBlue =  (0.272 * pixels.data[idx] + 0.534 * pixels.data[idx + 1] + 0.131 * pixels.data[idx + 2]);
      
      pixels.data[idx] = Math.min(255, newRed);
      pixels.data[idx + 1] = Math.min(255, newGreen);
      pixels.data[idx + 2] = Math.min(255, newBlue);;
    }
  }
  return pixels;
};

module.exports = { grayImage, sepiaImage };
