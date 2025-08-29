const fs = require('fs');
const path = require('path');

// Suburb data with coordinates and postcodes
const suburbData = {
  'Huntingdale': { lat: -37.9104, lng: 145.1088, postcode: '3166' },
  'Mount Waverley': { lat: -37.8771, lng: 145.1317, postcode: '3149' },
  'Glen Waverley': { lat: -37.8770, lng: 145.1614, postcode: '3150' },
  'Chadstone': { lat: -37.8857, lng: 145.1049, postcode: '3148' },
  'Malvern East': { lat: -37.8794, lng: 145.0647, postcode: '3145' },
  'Carnegie': { lat: -37.8888, lng: 145.0580, postcode: '3163' },
  'Mulgrave': { lat: -37.9308, lng: 145.1708, postcode: '3170' },
  'Wheelers Hill': { lat: -37.9063, lng: 145.1945, postcode: '3150' },
  'Notting Hill': { lat: -37.9054, lng: 145.1310, postcode: '3168' },
  'Burwood': { lat: -37.8484, lng: 145.1130, postcode: '3125' },
  'Camberwell': { lat: -37.8237, lng: 145.0582, postcode: '3124' },
  'Box Hill': { lat: -37.8197, lng: 145.1231, postcode: '3128' },
  'Blackburn': { lat: -37.8157, lng: 145.1487, postcode: '3130' },
  'Mitcham': { lat: -37.8171, lng: 145.1936, postcode: '3132' },
  'Ringwood': { lat: -37.8146, lng: 145.2279, postcode: '3134' },
  'Forest Hill': { lat: -37.8332, lng: 145.1890, postcode: '3131' },
  'Vermont': { lat: -37.8296, lng: 145.1612, postcode: '3133' },
  'Nunawading': { lat: -37.8178, lng: 145.1750, postcode: '3131' },
  'Doncaster': { lat: -37.7871, lng: 145.1242, postcode: '3108' },
  'Templestowe': { lat: -37.7593, lng: 145.1458, postcode: '3106' },
  'Bulleen': { lat: -37.7622, lng: 145.0848, postcode: '3105' },
  'Ivanhoe': { lat: -37.7709, lng: 145.0441, postcode: '3079' },
  'Heidelberg': { lat: -37.7541, lng: 145.0613, postcode: '3084' },
  'Preston': { lat: -37.7448, lng: 145.0043, postcode: '3072' },
  'Thornbury': { lat: -37.7619, lng: 144.9994, postcode: '3071' },
  'Northcote': { lat: -37.7692, lng: 144.9966, postcode: '3070' },
  'Fitzroy': { lat: -37.7988, lng: 144.9785, postcode: '3065' },
  'Carlton': { lat: -37.7980, lng: 144.9665, postcode: '3053' },
  'Melbourne CBD': { lat: -37.8136, lng: 144.9631, postcode: '3000' },
  'South Yarra': { lat: -37.8395, lng: 144.9932, postcode: '3141' },
  'Toorak': { lat: -37.8466, lng: 145.0134, postcode: '3142' },
  'Armadale': { lat: -37.8557, lng: 145.0149, postcode: '3143' },
  'Prahran': { lat: -37.8509, lng: 144.9957, postcode: '3181' },
  'Windsor': { lat: -37.8578, lng: 144.9890, postcode: '3181' },
  'St Kilda': { lat: -37.8679, lng: 144.9810, postcode: '3182' },
  'Brighton': { lat: -37.9061, lng: 145.0108, postcode: '3186' },
  'Moorabbin': { lat: -37.9423, lng: 145.0515, postcode: '3189' },
  'Bentleigh': { lat: -37.9204, lng: 145.0416, postcode: '3204' },
  'Ormond': { lat: -37.8989, lng: 145.0387, postcode: '3204' },
  'McKinnon': { lat: -37.8989, lng: 145.0587, postcode: '3204' },
  'Hampton': { lat: -37.9291, lng: 145.0236, postcode: '3188' },
  'Sandringham': { lat: -37.9504, lng: 145.0104, postcode: '3191' },
  'Cheltenham': { lat: -37.9613, lng: 145.0520, postcode: '3192' },
  'Mentone': { lat: -37.9825, lng: 145.0639, postcode: '3194' },
  'Mordialloc': { lat: -38.0020, lng: 145.0876, postcode: '3195' },
  'Braeside': { lat: -37.9700, lng: 145.1020, postcode: '3195' },
  'Dandenong': { lat: -37.9874, lng: 145.2155, postcode: '3175' },
  'Keysborough': { lat: -38.0135, lng: 145.1735, postcode: '3173' },
  'Noble Park': { lat: -37.9707, lng: 145.1762, postcode: '3174' },
  'Springvale': { lat: -37.9506, lng: 145.1508, postcode: '3171' },
  'Doveton': { lat: -37.9638, lng: 145.2394, postcode: '3177' },
  'Hallam': { lat: -38.0173, lng: 145.2669, postcode: '3803' },
  'Berwick': { lat: -38.0314, lng: 145.3517, postcode: '3806' },
  'Pakenham': { lat: -38.0697, lng: 145.4839, postcode: '3810' },
  'Cranbourne': { lat: -38.0960, lng: 145.2824, postcode: '3977' },
  'Frankston': { lat: -38.1342, lng: 145.1237, postcode: '3199' },
  'Seaford': { lat: -38.1047, lng: 145.1376, postcode: '3198' },
  'Carrum': { lat: -38.0766, lng: 145.1200, postcode: '3197' },
  'Chelsea': { lat: -38.0503, lng: 145.1181, postcode: '3196' },
  'Bonbeach': { lat: -38.0604, lng: 145.1115, postcode: '3196' },
  'Aspendale': { lat: -38.0252, lng: 145.1014, postcode: '3195' }
};

