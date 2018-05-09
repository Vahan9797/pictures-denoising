const Denoiser = require('./build/Release/denoiser');

console.log(Denoiser.hasImageColors('/home/vahan/Desktop/noisy_flower.jpeg'));
console.log(Denoiser.singleDenoisingColored('/home/vahan/Desktop/noisy_flower.jpg', '/home/vahan/Desktop/denoised_flower.jpg'));
console.log(Denoiser.hasImageColors('/home/vahan/Desktop/noisy_astronauts.jpeg'));
console.log(Denoiser.singleDenoisingGrayscale('/home/vahan/Desktop/noisy_astronauts.jpeg', '/home/vahan/Desktop/denoised_astronauts.jpeg'));
console.log(Denoiser.hasImageColors('/home/vahan/Desktop/Lenna-image-300300-a-Noisy-image-corrupted-by-Gaussian-noise-for-s35-b-Original.png'));
console.log(Denoiser.singleDenoisingGrayscale(
	'/home/vahan/Desktop/Lenna-image-300300-a-Noisy-image-corrupted-by-Gaussian-noise-for-s35-b-Original.png',
	'/home/vahan/Desktop/Lenna-image-300300-a-Noisy-image-denoised-by-Gaussian-noise-for-s35-b-Original.png'
));