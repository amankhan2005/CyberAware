'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faFilter, faCalendar, faUser, faChevronDown, faChevronUp, faPenToSquare } from "@fortawesome/free-solid-svg-icons"

const BlogsAndArticles = () => {
  // State for filtering and search
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [expandedArticles, setExpandedArticles] = useState({})

  // Toggle article expansion
  const toggleArticle = (id) => {
    setExpandedArticles({
      ...expandedArticles,
      [id]: !expandedArticles[id]
    })
  }

  // Articles data
  const articles = [
    {
      id: 1,
      title: "The Rise of Cyber Threats in India: Analyzing the Landscape",
      summary: "Over the past decade, India has witnessed a sharp uptick in cyber-attacks targeting individuals, businesses, and critical infrastructure. Factors driving this trend include rapid digital adoption, regulatory gaps, and increasing sophistication of threat actors.",
      author: "CyberAware Team",
      date: "April 11, 2025",
      category: "Threat Analysis",
      content: [
        {
          sectionTitle: "Rapid Digitalization and Expanding Attack Surface",
          text: "India's internet user base crossed 800 million in 2023, driven by affordable smartphones and government initiatives like Digital India. As more services—from banking to healthcare—migrate online, the potential entry points for attackers multiply.\n\nPhishing remains the most common vector: in 2023, over 55 percent of Indian organizations reported at least one successful phishing attack, up from 42 percent in 2021."
        },
        {
          sectionTitle: "Key Threat Vectors",
          subsections: [
            {
              title: "Ransomware",
              text: "Ransomware incidents in India grew by 150 percent between 2021 and 2023, with mid-sized enterprises in manufacturing and healthcare hardest hit. Attackers encrypt critical data and demand payments often in cryptocurrency, disrupting operations for days or weeks."
            },
            {
              title: "ATM-Jackpotting and Financial Frauds",
              text: "A surge in ATM-jackpotting—where malware triggers cash dispensal—led to losses of over ₹200 million in 2022 alone. Meanwhile, use of mobile-banking Trojans increased by 120 percent in the same period."
            },
            {
              title: "State-Sponsored Espionage",
              text: "Government agencies warn of advanced persistent threats (APTs) linked to foreign nation-states targeting India's defense and research sectors. In 2023, the CERT-In reported multiple campaigns aimed at stealing intellectual property in space and nuclear research."
            }
          ]
        },
        {
          sectionTitle: "Regulatory and Legal Landscape",
          text: "India's primary law, the Information Technology Act (2000), was amended in 2008 but lacks provisions specific to modern threats like ransomware. The recently passed Digital Personal Data Protection Act (2023) aims to strengthen data privacy, yet experts note delays in drafting its subordinate rules leave enforcement weak."
        },
        {
          sectionTitle: "Industry and Government Response",
          subsections: [
            {
              title: "CERT-In and National Cyber Security Coordinator",
              text: "The Indian Computer Emergency Response Team (CERT-In) handled over 500,000 incidents in 2023, doubling its workload from 2021. The National Cyber Security Coordinator's office is drafting a National Cybersecurity Strategy expected by mid-2025 to unify public-private efforts."
            },
            {
              title: "Private Sector Initiatives",
              text: "Major Indian banks are deploying AI-driven fraud detection systems, reducing false positives by 30 percent and blocking over 70 percent of automated attacks. Large IT firms are investing in Security Operations Centers (SOCs) and offering managed detection and response (MDR) services to SMEs."
            }
          ]
        },
        {
          sectionTitle: "Building Cyber Resilience",
          subsections: [
            {
              title: "Cyber Hygiene and Awareness",
              text: "Awareness programs in schools and workplaces have shown promise: organizations conducting regular phishing simulations see a 40 percent reduction in click-through rates on malicious emails."
            },
            {
              title: "Technology and Best Practices",
              text: "Adoption of multi-factor authentication (MFA) has grown to 60 percent among financial institutions, yet remains below 20 percent in SMEs. Endpoint detection and response (EDR) tools, encryption of sensitive data, and regular patch management are critical."
            }
          ]
        },
        {
          sectionTitle: "Conclusion",
          text: "India stands at a crossroads: its digital transformation brings immense benefits but also escalating cyber-risks. A multi-pronged approach—combining robust legislation, cutting-edge technology, and widespread education—is essential to stem the tide of cyber threats and secure India's digital future."
        }
      ]
    },
    {
      id: 2,
      title: "Data Protection Laws in India: An Overview of the IT Act and Beyond",
      summary: "India's data protection regime has evolved from the rudimentary Information Technology Act, 2000, to the landmark Digital Personal Data Protection Act, 2023.",
      author: "CyberAware Team",
      date: "April 10, 2025",
      category: "Legislation",
      content: [
        {
          sectionTitle: "Historical Evolution of Data Protection in India",
          subsections: [
            {
              title: "Information Technology Act, 2000",
              text: "The IT Act was India's first legal instrument to address cybercrime and electronic commerce. It penalized unauthorized access (Section 43) and data breaches (Section 72A), but did not recognize a general right to privacy or granular data-processing obligations."
            },
            {
              title: "Supreme Court Recognition of Privacy",
              text: "In Puttaswamy v. Union of India (2017), the Supreme Court held that privacy is a fundamental right under Article 21 of the Constitution. This judgment created the judicial impetus for a dedicated data protection law."
            }
          ]
        },
        {
          sectionTitle: "Digital Personal Data Protection Act, 2023",
          subsections: [
            {
              title: "Key Definitions and Scope",
              text: "- Data Principal: The individual whose personal data is processed.\n- Data Fiduciary: Any entity determining the purpose and means of data processing.\n- Sensitive Personal Data: Includes financial, health, sexual orientation, and biometric data.\n\nThe Act applies to processing \"wholly or partly\" within India, and to foreign entities offering services to Indian residents."
            },
            {
              title: "Obligations of Data Fiduciaries",
              text: "- Consent: Must be free, informed, specific, and revocable.\n- Purpose Limitation: Data collected only for clear, lawful purposes.\n- Data Minimization: Only data necessary for purpose may be processed.\n- Security Safeguards: Reasonable technical and organizational measures required."
            },
            {
              title: "Rights of Data Principals",
              text: "- Right to Access: View personal data held by fiduciary.\n- Right to Correction and Erasure: Rectify or delete inaccurate/outdated data.\n- Right to Data Portability: Receive data in a structured, machine-readable form."
            },
            {
              title: "Enforcement Mechanisms",
              text: "- Data Protection Board of India (DPBI): Adjudicates complaints, imposes penalties up to ₹250 crore.\n- Breach Notification: Fiduciaries must report data breaches within 72 hours."
            }
          ]
        },
        {
          sectionTitle: "Remaining Gaps and Challenges",
          subsections: [
            {
              title: "Delay in Subordinate Rules",
              text: "The Act's rules and codes of practice are yet to be notified, delaying clarity on issues like data-localization and breach protocols."
            },
            {
              title: "Sector-Specific Regulations",
              text: "Critical sectors—banking, telecom, healthcare—operate under their own regulators (RBI, TRAI, ICMR), leading to overlapping obligations and compliance confusion."
            },
            {
              title: "Cross-Border Data Flows",
              text: "While the Act permits transfers to government-approved jurisdictions, the approval process and criteria remain opaque."
            }
          ]
        },
        {
          sectionTitle: "Way Forward",
          text: "1. Prompt Notification of Rules: Finalize subordinate legislation to operationalize the Act.\n2. Harmonization Across Regulators: Align sectoral guidelines with the DPDP Act to reduce compliance burdens.\n3. Capacity Building: Train industry and judicial officers on new obligations and rights.\n4. International Cooperation: Engage in adequacy dialogues with key jurisdictions to facilitate data flows.\n\nBy addressing these gaps, India can build a robust data protection ecosystem that fosters innovation while safeguarding individual privacy."
        }
      ]
    },
    {
      id: 3,
      title: "Cybersecurity Challenges for Indian Startups",
      summary: "Indian startups—especially in fintech, healthtech and edtech—face acute cybersecurity challenges driven by limited budgets, low awareness, regulatory complexity and rapidly evolving threats.",
      author: "CyberAware Team",
      date: "April 25, 2025",
      category: "Business Security",
      content: [
        {
          sectionTitle: "Resource Constraints and Awareness Gaps",
          text: "Startups typically operate on shoestring budgets, viewing cybersecurity as a cost center rather than strategic enabler. As a result, many lack dedicated security personnel or tools, leaving them exposed to basic attacks like credential stuffing and phishing. Surveys show over 70% of Indian startup founders underestimate cyber-risk, believing they're \"too small to be targeted\"."
        },
        {
          sectionTitle: "Top Threat Vectors",
          subsections: [
            {
              title: "Phishing and Social Engineering",
              text: "Over 80% of breaches begin with phishing—emails crafted to steal credentials or deliver malware. Indian startups with lean teams often skip regular phishing simulations, resulting in click-rates above the global average of 15%."
            },
            {
              title: "Ransomware",
              text: "Ransomware attacks against SMEs and startups in India surged 150% in 2024, with attackers encrypting critical data and demanding cryptocurrency payments. Many young companies lack immutable backups or offline recovery plans, amplifying impact."
            },
            {
              title: "Cloud Misconfigurations",
              text: "Rapid migration to AWS, Azure or GCP without security architecture reviews leads to misconfigured buckets and open databases. In 2023, over 30 high-profile Indian startups leaked sensitive customer data via unsecured S3 buckets."
            },
            {
              title: "API Abuse",
              text: "Startups expose APIs for integrations, but weak rate-limiting and authentication controls allow attackers to scrape data or perform business logic abuse—e.g. automated voucher redemption—causing financial and reputational loss."
            }
          ]
        },
        {
          sectionTitle: "Best Practices for Protection",
          subsections: [
            {
              title: "Shift-Left Security",
              text: "Embed security into development (DevSecOps): integrate static and dynamic code analysis into CI/CD pipelines, automate dependency-vulnerability scanning, and require security gates before production deployment."
            },
            {
              title: "Strong Authentication and Access Controls",
              text: "Enforce multi-factor authentication (MFA) for all employee and admin accounts—MFA reduces account-takeover risk by over 90%. Implement least-privilege IAM roles in cloud environments to limit blast radius of compromised credentials."
            },
            {
              title: "Regular Patching and Patch Management",
              text: "Automate OS and third-party library patching. 60% of breaches exploit known vulnerabilities with available patches older than 30 days."
            },
            {
              title: "Employee Training and Simulations",
              text: "Conduct quarterly phishing simulations and interactive workshops. Organizations running simulations see a 40% drop in phishing-click rates within six months."
            }
          ]
        },
        {
          sectionTitle: "Building a Security-First Culture",
          text: "Leadership must champion cybersecurity: allocate budget, recognize \"security champions\" within engineering teams, and include security metrics in OKRs. A culture of shared responsibility ensures proactive threat identification rather than reactive firefighting."
        },
        {
          sectionTitle: "Conclusion",
          text: "Indian startups can no longer defer cybersecurity. By shifting left, automating hygiene, training staff, and leveraging external experts, they transform security from burden into enabler—protecting customer trust, ensuring regulatory compliance, and unlocking sustainable growth."
        }
      ]
    },
    {
      id: 4,
      title: "Cyber Hygiene for the Common Indian Internet User",
      summary: "Everyday internet users in India face increasing risks—from phishing and identity theft to financial fraud—driven by rapid digital adoption and often limited awareness.",
      author: "CyberAware Team",
      date: "April 15, 2025] ",
      category: "Personal Security",
      content: [
        {
          sectionTitle: "Use Strong, Unique Passwords and Enable MFA",
          subsections: [
            {
              title: "Password Managers",
              text: "India's average user reuses 5–7 passwords across accounts, greatly magnifying breach impact. Password managers (e.g., LastPass, Bitwarden) generate and store complex passwords, removing memorization burden."
            },
            {
              title: "Multi-Factor Authentication (MFA)",
              text: "Accounts with MFA are 99.9% less likely to be compromised according to Microsoft data. Indian banks and email providers now offer SMS- and app-based MFA; users should enable it on all sensitive services."
            }
          ]
        },
        {
          sectionTitle: "Keep Software and Devices Updated",
          subsections: [
            {
              title: "Automatic Updates",
              text: "60% of malware exploits known vulnerabilities—patches available for at least 30 days—making updates critical. Enable automatic OS and app updates on Windows, macOS, Android, and iOS devices."
            },
            {
              title: "Remove Unused Apps and Plugins",
              text: "Unused software often lacks security maintenance. Regularly uninstall apps and browser plugins no longer needed."
            }
          ]
        },
        {
          sectionTitle: "Recognize and Avoid Phishing",
          subsections: [
            {
              title: "Common Phishing Techniques",
              text: "Phishing emails rose 47% in India in 2024, often spoofing banks or government agencies. Look for red flags: mismatched URLs, poor grammar, unexpected attachments, and urgent requests."
            },
            {
              title: "Verification Practices",
              text: "Independently verify requests by contacting institutions via official channels, not using links or numbers in suspicious messages. Use email-client phishing filters and mark spam/phishing to train systems."
            }
          ]
        },
        {
          sectionTitle: "Safe Mobile-Banking and UPI Practices",
          subsections: [
            {
              title: "Official Apps Only",
              text: "Download banking and UPI apps only from official Google Play or Apple App Store listings. Rogue apps impersonating banks increased 30% in 2024, stealing UPI PINs via overlay attacks."
            },
            {
              title: "UPI PIN Hygiene",
              text: "Never share your UPI PIN or OTP; no legitimate service will ask for them. Regularly review bank statements and UPI transaction history for unauthorized activity."
            }
          ]
        },
        {
          sectionTitle: "Conclusion",
          text: "By adopting these straightforward cyber hygiene habits—strong passwords with MFA, timely updates, phishing vigilance, network security, safe mobile-banking, and robust backups—Indian internet users can significantly reduce their exposure to online threats. Consistent practice and periodic review of these measures will help protect personal data, finances, and privacy in an increasingly digital India."
        }
      ]
    },
    {
      id: 5,
      title: "The Growing Threat of Cyberattacks on Critical Infrastructure in India",
      summary: "Critical infrastructure in India—including energy grids, transportation networks, and healthcare systems—has become an increasingly attractive target for cyber adversaries.",
      author: "CyberAware Team",
      date: "May 5, 2025",
      category: "Critical Infrastructure",
      content: [
        {
          sectionTitle: "Rising Threat Landscape",
          subsections: [
            {
              title: "Explosion of Incidents",
              text: "India's Computer Emergency Response Team (CERT-In) recorded roughly 16 million cyber incidents in 2023, up from 53,000 in 2017—a nearly 300-fold increase. Many of these involved probes and intrusions into critical-sector networks, signaling a shift from opportunistic attacks to targeted campaigns."
            },
            {
              title: "Diverse Adversaries",
              text: "- Cybercriminals employ ransomware and data-theft malware, targeting hospitals and utilities for high-value extortion.\n- State-Sponsored Actors from China, Pakistan, and Russia have launched advanced persistent threats (APTs) against India's energy and defense research establishments.\n- Hacktivists and insider threats exploit ideological motives or financial gain, often leveraging social-engineering tactics on under-trained personnel."
            }
          ]
        },
        {
          sectionTitle: "Sectoral Vulnerabilities",
          subsections: [
            {
              title: "Energy and Power Grids",
              text: "Many power utilities still rely on legacy SCADA/ICS systems without modern encryption or segmentation. In 2024, researchers demonstrated how default credentials on OT devices could allow remote shutdowns, mirroring attacks seen in Western grids."
            },
            {
              title: "Transportation Networks",
              text: "Railways and metro systems use interconnected signaling and control networks. A successful breach of these networks could disrupt millions of commuters; penetration tests in 2023 uncovered weak network isolation and unpatched firmware in several major metro systems."
            },
            {
              title: "Healthcare Infrastructure",
              text: "The proliferation of Internet-connected medical devices (IoMT) has expanded attack surfaces. Health-ISAC's 2025 report warns of rising ransomware and espionage against Indian hospitals, with IoMT vulnerabilities enabling life-threatening disruptions."
            }
          ]
        },
        {
          sectionTitle: "Regulatory and Institutional Responses",
          subsections: [
            {
              title: "NCIIPC and Policy Frameworks",
              text: "The National Critical Information Infrastructure Protection Centre (NCIIPC), set up under the IT Amendment Act 2008, identifies and secures 11 critical sectors, issues advisories, and coordinates incident response. Yet its mandate lacks enforcement teeth, leading to uneven adoption of guidelines."
            },
            {
              title: "International Collaboration",
              text: "India participates in the Budapest Convention and engages with QUAD partners for joint cyber-exercises. Despite this, information-sharing mechanisms remain ad hoc, delaying cross-border threat mitigation."
            }
          ]
        },
        {
          sectionTitle: "Building Cyber Resilience",
          subsections: [
            {
              title: "Workforce Development",
              text: "India faces a shortage of 1 million cybersecurity professionals by 2025. Upskilling programs—such as joint NCIIPC-industry training academies—must be scaled to bridge this gap."
            },
            {
              title: "Public-Private Partnerships",
              text: "Collaboration between government, academia, and industry can foster threat-intelligence sharing and co-development of bespoke security solutions. The Data Security Council of India's Cyber Shikshaa initiative is one such model."
            }
          ]
        },
        {
          sectionTitle: "Conclusion",
          text: "Securing India's critical infrastructure against cyber threats demands a multi-layered strategy: modernizing legacy systems, enforcing robust policy frameworks, harnessing AI-driven detection, and nurturing skilled talent through collaborative initiatives. With rising stakes—economic stability, public safety, and national security—India must move decisively from reactive firefighting to proactive resilience building."
        }
      ]
    },
    {
      id: 6,
      title: "AI-Powered Cyber Threats: The New Frontier in Indian Cybersecurity",
      summary: "As artificial intelligence becomes more sophisticated, cybercriminals are leveraging these technologies to launch more effective attacks against Indian organizations and individuals.",
      author: "CyberAware Team",
      date: "April 25, 2025",
      category: "Emerging Threats",
      content: [
        {
          sectionTitle: "The AI Threat Landscape",
          text: "Artificial intelligence and machine learning are revolutionizing cyberattacks in India, with threat actors utilizing these technologies to bypass traditional security measures and automate sophisticated attacks at unprecedented scale."
        },
        {
          sectionTitle: "Common AI-Enhanced Attack Vectors",
          subsections: [
            {
              title: "Advanced Phishing Campaigns",
              text: "AI tools now generate hyper-personalized phishing emails in fluent Hindi, Bengali, Tamil and other regional languages, increasing click rates by 35% compared to generic phishing attempts. These emails analyze social media profiles to reference personal details and mimic writing styles of colleagues or family members."
            },
            {
              title: "Deepfakes in Social Engineering",
              text: "Voice cloning technology has enabled scammers to impersonate executives in real-time phone calls to authorize fraudulent transfers. In 2023, an Indian corporation lost ₹15 crore after an AI-generated voice mimicking the CEO convinced the finance director to wire funds to a fraudulent account."
            },
            {
              title: "Intelligent Malware",
              text: "Next-generation malware using reinforcement learning techniques can adapt to evade detection, alter behavior based on environment analysis, and identify high-value targets within networks. These programs demonstrate rudimentary decision-making to maximize damage while minimizing detection."
            }
          ]
        },
        {
          sectionTitle: "Defensive Applications of AI",
          subsections: [
            {
              title: "Behavioral Analytics",
              text: "AI-powered security platforms can establish baseline user behaviors and identify anomalies indicating compromise. Financial institutions in India have reported 60% improvement in fraud detection through these systems with significant reduction in false positives."
            },
            {
              title: "Automated Threat Hunting",
              text: "Machine learning models trained on vast threat intelligence datasets can proactively search networks for indicators of compromise that might evade rule-based detection systems. These systems help address India's cybersecurity talent shortage by automating routine threat hunting tasks."
            }
          ]
        },
        {
          sectionTitle: "Policy and Regulatory Considerations",
          text: "India's cybersecurity policy framework requires updating to address the unique challenges posed by AI-enabled threats. The National Cybersecurity Strategy must incorporate specific provisions for AI governance in security contexts, including potential restrictions on certain applications of generative AI technology that could threaten national security."
        },
        {
          sectionTitle: "Conclusion",
          text: "As AI capabilities continue advancing, the arms race between attackers and defenders will intensify. Indian organizations must invest in AI-powered security solutions while simultaneously developing security frameworks specifically designed to counter AI-enhanced threats. Collaborative efforts between government, industry, and academia will be essential to maintain resilience against this new generation of cyber threats."
        }
      ]
    },
    {
      id: 7,
      title: "IoT Security Risks in Smart Cities: Lessons for India's Urban Development",
      summary: "As India aggressively pursues smart city initiatives, the proliferation of IoT devices creates significant cybersecurity vulnerabilities that must be addressed to ensure public safety and data protection.",
      author: "CyberAware Team",
      date: "April 15, 2025",
      category: "Infrastructure Security",
      content: [
        {
          sectionTitle: "Smart City Development in India",
          text: "The Indian government's Smart Cities Mission has connected over 7.5 million IoT devices across 100 cities, from traffic management systems to public utilities monitors. While these technologies enhance urban efficiency, they also introduce substantial attack surfaces with potentially serious consequences if compromised."
        },
        {
          sectionTitle: "Critical Vulnerabilities",
          subsections: [
            {
              title: "Insecure Communications Protocols",
              text: "Many IoT devices deployed in Indian smart cities utilize unencrypted communications or outdated protocols. A 2023 security audit of five major smart city implementations revealed that 38% of devices used plaintext communications for sensitive data, while 45% utilized communications protocols with known vulnerabilities."
            },
            {
              title: "Default Credentials",
              text: "Municipal IoT deployments frequently retain factory-default passwords, creating easy entry points for attackers. The Shodan search engine currently lists over 15,000 exposed devices in Indian smart cities with default credentials, from traffic light controllers to environmental monitoring systems."
            },
            {
              title: "Limited Update Mechanisms",
              text: "Many IoT devices lack automated update capabilities or have update mechanisms that themselves create security risks. Devices deployed in Indian municipal infrastructure average 3.2 years between firmware updates, leaving critical vulnerabilities unpatched."
            }
          ]
        },
        {
          sectionTitle: "Potential Impact Scenarios",
          subsections: [
            {
              title: "Traffic System Manipulation",
              text: "Compromised traffic management systems could cause gridlock by manipulating traffic signals, potentially hampering emergency services response or facilitating criminal activity. Security researchers demonstrated the ability to control traffic signals in three Indian cities during controlled tests in 2023."
            },
            {
              title: "Surveillance System Access",
              text: "Unauthorized access to the extensive CCTV networks in smart cities creates privacy risks and enables criminal reconnaissance. In 2022, a private security firm identified unauthorized access to over 1,500 CCTV cameras in a major metropolitan area."
            },
            {
              title: "Utility System Disruption",
              text: "Smart grid and water management systems could be targeted to cause service disruptions or, in extreme cases, infrastructure damage. A 2023 tabletop exercise conducted by CERT-In demonstrated how attackers could potentially disrupt water distribution to entire neighborhoods."
            }
          ]
        },
        {
          sectionTitle: "Security Guidelines for Smart City Implementation",
          subsections: [
            {
              title: "Security by Design",
              text: "All RFPs for smart city technologies must include specific security requirements and undergo independent security verification before deployment. The Ministry of Housing and Urban Affairs has developed a security framework that should be mandatory for all implementations."
            },
            {
              title: "Network Segmentation",
              text: "Critical infrastructure systems should operate on isolated networks with strictly controlled access points and continuous monitoring. Implementing zero-trust architecture principles can significantly reduce the impact of any single compromise."
            },
            {
              title: "Regular Security Assessments",
              text: "Quarterly security audits and penetration testing should be mandatory for all smart city deployments, with findings addressed through a formal remediation process."
            }
          ]
        },
        {
          sectionTitle: "Conclusion",
          text: "India's smart city initiatives promise tremendous benefits for urban management and quality of life, but they must integrate cybersecurity as a foundational element rather than an afterthought. By establishing strong security governance, implementing technical safeguards, and creating public-private partnerships focused on security, India can build smart cities that remain resilient against evolving cyber threats."
        }
      ]
    },
    {
      id: 8,
      title: "Securing India's Digital Payment Ecosystem: UPI, Mobile Banking and Beyond",
      summary: "India's digital payment revolution has transformed financial accessibility, but also created new security challenges that require constant vigilance from users, providers, and regulators.",
      author: "CyberAware Team",
      date: "April 5, 2025",
      category: "Financial Security",
      content: [
        {
          sectionTitle: "India's Digital Payment Transformation",
          text: "With over 10 billion monthly UPI transactions and 325 million active users, India has built the world's most advanced real-time payment infrastructure. The convenience of instant transactions has revolutionized commerce, but also attracted sophisticated threat actors targeting this massive financial ecosystem."
        },
        {
          sectionTitle: "Common Attack Vectors",
          subsections: [
            {
              title: "QR Code Fraud",
              text: "Fraudsters deploy manipulated QR codes in public places that redirect payments to attacker-controlled accounts. The Indian Cybercrime Coordination Centre reported 82,000 QR code fraud cases in 2023, with average losses of ₹12,500 per victim."
            },
            {
              title: "SIM Swapping",
              text: "Attackers use social engineering to obtain duplicate SIM cards, then intercept OTPs to take over banking and payment accounts. Telecom providers have implemented enhanced verification, but social engineering techniques continue to evolve."
            },
            {
              title: "Banking Trojans",
              text: "Mobile malware specifically targeting banking applications can overlay fake screens to steal credentials or hijack sessions. Banking trojans like EventBot and FluBot have specifically targeted Indian banks with over 25,000 infections detected monthly."
            }
          ]
        },
        {
          sectionTitle: "Defensive Measures",
          subsections: [
            {
              title: "Multi-Factor Authentication Evolution",
              text: "The RBI's tokenization mandate and push for device binding have strengthened authentication, reducing fraud in card transactions by 35% since implementation. Biometric verification is now used in 65% of mobile banking apps, adding an additional security layer."
            },
            {
              title: "AI-Powered Fraud Detection",
              text: "Indian payment processors now deploy sophisticated real-time transaction monitoring using machine learning to identify suspicious patterns. These systems analyze over 2,000 parameters per transaction with detection rates reaching 92% for fraudulent attempts."
            },
            {
              title: "Educational Initiatives",
              text: "The \"Digital Payment Suraksha\" campaign launched by NPCI has reached over 50 million citizens with basic security awareness. Banks have implemented mandatory security tutorials before activating UPI and net banking services."
            }
          ]
        },
        {
          sectionTitle: "Regulatory Framework",
          text: "The RBI's Digital Payment Security Controls Directive (2021) established comprehensive security requirements for payment service providers. Regulations mandate end-to-end encryption, 24/7 fraud monitoring, and customer liability limits. The upcoming Digital India Trust Agency (DITA) will standardize digital payment security across the ecosystem."
        },
        {
          sectionTitle: "Best Practices for Consumers",
          subsections: [
            {
              title: "App Hygiene",
              text: "Only download banking and payment apps from official app stores, verify developer credentials, and check permissions requested. Enable app-level locks where available and disable autofill for sensitive financial information."
            },
            {
              title: "Transaction Verification",
              text: "Before completing payments, verify recipient details and amounts. Enable transaction limits and notifications for all payment types. Consider using a separate device for high-value transactions where possible."
            },
            {
              title: "Rapid Response to Incidents",
              text: "If fraud is suspected, immediately contact both the bank and NPCI through official channels, file a report on the Cyber Crime Portal, and request transaction reversal within the golden hour (usually 2-4 hours) when recovery is most likely."
            }
          ]
        },
        {
          sectionTitle: "Future Developments",
          text: "The Central Bank Digital Currency (e₹) pilot will introduce new security paradigms based on blockchain technology. Meanwhile, AI-powered voice recognition and behavioral biometrics are being tested by major banks to create truly seamless yet secure authentication methods that don't compromise convenience."
        }
      ]
    }
  ]

  // Filter articles based on search query and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-800 to-teal-600 text-white py-16 px-6">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 relative">
            <span className="relative inline-block">
              <span className="absolute inset-0 transform translate-x-1 translate-y-1 bg-black/30 blur-sm"></span>
              <span className="relative z-10 bg-gradient-to-r from-teal-400 via-indigo-400 to-teal-200 bg-clip-text text-transparent">
                Blogs & Articles
              </span>
            </span>
          </h1>
          <p className="text-xl max-w-3xl text-white">
            Stay informed with our latest articles, insights, and expert opinions on cybersecurity topics.
          </p>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1">
          <svg className="w-full h-12 sm:h-16 fill-current text-indigo-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V69.81C57.77,70.92,127.07,62.3,171.36,65.1,275.68,71.65,252.55,78.26,321.39,56.44Z" />
          </svg>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-indigo-800/80 to-indigo-900/80 rounded-xl p-6 border border-indigo-700/40 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="col-span-1 md:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} className="text-indigo-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles by title, topic, or keyword"
                  className="block w-full pl-10 pr-3 py-3 bg-indigo-950/50 border border-indigo-700/40 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Filter and Create New Article */}
            <div className="flex space-x-3">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faFilter} className="text-indigo-300" />
                  </div>
                  <select 
                    className="block w-full pl-10 pr-3 py-3 bg-indigo-950/50 border border-indigo-700/40 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Filter by Category</option>
                    <option value="Threat Analysis">Threat Analysis</option>
                    <option value="Legislation">Legislation</option>
                    <option value="Business Security">Business Security</option>
                    <option value="Personal Security">Personal Security</option>
                    <option value="Critical Infrastructure">Critical Infrastructure</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FontAwesomeIcon icon={faChevronDown} className="text-indigo-300" />
                  </div>
                </div>
              </div>
              
              {/* Create New Article Button */}
              {/* <Link href="/expert/add_article" className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-teal-400 hover:to-indigo-400 font-medium shadow-lg hover:shadow-teal-500/20">
                <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                <span>Write Article</span>
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {filteredArticles.length === 0 ? (
            <div className="bg-gradient-to-br from-indigo-800/70 to-indigo-900/70 rounded-xl p-8 border border-indigo-700/40 shadow-xl text-center">
              <p className="text-white text-xl">No articles found matching your search criteria.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('');}}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg hover:from-teal-400 hover:to-indigo-400 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div key={article.id} className="bg-gradient-to-br from-indigo-800/70 to-indigo-900/70 rounded-xl p-8 border border-indigo-700/40 shadow-xl">
                <div className="flex flex-col space-y-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="bg-indigo-900/30 text-teal-300 text-xs font-medium px-2.5 py-1 rounded-full">
                        {article.category}
                      </span>
                      <div className="flex items-center text-indigo-300 text-sm">
                        <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                        {article.date}
                      </div>
                      <div className="flex items-center text-indigo-300 text-sm">
                        <FontAwesomeIcon icon={faUser} className="mr-1" />
                        {article.author}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{article.title}</h2>
                    <p className="text-indigo-200 mb-4">{article.summary}</p>
                    
                    <button 
                      onClick={() => toggleArticle(article.id)} 
                      className="text-teal-400 hover:text-teal-300 font-medium flex items-center"
                    >
                      {expandedArticles[article.id] ? 'Read Less' : 'Read More'} 
                      <FontAwesomeIcon 
                        icon={expandedArticles[article.id] ? faChevronUp : faChevronDown} 
                        className="ml-2"
                      />
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {expandedArticles[article.id] && (
                    <div className="mt-6 border-t border-indigo-700/40 pt-6 text-white">
                      {article.content.map((section, idx) => (
                        <div key={idx} className="mb-6">
                          {section.sectionTitle && (
                            <h3 className="text-xl font-bold text-white mb-3">{section.sectionTitle}</h3>
                          )}
                          
                          {section.text && (
                            <p className="text-indigo-200 mb-4 whitespace-pre-line">{section.text}</p>
                          )}
                          
                          {section.subsections && (
                            <div className="ml-6 mt-4 space-y-4">
                              {section.subsections.map((subsection, subIdx) => (
                                <div key={subIdx}>
                                  <h4 className="text-lg font-semibold text-teal-300 mb-2">{subsection.title}</h4>
                                  <p className="text-indigo-200 whitespace-pre-line">{subsection.text}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <div className="flex justify-center mt-6">
                        <button 
                          onClick={() => toggleArticle(article.id)}
                          className="px-6 py-2 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg hover:from-teal-400 hover:to-indigo-400 transition-all duration-300"
                        >
                          Close Article
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogsAndArticles
