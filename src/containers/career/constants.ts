import { ICareerList } from '@/app/careers/page';

export const careerListData: ICareerList[] = [
  {
    title: 'Senior Frontend Developer',
    status: 'Full Time',
    desc: `We are looking for an experienced Senior Frontend Developer to join our dynamic team. 
You will be responsible for developing user-facing features, ensuring optimal performance, and collaborating with cross-functional teams to deliver high-quality web applications.

Key Responsibilities:
• Develop and maintain responsive web applications using modern frameworks
• Collaborate with UX/UI designers to implement pixel-perfect designs
• Optimize applications for maximum speed and scalability
• Mentor junior developers and contribute to code reviews
• Stay up-to-date with emerging technologies and industry best practices`,
    req: [
      "Bachelor's degree in Computer Science or related field",
      '5+ years of experience in frontend development',
      'Proficiency in React, TypeScript, and modern JavaScript',
      'Experience with state management libraries (Redux, Zustand)',
      'Strong understanding of HTML5, CSS3, and responsive design',
      'Familiarity with version control systems (Git)',
      'Experience with testing frameworks (Jest, React Testing Library)',
      'Excellent problem-solving and communication skills',
      'Experience with Next.js and server-side rendering (Preferred)',
      'Knowledge of CSS-in-JS libraries (Material-UI, Styled Components) (Preferred)',
      'Familiarity with CI/CD pipelines (Preferred)',
      'Experience with performance optimization techniques (Preferred)',
    ],
  },
  {
    title: 'Backend Developer',
    status: 'Full Time',
    desc: `Join our backend team to build robust, scalable server-side applications and APIs. 
You will work on designing and implementing efficient database schemas, developing RESTful APIs, and ensuring the security and performance of our backend systems.

Key Responsibilities:
• Design and develop scalable backend services and APIs
• Implement database schemas and optimize queries
• Integrate third-party services and APIs
• Ensure application security and data protection
• Monitor and troubleshoot production issues
• Collaborate with frontend teams to define API contracts`,
    req: [
      "Bachelor's degree in Computer Science or related field",
      '3+ years of experience in backend development',
      'Proficiency in Node.js, Python, or Java',
      'Experience with relational databases (PostgreSQL, MySQL)',
      'Understanding of RESTful API design principles',
      'Knowledge of cloud platforms (AWS, GCP, Azure)',
      'Experience with containerization (Docker)',
      'Strong debugging and problem-solving skills',
      'Experience with microservices architecture (Preferred)',
      'Knowledge of NoSQL databases (MongoDB, Redis) (Preferred)',
      'Familiarity with message queues (RabbitMQ, Apache Kafka) (Preferred)',
      'Experience with GraphQL (Preferred)',
      'Understanding of DevOps practices (Preferred)',
    ],
  },
  {
    title: 'DevOps Engineer',
    status: 'Full Time',
    desc: `We are seeking a skilled DevOps Engineer to streamline our development and deployment processes. 
You will be responsible for building and maintaining CI/CD pipelines, managing cloud infrastructure, and ensuring the reliability and scalability of our systems.

Key Responsibilities:
• Design and implement CI/CD pipelines
• Manage cloud infrastructure and resources
• Automate deployment and monitoring processes
• Ensure system security and compliance
• Optimize system performance and cost efficiency
• Collaborate with development teams to improve workflows`,
    req: [
      "Bachelor's degree in Computer Science or related field",
      '4+ years of experience in DevOps or system administration',
      'Proficiency with cloud platforms (AWS, GCP, Azure)',
      'Experience with containerization and orchestration (Docker, Kubernetes)',
      'Knowledge of Infrastructure as Code (Terraform, CloudFormation)',
      'Familiarity with CI/CD tools (Jenkins, GitLab CI, GitHub Actions)',
      'Strong scripting skills (Bash, Python, PowerShell)',
      'Experience with monitoring tools (Prometheus, Grafana, ELK Stack)',
      'Certification in cloud platforms (Preferred)',
      'Experience with service mesh technologies (Istio, Linkerd) (Preferred)',
      'Knowledge of security best practices and compliance (Preferred)',
      'Familiarity with database administration (Preferred)',
      'Experience with configuration management tools (Ansible, Puppet) (Preferred)',
    ],
  },
];