// Keyword variations and their templates
const keywordTemplates = {
  'speaker-hire-near': {
    title: 'Speaker Hire Near {suburb} VIC | Professional Audio Equipment | Same Day Pickup',
    description: 'Speaker Hire Near {suburb} VIC 🎵 JBL PartyBox 710 & Vonyx 1000W speakers available for hire near {suburb}. Same-day pickup Melbourne. Premium audio equipment rental.',
    keywords: 'speaker hire near {suburb}, professional speaker hire {suburb}, audio equipment hire {suburb} VIC, sound system hire near {suburb}, JBL speaker hire {suburb}, event speakers {suburb}, speaker rental near me {suburb}',
    ogTitle: 'Speaker Hire Near {suburb} VIC - Professional Audio Equipment',
    ogDescription: 'Professional speaker hire services near {suburb} VIC. JBL PartyBox 710, Vonyx 1000W speakers for events, parties, weddings. Same-day pickup available.',
    h1: 'Speaker Hire Near {suburb} VIC',
    serviceType: 'Speaker Hire',
    catalogName: 'Speaker Hire Services Near {suburb}',
    smsBody: 'Hi, what speakers are available near {suburb}?',
    addressStreet: 'Near {suburb}',
    businessName: 'Speaker Hire Near {suburb} - Professional Audio Equipment'
  },
  'party-speakers': {
    title: 'Party Speakers {suburb} VIC | Perfect Audio for Celebrations | Same Day Pickup',
    description: 'Party Speakers {suburb} VIC 🎉 JBL PartyBox 710 & Vonyx 1000W speakers perfect for parties in {suburb}. Same-day pickup Melbourne. Premium audio equipment rental.',
    keywords: 'party speakers {suburb}, party speaker hire {suburb} VIC, birthday party speakers {suburb}, celebration speakers {suburb}, party audio equipment hire {suburb}, JBL party speakers {suburb}, event speakers {suburb}',
    ogTitle: 'Party Speakers {suburb} VIC - Perfect Audio for Celebrations',
    ogDescription: 'Professional party speaker hire services in {suburb} VIC. JBL PartyBox 710, Vonyx 1000W speakers perfect for birthdays, celebrations, parties.',
    h1: 'Party Speakers {suburb} VIC',
    serviceType: 'Party Speaker Hire',
    catalogName: 'Party Speaker Hire Services {suburb}',
    smsBody: 'Hi, what party speakers are available in {suburb}?',
    addressStreet: '{suburb}',
    businessName: 'Party Speakers {suburb} - Professional Audio Equipment'
  },
  'wedding-speakers': {
    title: 'Wedding Speakers {suburb} VIC | Perfect Audio for Your Special Day | Same Day Pickup',
    description: 'Wedding Speakers {suburb} VIC 💒 JBL PartyBox 710 & Vonyx 1000W speakers perfect for weddings in {suburb}. Same-day pickup Melbourne. Premium audio equipment rental.',
    keywords: 'wedding speakers {suburb}, wedding speaker hire {suburb} VIC, bridal speakers {suburb}, ceremony speakers {suburb}, wedding audio equipment hire {suburb}, JBL wedding speakers {suburb}, reception speakers {suburb}',
    ogTitle: 'Wedding Speakers {suburb} VIC - Perfect Audio for Your Special Day',
    ogDescription: 'Professional wedding speaker hire services in {suburb} VIC. JBL PartyBox 710, Vonyx 1000W speakers perfect for ceremonies, receptions, celebrations.',
    h1: 'Wedding Speakers {suburb} VIC',
    serviceType: 'Wedding Speaker Hire',
    catalogName: 'Wedding Speaker Hire Services {suburb}',
    smsBody: 'Hi, what wedding speakers are available in {suburb}?',
    addressStreet: '{suburb}',
    businessName: 'Wedding Speakers {suburb} - Professional Audio Equipment'
  },
  'event-speakers': {
    title: 'Event Speakers {suburb} VIC | Professional Audio for Functions | Same Day Pickup',
    description: 'Event Speakers {suburb} VIC 🎪 JBL PartyBox 710 & Vonyx 1000W speakers perfect for events in {suburb}. Same-day pickup Melbourne. Premium audio equipment rental.',
    keywords: 'event speakers {suburb}, event speaker hire {suburb} VIC, corporate event speakers {suburb}, function speakers {suburb}, event audio equipment hire {suburb}, JBL event speakers {suburb}, conference speakers {suburb}',
    ogTitle: 'Event Speakers {suburb} VIC - Professional Audio for Functions',
    ogDescription: 'Professional event speaker hire services in {suburb} VIC. JBL PartyBox 710, Vonyx 1000W speakers perfect for corporate events, conferences, functions.',
    h1: 'Event Speakers {suburb} VIC',
    serviceType: 'Event Speaker Hire',
    catalogName: 'Event Speaker Hire Services {suburb}',
    smsBody: 'Hi, what event speakers are available in {suburb}?',
    addressStreet: '{suburb}',
    businessName: 'Event Speakers {suburb} - Professional Audio Equipment'
  },
  'jbl-speaker-hire': {
    title: 'JBL Speaker Hire {suburb} VIC | Premium JBL Audio Equipment | Same Day Pickup',
    description: 'JBL Speaker Hire {suburb} VIC 🔊 JBL PartyBox 710 & premium JBL speakers available for hire in {suburb}. Same-day pickup Melbourne. Professional JBL audio equipment rental.',
    keywords: 'JBL speaker hire {suburb}, JBL PartyBox hire {suburb} VIC, JBL audio equipment {suburb}, JBL sound system hire {suburb}, professional JBL speakers {suburb}, JBL rental {suburb}, JBL speaker system {suburb}',
    ogTitle: 'JBL Speaker Hire {suburb} VIC - Premium JBL Audio Equipment',
    ogDescription: 'Professional JBL speaker hire services in {suburb} VIC. JBL PartyBox 710 and premium JBL audio systems for events, parties, functions. Same-day pickup available.',
    h1: 'JBL Speaker Hire {suburb} VIC',
    serviceType: 'JBL Speaker Hire',
    catalogName: 'JBL Speaker Hire Services {suburb}',
    smsBody: 'Hi, what JBL speakers are available in {suburb}?',
    addressStreet: '{suburb}',
    businessName: 'JBL Speaker Hire {suburb} - Premium JBL Audio Equipment'
  },
  'audio-equipment-hire': {
    title: 'Audio Equipment Hire {suburb} VIC | Professional Sound Systems | Same Day Pickup',
    description: 'Audio Equipment Hire {suburb} VIC 🎚️ JBL PartyBox 710, Vonyx 1000W speakers & professional audio equipment for hire in {suburb}. Same-day pickup Melbourne.',
    keywords: 'audio equipment hire {suburb}, professional audio hire {suburb} VIC, sound equipment rental {suburb}, audio system hire {suburb}, microphone hire {suburb}, PA system hire {suburb}, audio gear rental {suburb}',
    ogTitle: 'Audio Equipment Hire {suburb} VIC - Professional Sound Systems',
    ogDescription: 'Professional audio equipment hire services in {suburb} VIC. JBL PartyBox 710, Vonyx 1000W speakers, microphones and PA systems for events, parties, functions.',
    h1: 'Audio Equipment Hire {suburb} VIC',
    serviceType: 'Audio Equipment Hire',
    catalogName: 'Audio Equipment Hire Services {suburb}',
    smsBody: 'Hi, what audio equipment is available in {suburb}?',
    addressStreet: '{suburb}',
    businessName: 'Audio Equipment Hire {suburb} - Professional Sound Systems'
  },
  'sound-system-rental': {
    title: 'Sound System Rental {suburb} VIC | Professional Audio Systems | Same Day Pickup',
    description: 'Sound System Rental {suburb} VIC 🎛️ JBL PartyBox 710 & Vonyx 1000W sound systems for rental in {suburb}. Same-day pickup Melbourne. Professional audio rentals.',
    keywords: 'sound system rental {suburb}, sound system hire {suburb} VIC, PA system rental {suburb}, audio system hire {suburb}, professional sound rental {suburb}, speaker system hire {suburb}, sound equipment rental {suburb}',
    ogTitle: 'Sound System Rental {suburb} VIC - Professional Audio Systems',
    ogDescription: 'Professional sound system rental services in {suburb} VIC. JBL PartyBox 710, Vonyx 1000W systems and PA equipment for events, parties, functions.',
    h1: 'Sound System Rental {suburb} VIC',
    serviceType: 'Sound System Rental',
    catalogName: 'Sound System Rental Services {suburb}',
    smsBody: 'Hi, what sound systems are available for rental in {suburb}?',
    addressStreet: '{suburb}',
    businessName: 'Sound System Rental {suburb} - Professional Audio Systems'
  },
  'birthday-party-speakers': {
    title: 'Birthday Party Speakers {suburb} VIC | Perfect Audio for Celebrations | Same Day Pickup',
    description: 'Birthday Party Speakers {suburb} VIC 🎂 JBL PartyBox 710 & Vonyx 1000W speakers perfect for birthday parties in {suburb}. Same-day pickup Melbourne. Premium audio rental.',
    keywords: 'birthday party speakers {suburb}, birthday speaker hire {suburb} VIC, kids party speakers {suburb}, birthday celebration speakers {suburb}, party audio equipment {suburb}, JBL birthday speakers {suburb}, children\'s party speakers {suburb}',
    ogTitle: 'Birthday Party Speakers {suburb} VIC - Perfect Audio for Celebrations',
    ogDescription: 'Professional birthday party speaker hire services in {suburb} VIC. JBL PartyBox 710, Vonyx 1000W speakers perfect for birthday celebrations, kids parties.',
    h1: 'Birthday Party Speakers {suburb} VIC',
    serviceType: 'Birthday Party Speaker Hire',
    catalogName: 'Birthday Party Speaker Hire Services {suburb}',
    smsBody: 'Hi, what birthday party speakers are available in {suburb}?',
    addressStreet: '{suburb}',
    businessName: 'Birthday Party Speakers {suburb} - Professional Audio Equipment'
  },
  'corporate-event-speakers': {
    title: 'Corporate Event Speakers {suburb} VIC | Professional Audio for Business | Same Day Pickup',
    description: 'Corporate Event Speakers {suburb} VIC 🏢 JBL PartyBox 710 & Vonyx 1000W speakers perfect for corporate events in {suburb}. Same-day pickup available. Professional audio rental.',
    keywords: 'corporate event speakers {suburb}, corporate speaker hire {suburb}, business event speakers {suburb}, conference speakers {suburb} VIC, corporate audio equipment {suburb}, professional event speakers {suburb}, corporate sound system {suburb}',
    ogTitle: 'Corporate Event Speakers {suburb} VIC - Professional Audio for Business',
    ogDescription: 'Professional corporate event speaker hire services in {suburb} VIC. JBL PartyBox 710, Vonyx 1000W speakers perfect for conferences, presentations, corporate functions.',
    h1: 'Corporate Event Speakers {suburb} VIC',
    serviceType: 'Corporate Event Speaker Hire',
    catalogName: 'Corporate Event Speaker Hire Services {suburb}',
    smsBody: 'Hi, what corporate event speakers are available in {suburb}?',
    addressStreet: '{suburb}',
    businessName: 'Corporate Event Speakers {suburb} - Professional Audio Equipment'
  },
  'dj-equipment-hire': {
    title: 'DJ Equipment Hire {suburb} VIC | Professional DJ Audio Systems | Same Day Pickup',
    description: 'DJ Equipment Hire {suburb} VIC 🎧 JBL PartyBox 710 & Vonyx 1000W DJ equipment for hire in {suburb}. Same-day pickup Melbourne. Professional DJ audio rental.',
    keywords: 'DJ equipment hire {suburb}, DJ speaker hire {suburb} VIC, DJ sound system {suburb}, DJ audio equipment {suburb}, professional DJ hire {suburb}, DJ gear rental {suburb}, party DJ equipment {suburb}',
    ogTitle: 'DJ Equipment Hire {suburb} VIC - Professional DJ Audio Systems',
    ogDescription: 'Professional DJ equipment hire services in {suburb} VIC. JBL PartyBox 710, Vonyx 1000W speakers and DJ systems for parties, events, celebrations.',
    h1: 'DJ Equipment Hire {suburb} VIC',
    serviceType: 'DJ Equipment Hire',
    catalogName: 'DJ Equipment Hire Services {suburb}',
    smsBody: 'Hi, what DJ equipment is available for hire in {suburb}?',
    addressStreet: '{suburb}',
    businessName: 'DJ Equipment Hire {suburb} - Professional DJ Audio Systems'
  }
};

