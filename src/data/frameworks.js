// Mock framework control data
export const frameworkControlsData = {
  1: {
    data: [
      { controlId: "ECF-001", category: "Access Control", description: "Implement strong password policies" },
      { controlId: "ECF-002", category: "Data Protection", description: "Encrypt sensitive data at rest" },
      { controlId: "ECF-003", category: "Network Security", description: "Configure firewall rules" },
      { controlId: "ECF-004", category: "Monitoring", description: "Set up security event logging" },
      { controlId: "ECF-005", category: "Incident Response", description: "Develop incident response plan" }
    ]
  },
  2: {
    data: [
      { controlId: "CSH-001", category: "Authentication", description: "Multi-factor authentication" },
      { controlId: "CSH-002", category: "Authorization", description: "Role-based access control" },
      { controlId: "CSH-003", category: "Data Security", description: "Data classification system" }
    ]
  },
  3: {
    data: [
      { controlId: "DCF-001", category: "Physical Security", description: "Secure facility access" },
      { controlId: "DCF-002", category: "Asset Management", description: "Asset inventory system" },
      { controlId: "DCF-003", category: "Business Continuity", description: "Disaster recovery plan" }
    ]
  }
};

// Framework data
export const frameworksData = [
  {
    id: 1,
    type: "Custom Framework",
    title: "ECF 2023",
    description: "Example Custom Framework",
    image: "/assets/images/rectangle-219.png",
    status: {
      text: "Ready to Map",
      variant: "ready",
      icon: "/assets/images/icon-info.svg",
    },
  },
  {
    id: 2,
    type: "Custom Framework",
    title: "CSHRTN",
    description: "Custom Framework",
    image: "/assets/images/rectangle-219-1.png",
    status: {
      text: "Mapping in Progress",
      variant: "progress",
      icon: "/assets/images/icon-setings.svg",
    },
  },
  {
    id: 3,
    type: "Custom Framework",
    title: "DCF 2023",
    description: "Demo Custom Framework",
    image: "/assets/images/rectangle-219-2.png",
    status: {
      text: "Ready to Publish",
      variant: "publish",
      icon: "/assets/images/icon-playlist-check.svg",
    },
  },
  {
    id: 4,
    type: "Custom Framework",
    title: "CF",
    description: "Cybersecurity Framework",
    image: "/assets/images/rectangle-219-3.png",
    status: {
      text: "Mapping Failed",
      variant: "failed",
      icon: "/assets/images/icon-close.svg",
    },
  },
  {
    id: 5,
    type: "Custom Framework",
    title: "ISCF",
    description: "Internet Security Custom Framework",
    image: "/assets/images/rectangle-219-4.png",
    status: {
      text: "Published",
      variant: "published",
      icon: "/assets/images/icon-check.svg",
    },
  },
  {
    id: 6,
    type: "Custom Framework",
    title: "CSHRTN 2",
    description: "Custom Framework",
    image: "/assets/images/rectangle-219-5.png",
    status: {
      text: "Deactivated",
      variant: "deactivated",
      icon: "/assets/images/icon-archive-lock.svg",
    },
  },
  {
    id: 7,
    type: "System Framework",
    title: "GDPR",
    description: "General Data Protection Regulation",
    image: "/assets/images/rectangle-219-8.svg",
    status: null,
  },
  {
    id: 8,
    type: "System Framework",
    title: "NIST CSF",
    description: "NIST Cybersecurity Framework",
    image: "/assets/images/rectangle-219-6.png",
    status: null,
  },
  {
    id: 9,
    type: "System Framework",
    title: "ISO27001",
    description: "Internet Security Management",
    image: "/assets/images/rectangle-219-7.png",
    status: null,
  },
];
