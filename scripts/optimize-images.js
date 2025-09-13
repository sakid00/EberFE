const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeBackgroundImages() {
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
      width: 1920, // Reduce resolution for web use
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

  for (const image of imagesToOptimize) {
    const inputPath = path.join(backgroundDir, image.input);
    const outputPath = path.join(outputDir, image.output);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  ${image.input} not found, skipping...`);
      continue;
    }

    try {
      console.log(`🔄 Optimizing ${image.input}...`);
      
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
      
      console.log(`✅ ${image.input}: ${inputSizeMB}MB → ${outputSizeMB}MB (${reduction}% reduction)`);
      
    } catch (error) {
      console.error(`❌ Error optimizing ${image.input}:`, error.message);
    }
  }

  console.log('\n🎉 Image optimization complete!');
  console.log('📁 Optimized images saved to:', outputDir);
}

// Run the optimization
optimizeBackgroundImages().catch(console.error);
