/**
 * Script to generate sample news data for CyberAware
 * Run this script with: node scripts/generateNewsData.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { faker } = require('@faker-js/faker');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Import the News model
const News = require('../models/newsModel');
const User = require('../models/userModel');

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// News categories from the model
const categories = [
    'Data Breach',
    'Malware',
    'Phishing',
    'Ransomware',
    'Vulnerability',
    'Regulation',
    'Industry News',
    'Other'
];

// Sample sources with matching URLs
const sources = [
    { name: 'Cyber Security News', url: 'https://www.cybersecuritynews.com' },
    { name: 'The Hacker News', url: 'https://thehackernews.com' },
    { name: 'Krebs on Security', url: 'https://krebsonsecurity.com' },
    { name: 'Dark Reading', url: 'https://www.darkreading.com' },
    { name: 'Bleeping Computer', url: 'https://www.bleepingcomputer.com' },
    { name: 'SC Magazine', url: 'https://www.scmagazine.com' },
    { name: 'InfoSecurity Magazine', url: 'https://www.infosecurity-magazine.com' },
    { name: 'CSO Online', url: 'https://www.csoonline.com' },
    { name: 'Security Week', url: 'https://www.securityweek.com' },
    { name: 'Security Affairs', url: 'https://securityaffairs.co' }
];

// Sample image URLs for news articles
const imageUrls = [
    'https://i.ibb.co/8XgH3Qv/cybersecurity1.jpg',
    'https://i.ibb.co/LkBH2xR/cybersecurity2.jpg',
    'https://i.ibb.co/Sv3CPby/cybersecurity3.jpg',
    'https://i.ibb.co/WBnHxF8/cybersecurity4.jpg',
    'https://i.ibb.co/P6F0Pb8/cybersecurity5.jpg',
    'https://i.ibb.co/wS6gzqM/cybersecurity6.jpg',
    'https://i.ibb.co/Nx0kS53/cybersecurity7.jpg',
    'https://i.ibb.co/HGpH0Kx/cybersecurity8.jpg',
    'https://i.ibb.co/YkJxbDF/cybersecurity9.jpg',
    'https://i.ibb.co/rbJbC1W/cybersecurity10.jpg',
    'https://i.ndtvimg.com/i/2017-09/cyber-crime-generic-istock_650x400_81504427706.jpg',
    'https://www.aljazeera.com/wp-content/uploads/2022/10/AP22280461520286.jpg',
    'https://bharatexpress.com/wp-content/uploads/2024/02/nirmala-sitharaman-CM-Yogi.webp'
];

// Generate HTML content for a news article
const generateNewsContent = (category) => {
    const paragraphs = [];

    // Introduction paragraph
    paragraphs.push(`<p>${faker.lorem.paragraph(5)}</p>`);

    // Add a heading
    paragraphs.push(`<h2>${faker.company.catchPhrase()}</h2>`);

    // Details paragraphs with specific content based on category
    let detailsParagraph = '<p>';
    switch (category) {
        case 'Data Breach':
            detailsParagraph += `According to the report, over ${faker.number.int({ min: 10000, max: 1000000 })} records were compromised in this breach, affecting users primarily in ${faker.location.country()}, ${faker.location.country()}, and ${faker.location.country()}. The leaked data reportedly includes ${faker.helpers.arrayElements(['email addresses', 'passwords', 'phone numbers', 'credit card details', 'social security numbers', 'home addresses', 'personal photos'], { min: 2, max: 4 }).join(', ')}.`;
            break;
        case 'Malware':
            detailsParagraph += `This new strain of malware, dubbed "${faker.word.sample().charAt(0).toUpperCase() + faker.word.sample().slice(1)}-${faker.word.sample()}", has primarily targeted ${faker.helpers.arrayElements(['financial institutions', 'healthcare organizations', 'government agencies', 'educational institutions', 'small businesses', 'tech companies'], { min: 1, max: 2 }).join(' and ')}. Researchers at ${faker.company.name()} discovered that it spreads through ${faker.helpers.arrayElements(['phishing emails', 'compromised websites', 'malicious advertisements', 'infected USB drives', 'software vulnerabilities'], { min: 1, max: 2 }).join(' and ')}.`;
            break;
        case 'Phishing':
            detailsParagraph += `The phishing campaign impersonates ${faker.company.name()}, sending emails that claim to offer ${faker.helpers.arrayElements(['account verification', 'security updates', 'prize notifications', 'invoice documents', 'password resets'], { min: 1, max: 2 }).join(' or ')}. Users who click on the malicious links are directed to a convincing clone of the company's website where their credentials are harvested.`;
            break;
        case 'Ransomware':
            detailsParagraph += `The ${faker.word.sample().charAt(0).toUpperCase() + faker.word.sample().slice(1)} ransomware group has demanded ${faker.number.int({ min: 50000, max: 10000000 })} USD in Bitcoin from the affected organizations. The attack has disrupted operations at ${faker.company.name()}, forcing them to shut down ${faker.helpers.arrayElements(['critical systems', 'customer services', 'manufacturing operations', 'online platforms', 'internal communications'], { min: 2, max: 3 }).join(', ')}.`;
            break;
        case 'Vulnerability':
            detailsParagraph += `The vulnerability, tracked as CVE-${faker.number.int({ min: 2022, max: 2024 })}-${faker.number.int({ min: 10000, max: 99999 })}, affects all versions of ${faker.helpers.arrayElements(['Windows', 'Linux', 'MacOS', 'Android', 'iOS', 'Chrome', 'Firefox', 'Safari'], { min: 1, max: 2 }).join(' and ')} prior to the latest update. If exploited, it allows attackers to ${faker.helpers.arrayElements(['execute arbitrary code', 'escalate privileges', 'access sensitive information', 'bypass authentication', 'cause denial of service'], { min: 1, max: 2 }).join(' and ')}.`;
            break;
        case 'Regulation':
            detailsParagraph += `The new cybersecurity regulations will require organizations to implement ${faker.helpers.arrayElements(['multi-factor authentication', 'encryption for sensitive data', 'regular security audits', 'incident response plans', 'employee security training'], { min: 2, max: 3 }).join(', ')}. Companies that fail to comply by ${faker.date.future().toLocaleDateString()} may face fines of up to ${faker.number.int({ min: 10000, max: 10000000 })} USD or ${faker.number.int({ min: 1, max: 10 })}% of their annual revenue.`;
            break;
        case 'Industry News':
            detailsParagraph += `${faker.company.name()} has announced the acquisition of cybersecurity firm ${faker.company.name()} for ${faker.number.int({ min: 100, max: 2000 })} million USD. This strategic move aims to strengthen their ${faker.helpers.arrayElements(['cloud security', 'endpoint protection', 'identity management', 'threat intelligence', 'network security'], { min: 1, max: 2 }).join(' and ')} capabilities.`;
            break;
        default:
            detailsParagraph += faker.lorem.paragraph(4);
    }
    detailsParagraph += '</p>';
    paragraphs.push(detailsParagraph);

    // Add a quote
    paragraphs.push(`<blockquote>"${faker.lorem.sentence(10)}" - ${faker.person.fullName()}, ${faker.person.jobTitle()} at ${faker.company.name()}</blockquote>`);

    // Add another heading
    paragraphs.push(`<h2>Implications for Indian Businesses</h2>`);

    // Add India-specific content
    const indianCities = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'];
    const randomCity = faker.helpers.arrayElement(indianCities);
    paragraphs.push(`<p>In India, particularly in technology hubs like ${randomCity} and ${faker.helpers.arrayElement(indianCities.filter(city => city !== randomCity))}, companies have reported similar incidents. According to ${faker.person.fullName()}, Cybersecurity Expert at ${faker.company.name()}, "Indian organizations need to strengthen their ${faker.helpers.arrayElements(['security infrastructure', 'employee awareness programs', 'incident response capabilities', 'compliance frameworks', 'threat detection systems'], { min: 1, max: 2 }).join(' and ')} to prevent such attacks."</p>`);

    // Add final recommendations
    paragraphs.push(`<h2>Recommendations</h2>`);
    paragraphs.push(`<ul>
    <li>${faker.lorem.sentence()}</li>
    <li>${faker.lorem.sentence()}</li>
    <li>${faker.lorem.sentence()}</li>
    <li>${faker.lorem.sentence()}</li>
  </ul>`);

    // Add a conclusion
    paragraphs.push(`<p>${faker.lorem.paragraph(3)}</p>`);

    return paragraphs.join('\n\n');
};

// Generate news title based on category
const generateNewsTitle = (category) => {
    const titleTemplates = {
        'Data Breach': [
            `Major Data Breach at ${faker.company.name()} Exposes Millions of Indian Users`,
            `${faker.company.name()} Suffers Massive Data Leak, ${faker.number.int({ min: 50000, max: 10000000 })} Records Compromised`,
            `Hackers Steal Sensitive Data from ${faker.company.name()}'s Indian Operations`,
            `New Data Breach Affects ${faker.number.int({ min: 10000, max: 1000000 })} Users in ${faker.helpers.arrayElement(['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai'])}`,
            `${faker.company.buzzVerb()} Data Breach: What Indian Users Need to Know`
        ],
        'Malware': [
            `New Malware Variant Targets Banking Apps in India`,
            `Dangerous "${faker.word.sample().charAt(0).toUpperCase() + faker.word.sample().slice(1)}" Malware Spreads Across Indian Networks`,
            `Researchers Discover Sophisticated Malware Targeting Indian ${faker.helpers.arrayElement(['Government', 'Financial', 'Healthcare', 'Education', 'Retail'])} Sector`,
            `Malware Campaign Exploits Popular Indian ${faker.helpers.arrayElement(['Festival', 'Election', 'Cricket Match', 'Film Release'])} to Spread`,
            `Advanced Malware Found Stealing OTP Codes from Indian Mobile Users`
        ],
        'Phishing': [
            `Massive Phishing Campaign Targets Indian ${faker.helpers.arrayElement(['Bank', 'Tax', 'Government Service', 'E-commerce'])} Users`,
            `Beware: Sophisticated Phishing Attacks Impersonating ${faker.company.name()} in India`,
            `New Phishing Technique Bypasses Traditional Security Measures in Indian Firms`,
            `UPI-Related Phishing Scams Surge in India, Thousands Affected`,
            `Government Warns of Tax-Themed Phishing Emails Targeting Indian Citizens`
        ],
        'Ransomware': [
            `${faker.helpers.arrayElement(['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai'])} ${faker.helpers.arrayElement(['Hospital', 'University', 'Municipality', 'Corporation'])} Hit by Crippling Ransomware Attack`,
            `${faker.word.sample().charAt(0).toUpperCase() + faker.word.sample().slice(1)} Ransomware Group Demands ₹${faker.number.int({ min: 50, max: 500 })} Crore from Indian Firm`,
            `Rising Ransomware Attacks: Why Indian Businesses Are Prime Targets`,
            `Indian ${faker.helpers.arrayElement(['IT', 'Manufacturing', 'Healthcare', 'Education', 'Retail'])} Sector Faces Wave of Ransomware Attacks`,
            `New Ransomware Strain Encrypts Aadhar and KYC Data in Targeted Indian Attacks`
        ],
        'Vulnerability': [
            `Critical Vulnerability Discovered in Widely-Used Indian Government Portal`,
            `Security Flaw in Popular Indian ${faker.helpers.arrayElement(['Banking', 'Shopping', 'Travel', 'Food Delivery', 'Payment'])} App Puts Millions at Risk`,
            `Researchers Find Zero-Day Vulnerability in Software Used by Indian ${faker.helpers.arrayElement(['Banks', 'Hospitals', 'Government Agencies', 'Universities', 'Energy Companies'])}`,
            `Patch Now: High-Severity Vulnerability Affecting Indian Critical Infrastructure`,
            `Unpatched Vulnerabilities Leave 70% of Indian Organizations Exposed to Attacks`
        ],
        'Regulation': [
            `India's New Cybersecurity Framework: What Businesses Need to Know`,
            `Government Announces Stricter Data Protection Rules for ${faker.helpers.arrayElement(['Financial', 'Healthcare', 'Telecom', 'IT', 'E-commerce'])} Sector`,
            `CERT-In Issues New Guidelines for Reporting Cyber Incidents in India`,
            `Indian Regulators Propose Enhanced Security Standards for Cloud Services`,
            `Compliance Deadline Approaches for India's Critical Information Infrastructure Protection`
        ],
        'Industry News': [
            `${faker.company.name()} Launches Advanced Cybersecurity Center in ${faker.helpers.arrayElement(['Bangalore', 'Hyderabad', 'Pune', 'Gurgaon', 'Noida'])}`,
            `Indian Cybersecurity Startup ${faker.company.name()} Raises $${faker.number.int({ min: 10, max: 200 })} Million in Funding`,
            `${faker.company.name()} Partners with ${faker.company.name()} to Strengthen India's Cyber Defenses`,
            `Government Allocates ₹${faker.number.int({ min: 500, max: 10000 })} Crore for National Cybersecurity Projects`,
            `India Cybersecurity Market to Reach $${faker.number.int({ min: 3, max: 20 })} Billion by 2025: Report`
        ],
        'Other': [
            `${faker.number.int({ min: 60, max: 90 })}% of Indian SMEs Lack Basic Cybersecurity Measures, Survey Finds`,
            `Experts Warn of Rising ${faker.helpers.arrayElement(['State-Sponsored', 'AI-Powered', 'Supply Chain', 'IoT', 'Cloud'])} Attacks in India`,
            `Cybersecurity Skills Gap Widens in India as Threats Multiply`,
            `How Work-From-Home Culture Has Changed India's Cybersecurity Landscape`,
            `New Research Reveals Top Cyber Threats Facing Indian Businesses in 2024`
        ]
    };

    return faker.helpers.arrayElement(titleTemplates[category]);
};

// Generate a news article
const generateNewsArticle = async (adminId) => {
    const category = faker.helpers.arrayElement(categories);
    const source = faker.helpers.arrayElement(sources);
    const title = generateNewsTitle(category);

    // Generate description (50-200 words)
    const description = faker.lorem.paragraph({ min: 3, max: 5 });

    // Generate content
    const content = generateNewsContent(category);

    // Random image URL
    const image = faker.helpers.arrayElement(imageUrls);

    // Random view count (0-5000)
    const views = faker.number.int({ min: 0, max: 5000 });

    // 90% chance of being published
    const isPublished = Math.random() < 0.9;

    // Create date between 1-180 days ago
    const createdAt = faker.date.past({ days: 180 });

    return {
        title,
        description,
        content,
        image,
        source: source.name,
        sourceUrl: source.url,
        category,
        author: adminId,
        views,
        isPublished,
        createdAt
    };
};

// Generate and save news data
const generateData = async () => {
    try {
        const fs = require('fs');
        const path = require('path');
        const logPath = path.join(__dirname, 'data-generation.log');

        const log = (message) => {
            console.log(message);
            fs.appendFileSync(logPath, message + '\n');
        };

        log('Starting data generation process...');
        await connectDB();
        log('Connected to database');

        // Find an admin user
        const admin = await User.findOne({ role: 'admin' });

        if (!admin) {
            log('No admin user found. Please create an admin user first.');
            process.exit(1);
        }

        log(`Found admin user: ${admin._id} - ${admin.name || admin.email}`);

        // Clear existing news
        await News.deleteMany({});
        log('Existing news data cleared');

        // Generate news articles
        const newsArticles = [];
        const numberOfArticles = 50; // Generate 50 articles

        for (let i = 0; i < numberOfArticles; i++) {
            log(`Generating article ${i + 1}/${numberOfArticles}...`);
            const newsArticle = await generateNewsArticle(admin._id);
            newsArticles.push(newsArticle);
        }

        log('All articles generated, saving to database...');

        // Save to database
        await News.insertMany(newsArticles);

        log(`${numberOfArticles} news articles generated successfully`);

        // Write sample data to file
        const sampleNews = newsArticles.slice(0, 5).map((article, i) =>
            `${i + 1}. [${article.category}] ${article.title}`
        ).join('\n');

        fs.writeFileSync(
            path.join(__dirname, 'sample-news.txt'),
            `SAMPLE NEWS ARTICLES:\n\n${sampleNews}\n\nTotal articles generated: ${numberOfArticles}`
        );

        log('Sample data written to sample-news.txt');
        process.exit(0);
    } catch (error) {
        console.error('Error generating data:', error);
        fs.writeFileSync(path.join(__dirname, 'error.log'), error.toString());
        process.exit(1);
    }
};

// Run the script
generateData();
