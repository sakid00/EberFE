const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeAllImages() {
  // Optimize background images
  await optimizeBackgroundImages();
  
  // Optimize photo images
  await optimizePhotoImages();
}

async function optimizeBackgroundImages() {
  console.log('🎨 Optimizing background images...');
  const backgroundDir = path.join(__dirname, '../public/background');
  const outputDir = path.join(backgroundDir, 'optimized');
  
  // Create optimized directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const imagesToOptimize = [
    {
      input: 'homepage_header_bg.png',
      output: 'homepage_header_bg_optimized.webp',
      quality: 75,
      width: 1920,
    },
    {
      input: 'container1.png',
      output: 'container1_optimized.webp',
      quality: 80,
      width: 1600,
    },
    {
      input: 'container1-mobile.png',
      output: 'container1_mobile_optimized.webp',
      quality: 80,
      width: 800,
    },
    {
      input: 'site-bg.png',
      output: 'site-bg_optimized.webp',
      quality: 75,
      width: 1920,
    }
  ];

  await processImages(backgroundDir, outputDir, imagesToOptimize, 'background');
}

async function optimizePhotoImages() {
  console.log('📷 Optimizing photo images...');
  const photoDir = path.join(__dirname, '../public/photo');
  const outputDir = path.join(photoDir, 'optimized');
  
  // Create optimized directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const imagesToOptimize = [
    // Large person/photo images
    {
      input: 'chem-person.png',
      output: 'chem-person_optimized.webp',
      quality: 85,
      width: 1200,
    },
    {
      input: 'eber-big-2.png',
      output: 'eber-big-2_optimized.webp',
      quality: 85,
      width: 1200,
    },
    {
      input: 'eber-big-2-mobile.png',
      output: 'eber-big-2-mobile_optimized.webp',
      quality: 85,
      width: 600,
    },
    {
      input: 'field-person.png',
      output: 'field-person_optimized.webp',
      quality: 85,
      width: 800,
    },
    {
      input: 'field_person2.png',
      output: 'field_person2_optimized.webp',
      quality: 85,
      width: 800,
    },
    {
      input: 'field_person3.png',
      output: 'field_person3_optimized.webp',
      quality: 85,
      width: 800,
    },
    {
      input: 'lab-person.png',
      output: 'lab-person_optimized.webp',
      quality: 85,
      width: 800,
    },
    {
      input: 'safety-person.png',
      output: 'safety-person_optimized.webp',
      quality: 85,
      width: 800,
    },
    {
      input: 'tangki-person.png',
      output: 'tangki-person_optimized.webp',
      quality: 85,
      width: 800,
    },
    {
      input: 'header_corporate.png',
      output: 'header_corporate_optimized.webp',
      quality: 85,
      width: 1000,
    },
    {
      input: 'subtract.png',
      output: 'subtract_optimized.webp',
      quality: 85,
      width: 800,
    },
    {
      input: 'subtract-mobile.png',
      output: 'subtract-mobile_optimized.webp',
      quality: 85,
      width: 400,
    },
    {
      input: 'tangki.png',
      output: 'tangki_optimized.webp',
      quality: 85,
      width: 800,
    },
    // Company logos (smaller, higher quality)
    {
      input: 'eternal.png',
      output: 'eternal_optimized.webp',
      quality: 90,
      width: 200,
    },
    {
      input: 'eng.png',
      output: 'eng_optimized.webp',
      quality: 90,
      width: 200,
    },
    {
      input: 'mega.png',
      output: 'mega_optimized.webp',
      quality: 90,
      width: 200,
    },
    {
      input: 'petro.png',
      output: 'petro_optimized.webp',
      quality: 90,
      width: 200,
    },
  ];

  await processImages(photoDir, outputDir, imagesToOptimize, 'photo');
}

async function processImages(inputDir, outputDir, imagesToOptimize, type) {

  for (const image of imagesToOptimize) {
    const inputPath = path.join(inputDir, image.input);
    const outputPath = path.join(outputDir, image.output);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  ${image.input} not found, skipping...`);
      continue;
    }

    try {
      console.log(`🔄 Optimizing ${type} - ${image.input}...`);
      
      const inputStats = fs.statSync(inputPath);
      const inputSizeKB = Math.round(inputStats.size / 1024);
      const inputSizeMB = Math.round(inputSizeKB / 1024 * 100) / 100;

      await sharp(inputPath)
        .resize(image.width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ 
          quality: image.quality,
          effort: 6 // Maximum compression effort
        })
        .toFile(outputPath);

      const outputStats = fs.statSync(outputPath);
      const outputSizeKB = Math.round(outputStats.size / 1024);
      const outputSizeMB = Math.round(outputSizeKB / 1024 * 100) / 100;
      
      const reduction = Math.round((1 - outputStats.size / inputStats.size) * 100);
      
      console.log(`✅ ${type} - ${image.input}: ${inputSizeMB}MB → ${outputSizeMB}MB (${reduction}% reduction)`);
      
    } catch (error) {
      console.error(`❌ Error optimizing ${image.input}:`, error.message);
    }
  }

  console.log(`\n✨ ${type} image optimization complete!`);
  console.log('📁 Optimized images saved to:', outputDir);
}

// Run the optimization
optimizeAllImages().catch(console.error);
