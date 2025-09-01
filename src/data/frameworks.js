// Import all images
import rectangle219 from '../../public/assets/images/rectangle-219.png';
import rectangle219_1 from '../../public/assets/images/rectangle-219-1.png';
import rectangle219_2 from '../../public/assets/images/rectangle-219-2.png';
import rectangle219_3 from '../../public/assets/images/rectangle-219-3.png';
import rectangle219_4 from '../../public/assets/images/rectangle-219-4.png';
import rectangle219_5 from '../../public/assets/images/rectangle-219-5.png';
import rectangle219_6 from '../../public/assets/images/rectangle-219-6.png';
import rectangle219_7 from '../../public/assets/images/rectangle-219-7.png';
import rectangle219_8 from '../../public/assets/images/rectangle-219-8.svg';
import iconInfo from '../../public/assets/images/icon-info.svg';
import iconSetings from '../../public/assets/images/icon-setings.svg';
import iconPlaylistCheck from '../../public/assets/images/icon-playlist-check.svg';
import iconClose from '../../public/assets/images/icon-close.svg';
import iconCheck from '../../public/assets/images/icon-check.svg';
import iconArchiveLock from '../../public/assets/images/icon-archive-lock.svg';

// Mock framework control data
export const frameworkControlsData = {
  1: {
    data: [
      {
        controlId: "ECF-001",
        category: "Access Control",
        description:
          "Company and Supplier may Process the other's BCI wherever they do business in connection with Supplier's delivery of Services and Deliverables.",
      },
      {
        controlId: "ECF-002",
        category: "Data Protection",
        isCompleted: true,
        description: "Encrypt sensitive data at rest",
      },
      {
        controlId: "ECF-003",
        category: "Network Security",
        description: "Configure firewall rules",
      },
      {
        controlId: "ECF-004",
        category: "Monitoring",
        description: "Set up security event logging",
      },
      {
        controlId: "ECF-005",
        category: "Incident Response",
        description: "Develop incident response plan",
      },
      {
        controlId: "ECF-005",
        category: "Incident Response",
        description: "Develop incident response plan",
      },
      {
        controlId: "ECF-005",
        category: "Incident Response",
        description: "Develop incident response plan",
      },
      {
        controlId: "ECF-005",
        category: "Incident Response",
        description: "Develop incident response plan",
      },
      {
        controlId: "ECF-005",
        category: "Incident Response",
        description: "Develop incident response plan",
      },
      {
        controlId: "ECF-005",
        category: "Incident Response",
        description: "Develop incident response plan",
      },
      {
        controlId: "ECF-005",
        category: "Incident Response",
        description: "Develop incident response plan",
      },
      {
        controlId: "ECF-005",
        category: "Incident Response",
        description: "Develop incident response plan",
      },
      {
        controlId: "ECF-005",
        category: "Incident Response",
        description: "Develop incident response plan",
      },
    ],
  },
  2: {
    data: [
      {
        controlId: "CSH-001",
        category: "Authentication",
        description: "Multi-factor authentication",
      },
      {
        controlId: "CSH-002",
        category: "Authorization",
        description: "Role-based access control",
      },
      {
        controlId: "CSH-003",
        category: "Data Security",
        description: "Data classification system",
      },
    ],
  },
  3: {
    data: [
      {
        controlId: "DCF-001",
        category: "Physical Security",
        description: "Secure facility access",
      },
      {
        controlId: "DCF-002",
        category: "Asset Management",
        description: "Asset inventory system",
      },
      {
        controlId: "DCF-003",
        category: "Business Continuity",
        description: "Disaster recovery plan",
      },
    ],
  },
};

// Framework data
export const frameworksData = [
  {
    id: 1,
    type: "Custom Framework",
    title: "ECF 2023",
    description: "Example Custom Framework",
    image: rectangle219,
    status: {
      text: "Ready to Map",
      variant: "ready",
      icon: iconInfo,
    },
  },
  {
    id: 2,
    type: "Custom Framework",
    title: "CSHRTN",
    description: "Custom Framework",
    image: rectangle219_1,
    status: {
      text: "Mapping in Progress",
      variant: "progress",
      icon: iconSetings,
    },
  },
  {
    id: 3,
    type: "Custom Framework",
    title: "DCF 2023",
    description: "Demo Custom Framework",
    image: rectangle219_2,
    status: {
      text: "Ready to Publish",
      variant: "publish",
      icon: iconPlaylistCheck,
    },
  },
  {
    id: 4,
    type: "Custom Framework",
    title: "CF",
    description: "Cybersecurity Framework",
    image: rectangle219_3,
    status: {
      text: "Mapping Failed",
      variant: "failed",
      icon: iconClose,
    },
  },
  {
    id: 5,
    type: "Custom Framework",
    title: "ISCF",
    description: "Internet Security Custom Framework",
    image: rectangle219_4,
    status: {
      text: "Published",
      variant: "published",
      icon: iconCheck,
    },
  },
  {
    id: 6,
    type: "Custom Framework",
    title: "CSHRTN 2",
    description: "Custom Framework",
    image: rectangle219_5,
    status: {
      text: "Deactivated",
      variant: "deactivated",
      icon: iconArchiveLock,
    },
  },
  {
    id: 7,
    type: "System Framework",
    title: "GDPR",
    description: "General Data Protection Regulation",
    image: rectangle219_8,
    status: null,
  },
  {
    id: 8,
    type: "System Framework",
    title: "NIST CSF",
    description: "NIST Cybersecurity Framework",
    image: rectangle219_6,
    status: null,
  },
  {
    id: 9,
    type: "System Framework",
    title: "ISO27001",
    description: "Internet Security Management",
    image: rectangle219_7,
    status: null,
  },
];
