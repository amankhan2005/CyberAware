'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Modal component
const ArticleModal = ({ article, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-6 pt-12 pb-8">
            <div className="mb-4">
              <span className="bg-red-900/30 text-red-400 text-xs font-medium px-2.5 py-1 rounded-full">
                {article.category}
              </span>
              <span className="ml-2 text-sm text-gray-400">{article.readTime} • {article.date}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{article.title}</h3>
            <div 
              className="prose prose-invert max-w-none prose-red"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PhishingAndAttacksPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Articles data
  const articles = [
    {
      id: 1,
      title: 'Phishing Emails: The Deceptive Gateway',
      category: 'phishing',
      preview: 'How cybercriminals craft convincing emails to steal your information.',
      image: '/images/phishing-email.jpg',
      readTime: '5 min read',
      date: 'Aug 10, 2023',
      content: `
        Phishing emails remain one of the most common and effective attack vectors used by cybercriminals. These deceptive messages are designed to appear legitimate, often mimicking trusted organizations like banks, government agencies, or popular services.
        
        <h4>Warning Signs</h4>
        <ul>
          <li>Urgent requests for personal information</li>
          <li>Spelling and grammar errors</li>
          <li>Mismatched or suspicious URLs</li>
          <li>Generic greetings instead of your name</li>
          <li>Unexpected attachments</li>
        </ul>
        
        <h4>Prevention Tips</h4>
        <ul>
          <li>Never click suspicious links or download unexpected attachments</li>
          <li>Verify the sender's email address carefully</li>
          <li>Hover over links to preview URLs before clicking</li>
          <li>Use multi-factor authentication</li>
          <li>Keep your email security software updated</li>
        </ul>
      `
    },
    {
      id: 2,
      title: 'Spear Phishing: When Attackers Get Personal',
      category: 'phishing',
      preview: 'Targeted attacks that use your personal information to create highly convincing scams.',
      image: '/images/spear-phishing.jpg',
      readTime: '6 min read',
      date: 'Sep 5, 2023',
      content: `
        Unlike generic phishing attempts, spear phishing attacks are highly targeted. Attackers research their victims and customize messages using personal information gathered from social media, data breaches, or public records to create exceptionally convincing scams.
        
        <h4>Warning Signs</h4>
        <ul>
          <li>Emails containing accurate personal information</li>
          <li>References to your colleagues, managers, or organization</li>
          <li>Highly convincing imitations of internal communications</li>
          <li>Requests that bypass normal security procedures</li>
        </ul>
        
        <h4>Prevention Tips</h4>
        <ul>
          <li>Limit the personal information you share online</li>
          <li>Verify requests for sensitive information via phone or in person</li>
          <li>Be wary of unexpected communications, even if they appear to be from colleagues</li>
          <li>Implement security awareness training in your organization</li>
        </ul>
      `
    },
    {
      id: 3,
      title: 'Smishing: Text Message Scams',
      category: 'phishing',
      preview: 'How attackers use SMS messages to trick you into revealing sensitive information.',
      image: '/images/smishing.jpg',
      readTime: '4 min read',
      date: 'Oct 12, 2023',
      content: `
        Smishing (SMS phishing) uses text messages as an attack vector. These messages often contain malicious links or request sensitive information, exploiting the trust and immediacy associated with text messages.
        
        <h4>Warning Signs</h4>
        <ul>
          <li>Texts claiming to be from banks or services requiring urgent action</li>
          <li>Messages with shortened URLs</li>
          <li>Requests for personal information via text</li>
          <li>Offers that seem too good to be true</li>
        </ul>
        
        <h4>Prevention Tips</h4>
        <ul>
          <li>Never click links in unexpected text messages</li>
          <li>Don't reply to suspicious messages</li>
          <li>Block and report suspicious numbers</li>
          <li>Contact companies directly using official channels if you're concerned</li>
          <li>Use anti-spam features provided by your mobile carrier</li>
        </ul>
      `
    },
    {
      id: 4,
      title: 'Vishing: Voice Call Deception',
      category: 'phishing',
      preview: 'Phone-based attacks that manipulate victims through social engineering.',
      image: '/images/vishing.jpg',
      readTime: '5 min read',
      date: 'Nov 8, 2023',
      content: `
        Vishing (voice phishing) attacks use phone calls to trick victims into divulging sensitive information or taking actions that benefit the attacker. These calls often create a sense of urgency or fear to manipulate victims.
        
        <h4>Warning Signs</h4>
        <ul>
          <li>Callers claiming to be from tech support, the IRS, or your bank</li>
          <li>Requests for immediate action to avoid penalties or problems</li>
          <li>Pressure to provide personal information or financial details</li>
          <li>Use of automated voice systems that sound like legitimate organizations</li>
        </ul>
        
        <h4>Prevention Tips</h4>
        <ul>
          <li>Hang up and call the organization directly using the official number</li>
          <li>Never provide sensitive information to incoming callers</li>
          <li>Be skeptical of caller ID as it can be spoofed</li>
          <li>Register your number with the Do Not Call Registry</li>
          <li>Use call blocking features for known scam numbers</li>
        </ul>
      `
    },
    {
      id: 5,
      title: 'Ransomware: When Your Data Is Held Hostage',
      category: 'malware',
      preview: 'How cybercriminals encrypt your files and demand payment for their release.',
      image: '/images/ransomware.jpg',
      readTime: '7 min read',
      date: 'Dec 3, 2023',
      content: `
        Ransomware is malicious software that encrypts files or locks computer systems, demanding payment (usually in cryptocurrency) for the decryption key. These attacks can target individuals, businesses, and even critical infrastructure.
        
        <h4>Warning Signs</h4>
        <ul>
          <li>Inability to access files or systems</li>
          <li>Ransom demand messages on your screen</li>
          <li>Files with strange extensions</li>
          <li>Suspicious emails with attachments or links received before the attack</li>
        </ul>
        
        <h4>Prevention Tips</h4>
        <ul>
          <li>Maintain regular, offline backups of important data</li>
          <li>Keep operating systems and software updated</li>
          <li>Use reputable antivirus and anti-malware software</li>
          <li>Implement network segmentation</li>
          <li>Train employees to recognize phishing attempts</li>
          <li>Restrict user privileges to prevent unauthorized software installation</li>
        </ul>
      `
    },
    {
      id: 6,
      title: 'Business Email Compromise (BEC)',
      category: 'social',
      preview: 'Sophisticated scams targeting organizations and their financial transactions.',
      image: '/images/bec.jpg',
      readTime: '6 min read',
      date: 'Jan 15, 2024',
      content: `
        Business Email Compromise (BEC) attacks target organizations by compromising or impersonating executive email accounts to authorize fraudulent wire transfers or extract sensitive information from employees.
        
        <h4>Warning Signs</h4>
        <ul>
          <li>Emails from executives requesting urgent wire transfers</li>
          <li>Slight variations in email addresses (e.g., john.doe@company.co instead of john.doe@company.com)</li>
          <li>Requests to change vendor payment information</li>
          <li>Communication that bypasses normal protocols</li>
          <li>Pressure to act quickly and confidentially</li>
        </ul>
        
        <h4>Prevention Tips</h4>
        <ul>
          <li>Implement verification procedures for financial requests</li>
          <li>Require multiple approvals for transfers above a threshold</li>
          <li>Verify changes to vendor information via phone</li>
          <li>Train staff to recognize BEC tactics</li>
          <li>Use email authentication protocols (DMARC, SPF, DKIM)</li>
          <li>Enable multi-factor authentication for email accounts</li>
        </ul>
      `
    },
    {
      id: 7,
      title: 'Man-in-the-Middle Attacks',
      category: 'network',
      preview: 'How attackers intercept and alter communications between two parties.',
      image: '/images/mitm.jpg',
      readTime: '5 min read',
      date: 'Feb 8, 2024',
      content: `
        Man-in-the-Middle (MitM) attacks involve attackers secretly intercepting and potentially altering communications between two parties who believe they are directly communicating with each other.
        
        <h4>Warning Signs</h4>
        <ul>
          <li>Certificate warnings in your browser</li>
          <li>Unexpected disconnections from websites or services</li>
          <li>Unusual latency in connections</li>
          <li>Being connected to suspicious WiFi networks</li>
        </ul>
        
        <h4>Prevention Tips</h4>
        <ul>
          <li>Only use HTTPS websites (look for the padlock icon)</li>
          <li>Avoid using public WiFi for sensitive transactions</li>
          <li>Use a VPN when connecting to public networks</li>
          <li>Verify security certificates before providing information</li>
          <li>Enable two-factor authentication when available</li>
          <li>Keep your devices and browsers updated</li>
        </ul>
      `
    },
    {
      id: 8,
      title: 'Credential Stuffing: When Passwords Are Recycled',
      category: 'account',
      preview: 'How breached credentials are used to gain unauthorized access across multiple platforms.',
      image: '/images/credential-stuffing.jpg',
      readTime: '4 min read',
      date: 'Mar 5, 2024',
      content: `
        Credential stuffing attacks use automated scripts to try username and password combinations leaked from data breaches on various websites, exploiting the common practice of password reuse.
        
        <h4>Warning Signs</h4>
        <ul>
          <li>Unexpected account lockouts</li>
          <li>Login notifications from unfamiliar locations</li>
          <li>Changes to account settings you didn't make</li>
          <li>Automated emails about login attempts</li>
        </ul>
        
        <h4>Prevention Tips</h4>
        <ul>
          <li>Use unique passwords for each online account</li>
          <li>Employ a password manager to create and store strong passwords</li>
          <li>Enable multi-factor authentication whenever possible</li>
          <li>Check if your credentials have been exposed in data breaches (e.g., through HaveIBeenPwned)</li>
          <li>Regularly change passwords for sensitive accounts</li>
          <li>Monitor accounts for suspicious activity</li>
        </ul>
      `
    },
    {
      id: 9,
      title: 'Social Engineering: The Human Vulnerability',
      category: 'social',
      preview: 'Psychological manipulation techniques used to trick people into making security mistakes.',
      image: '/images/social-engineering.jpg',
      readTime: '6 min read',
      date: 'Apr 12, 2024',
      content: `
        Social engineering exploits human psychology rather than technical vulnerabilities. These attacks manipulate victims into breaking security protocols, revealing sensitive information, or granting access to restricted resources.
        
        <h4>Common Techniques</h4>
        <ul>
          <li>Pretexting: Creating a fabricated scenario to extract information</li>
          <li>Baiting: Offering something enticing to spark curiosity (like infected USB drives)</li>
          <li>Quid pro quo: Offering a service in exchange for information</li>
          <li>Tailgating: Following authorized personnel into secured areas</li>
          <li>Authority abuse: Impersonating figures of authority</li>
        </ul>
        
        <h4>Prevention Tips</h4>
        <ul>
          <li>Verify the identity of individuals requesting sensitive information</li>
          <li>Be skeptical of unsolicited contacts</li>
          <li>Follow security protocols even when inconvenient</li>
          <li>Secure physical access to work areas</li>
          <li>Participate in regular security awareness training</li>
          <li>Report suspicious behavior or communications</li>
        </ul>
      `
    },
    {
      id: 10,
      title: 'Watering Hole Attacks',
      category: 'malware',
      preview: 'How attackers compromise legitimate websites to target specific groups of users.',
      image: '/images/watering-hole.jpg',
      readTime: '5 min read',
      date: 'May 7, 2024',
      content: `
        Watering hole attacks compromise websites frequently visited by a specific group of users. When targets visit these infected sites, malware is delivered to their devices. These attacks are highly targeted and difficult to detect.
        
        <h4>Warning Signs</h4>
        <ul>
          <li>Trusted websites behaving differently than usual</li>
          <li>Unexpected download prompts</li>
          <li>Browser extensions installed without permission</li>
          <li>Unusual system behavior after visiting specific sites</li>
        </ul>
        
        <h4>Prevention Tips</h4>
        <ul>
          <li>Keep browsers and plugins updated</li>
          <li>Use web filtering and security tools</li>
          <li>Enable click-to-play for browser plugins</li>
          <li>Implement network monitoring for unusual traffic</li>
          <li>Use virtualization or sandboxing for high-risk browsing</li>
          <li>Maintain updated endpoint protection</li>
        </ul>
      `
    },
    {
      id: 11,
      title: 'Deepfake Attacks: When Seeing Isnt Believing',
      category: 'emerging',
      preview: 'The growing threat of AI-generated fake media in cybersecurity.',
      image: '/images/deepfake.jpg',
      readTime: '7 min read',
      date: 'Jun 2, 2024',
      content: `
        Deepfakes use artificial intelligence to create convincing fake videos, audio, or images of real people. In cybersecurity, these can be used for sophisticated social engineering, fraud, or disinformation campaigns.
        
        <h4>Warning Signs</h4>
        <ul>
          <li>Unnatural blinking patterns or facial movements</li>
          <li>Inconsistent lighting or shadows</li>
          <li>Audio that doesn't perfectly match lip movements</li>
          <li>Unusual requests coming through video or voice calls</li>
          <li>Poor quality sections in otherwise high-quality media</li>
        </ul>
        
        <h4>Prevention Tips</h4>
        <ul>
          <li>Verify requests through separate communication channels</li>
          <li>Establish verification protocols for sensitive communications</li>
          <li>Be skeptical of unexpected video or audio communications</li>
          <li>Use deepfake detection tools when available</li>
          <li>Implement out-of-band verification for financial transactions</li>
          <li>Stay informed about deepfake technology developments</li>
        </ul>
      `
    },
    {
      id: 12,
      title: 'Supply Chain Attacks',
      category: 'emerging',
      preview: 'How compromising third-party services can affect countless downstream organizations.',
      image: '/images/supply-chain.jpg',
      readTime: '8 min read',
      date: 'Jul 14, 2024',
      content: `
        Supply chain attacks target less-secure elements in a supply network to compromise a final target. By infiltrating software vendors, manufacturers, or service providers, attackers can affect thousands of organizations simultaneously.
        
        <h4>Notable Examples</h4>
        <ul>
          <li>SolarWinds attack (2020)</li>
          <li>NotPetya malware via Ukrainian accounting software</li>
          <li>Compromised hardware components with implanted backdoors</li>
          <li>Attacks on cloud service providers affecting their customers</li>
        </ul>
        
        <h4>Prevention Tips</h4>
        <ul>
          <li>Establish vendor security assessment processes</li>
          <li>Implement zero-trust architecture</li>
          <li>Monitor third-party access to your systems</li>
          <li>Verify software integrity before installation</li>
          <li>Segment networks to limit potential damage</li>
          <li>Develop incident response plans specific to supply chain compromises</li>
          <li>Use behavior-based security monitoring</li>
        </ul>
      `
    }
  ];

  const filteredArticles = articles.filter(article => {
    // Filter by category if not on 'all' tab
    const categoryMatch = activeTab === 'all' || article.category === activeTab;
    
    // Filter by search term
    const searchMatch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const handleReadMore = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const categories = [
    { id: 'all', label: 'All Attacks' },
    { id: 'phishing', label: 'Phishing' },
    { id: 'malware', label: 'Malware' },
    { id: 'social', label: 'Social Engineering' },
    { id: 'network', label: 'Network Attacks' },
    { id: 'account', label: 'Account Security' },
    { id: 'emerging', label: 'Emerging Threats' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 to-gray-900">
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-red-900 to-red-800 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 opacity-10 bg-black"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 relative">
              <span className="relative inline-block">
                <span className="absolute inset-0 transform translate-x-1 translate-y-1 bg-black/30 blur-sm"></span>
                <span className="relative z-10 bg-gradient-to-r from-red-400 via-red-300 to-amber-200 bg-clip-text text-transparent">
                  Phishing & Cyber Attacks
                </span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-red-100 max-w-3xl mx-auto">
              Stay informed about the latest threats targeting individuals and organizations. Understanding these attack methods is your first line of defense.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/report-incident" className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition duration-300">
                Report an Incident
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1">
          <svg className="w-full h-12 sm:h-16 fill-current text-gray-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V69.81C57.77,70.92,127.07,62.3,171.36,65.1,275.68,71.65,252.55,78.26,321.39,56.44Z" />
          </svg>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search attacks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 rounded-lg bg-gray-800/80 border border-red-900/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === category.id 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-red-900/20 shadow-xl">
            <div className="text-red-500 mb-2">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">3.4 Billion</h3>
            <p className="text-gray-400">Phishing emails sent daily worldwide</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-red-900/20 shadow-xl">
            <div className="text-red-500 mb-2">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">$10.5 Billion</h3>
            <p className="text-gray-400">Annual losses from BEC attacks</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-red-900/20 shadow-xl">
            <div className="text-red-500 mb-2">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">11 Seconds</h3>
            <p className="text-gray-400">A ransomware attack occurs every 11 seconds</p>
          </div>
        </div>

        {/* Articles */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <div key={article.id} className="group">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-red-600/10 border border-red-900/20 h-full flex flex-col">
                  <div className="relative h-48 bg-red-900">
                    <div className="absolute inset-0 flex items-center justify-center text-red-500">
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center mb-3">
                      <span className="bg-red-900/30 text-red-400 text-xs font-medium px-2.5 py-1 rounded-full">
                        {categories.find(cat => cat.id === article.category)?.label || article.category}
                      </span>
                      <span className="ml-auto text-xs text-gray-400">{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{article.title}</h3>
                    <p className="text-gray-400 mb-4 flex-1">{article.preview}</p>
                    <button 
                      onClick={() => handleReadMore(article)}
                      className="mt-auto text-red-400 hover:text-red-300 text-sm font-medium flex items-center"
                    >
                      Read more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl text-white font-bold mb-2">No articles found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <ArticleModal 
        article={selectedArticle} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default PhishingAndAttacksPage;