function generateHtmlContent(keyword, suburb, suburbInfo, template) {
  const fileName = `${keyword}-${suburb.toLowerCase().replace(/\s+/g, '-')}.html`;
  
  return `<!DOCTYPE html>
<html lang="en-AU" itemscope itemtype="http://schema.org/LocalBusiness">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${template.description.replace(/{suburb}/g, suburb)}" />
  <meta name="keywords" content="${template.keywords.replace(/{suburb}/g, suburb)}" />
  <meta name="author" content="Speaker Rental - Clayton" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="http://speakerrentalclayton.jayveertech.com/${fileName}" />
  <meta property="og:title" content="${template.ogTitle.replace(/{suburb}/g, suburb)}" />
  <meta property="og:description" content="${template.ogDescription.replace(/{suburb}/g, suburb)}" />
  <meta property="og:image" content="http://speakerrentalclayton.jayveertech.com/images/JBL710.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="en_AU" />
  <meta property="og:site_name" content="Speaker Rental - Clayton" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${template.ogTitle.replace(/{suburb}/g, suburb)}" />
  <meta name="twitter:description" content="${template.description.replace(/{suburb}/g, suburb)}" />
  <meta name="twitter:image" content="http://speakerrentalclayton.jayveertech.com/images/JBL710.png" />
  
  <!-- Additional SEO Meta Tags -->
  <meta name="geo.region" content="AU-VIC" />
  <meta name="geo.placename" content="${suburb}, Victoria" />
  <meta name="geo.position" content="${suburbInfo.lat};${suburbInfo.lng}" />
  <meta name="ICBM" content="${suburbInfo.lat}, ${suburbInfo.lng}" />
  <meta name="theme-color" content="#6366f1" />
  <meta name="msapplication-TileColor" content="#6366f1" />
  
  <!-- Local Business Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "http://speakerrentalclayton.jayveertech.com/${fileName}",
    "name": "${template.businessName.replace(/{suburb}/g, suburb)}",
    "image": "http://speakerrentalclayton.jayveertech.com/images/speaker-emoji.png",
    "url": "http://speakerrentalclayton.jayveertech.com/${fileName}",
    "telephone": "+61435341103",
    "email": "anshu@jayveertech.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "${template.addressStreet.replace(/{suburb}/g, suburb)}",
      "addressLocality": "${suburb}",
      "addressRegion": "VIC",
      "postalCode": "${suburbInfo.postcode}",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": ${suburbInfo.lat},
      "longitude": ${suburbInfo.lng}
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
      ],
      "opens": "08:00",
      "closes": "20:00"
    },
    "priceRange": "$49-$69",
    "description": "${template.ogDescription.replace(/{suburb}/g, suburb)}",
    "areaServed": [{"@type": "City", "name": "${suburb}"}, {"@type": "City", "name": "Melbourne"}, {"@type": "State", "name": "Victoria"}],
    "serviceType": "${template.serviceType}",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "${template.catalogName.replace(/{suburb}/g, suburb)}",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "JBL PartyBox 710",
            "description": "800W powerful speaker with music sync lights"
          },
          "price": "49",
          "priceCurrency": "AUD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Vonyx 1000W Professional",
            "description": "1000W dual speaker system"
          },
          "price": "49",
          "priceCurrency": "AUD"
        }
      ]
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.9",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Customer Reviews"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "147"
    }
  }
  </script>
  
  <title>${template.title.replace(/{suburb}/g, suburb)}</title>
  <link rel="canonical" href="http://speakerrentalclayton.jayveertech.com/${fileName}" />
  <link rel="icon" type="image/png" href="images/speaker-emoji.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
  <meta name="google-site-verification" content="TXNIYjZ4o4L0o8TyY0w0Du76JC0AwgzedRcOi2Q2oZc" />
  
  <!-- Preload critical resources for Core Web Vitals -->
  <link rel="preload" href="styles.css" as="style" />
  <link rel="preload" href="images/speaker-emoji.png" as="image" />
  <link rel="preload" href="images/JBL710.png" as="image" />
  <link rel="preload" href="images/vonyx 1000watt.png" as="image" />
  
  <link rel="stylesheet" href="styles.css" />
  
  <!-- DNS prefetch for performance -->
  <link rel="dns-prefetch" href="//fonts.googleapis.com" />
  <link rel="dns-prefetch" href="//fonts.gstatic.com" />

  <!-- Redirect to main page after 1 second for SEO -->
  <script>
    setTimeout(function() {
      window.location.href = '/';
    }, 1000);
  </script>

</head>

<body>
  <!-- Header -->
  <header class="header">
    <div class="container">
      <div class="header-content">
        <a href="/" class="logo" title="Speaker Rental Clayton VIC - Professional Sound Equipment Hire">Speaker Rental - Clayton</a>
        <div class="header-cta">
          <a href="sms:+61435341103?body=${encodeURIComponent(template.smsBody.replace(/{suburb}/g, suburb))}" class="header-text">
            TEXT NOW
          </a>
        </div>
      </div>
    </div>
  </header>

  <main>
    <!-- SEO Page Notice -->
    <section style="padding: 10rem 0 2rem; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="container">
        <h1 style="color: white; font-size: 3rem; margin-bottom: 1rem;">${template.h1.replace(/{suburb}/g, suburb)}</h1>
        <p style="color: white; font-size: 1.25rem; margin-bottom: 2rem;">Redirecting you to our main page with all ${template.serviceType.toLowerCase()} options...</p>
        <div style="animation: pulse 2s infinite;">
          <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid white; border-top: 4px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        </div>
      </div>
    </section>
  </main>

  <style>
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  </style>
</body>
</html>`;
}

// Generate pages for each suburb and keyword combination
let generatedCount = 0;
const maxPages = 150; // Limit to prevent too many files

console.log('Starting to generate SEO pages...');

for (const suburb in suburbData) {
  if (generatedCount >= maxPages) break;
  
  const suburbInfo = suburbData[suburb];
  
  // Generate 1-2 pages per suburb with different keyword variations
  const keywordKeys = Object.keys(keywordTemplates);
  
  // For each suburb, use 2-3 random keyword variations to avoid too many files
  const usedKeywords = keywordKeys.slice(0, Math.min(3, keywordKeys.length));
  
  for (const keyword of usedKeywords) {
    if (generatedCount >= maxPages) break;
    
    const template = keywordTemplates[keyword];
    const fileName = `${keyword}-${suburb.toLowerCase().replace(/\s+/g, '-')}.html`;
    const content = generateHtmlContent(keyword, suburb, suburbInfo, template);
    
    try {
      fs.writeFileSync(fileName, content, 'utf8');
      console.log(`Generated: ${fileName}`);
      generatedCount++;
    } catch (error) {
      console.error(`Error generating ${fileName}:`, error);
    }
  }
}

console.log(`\nGeneration complete! Created ${generatedCount} SEO pages.`);
console.log('\nTo run this script:');
console.log('1. Make sure you have Node.js installed');
console.log('2. Run: node generate-seo-pages.js');
console.log('3. All HTML files will be created in the current directory');