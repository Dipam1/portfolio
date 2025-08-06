import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaWordpress, FaPhp, FaAws } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiRedux, SiHtml5, SiCss3, SiMui, SiAntdesign, SiBootstrap, SiExpress, SiFirebase, SiMongodb, SiGraphql, SiHeroku, SiShopify, SiJira, SiFigma, SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { DiMysql } from "react-icons/di";
import developerData from '../../Assets/info.json';
import './FloatingSkills.css';

const iconMap = {
  ReactJS: FaReact,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Redux: SiRedux,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  "Material UI": SiMui,
  "Ant Design": SiAntdesign,
  Bootstrap: SiBootstrap,
  "Node.js": FaNodeJs,
  ExpressJS: SiExpress,
  "REST APIs": null, // No specific icon
  Firebase: SiFirebase,
  MongoDB: SiMongodb,
  SQL: DiMysql,
  GraphQL: SiGraphql,
  "Git (GitHub, GitLab)": FaGitAlt,
  Docker: FaDocker,
  Heroku: SiHeroku,
  AWS: FaAws,
  Zoho: null, // No specific icon
  Shopify: SiShopify,
  Jira: SiJira,
  "UI/UX Design (Figma)": SiFigma,
  WordPress: FaWordpress,
  Liquid: null, // No specific icon
  "CI/CD pipelines": null, // No specific icon
  "Agile/Scrum": null, // No specific icon
  NextJS: SiNextdotjs,
  TailwindCSS: SiTailwindcss,
  PHP: FaPhp
};

const quadrantBoundaries = {
  frontEnd: { top: [5, 45], left: [5, 45] },
  backEnd: { top: [5, 45], left: [55, 95] },
  devOpsAndTools: { top: [55, 95], left: [5, 45] },
  other: { top: [55, 95], left: [55, 95] },
};

const FloatingSkills = () => {
  const { skills } = developerData;

  const [positions] = useState(() => {
    const initialPositions = {};
    Object.entries(skills).forEach(([category, skillList]) => {
      const quadrant = quadrantBoundaries[category];
      if (!quadrant) return;

      skillList.forEach(skill => {
        initialPositions[skill] = {
          top: `${Math.random() * (quadrant.top[1] - quadrant.top[0]) + quadrant.top[0]}%`,
          left: `${Math.random() * (quadrant.left[1] - quadrant.left[0]) + quadrant.left[0]}%`,
        };
      });
    });
    return initialPositions;
  });

  return (
    <div className="floating-skills-container">
      <div className="quadrant front-end">
        <h3 className="quadrant-title">Front End</h3>
      </div>
      <div className="quadrant back-end">
        <h3 className="quadrant-title">Back End</h3>
      </div>
      <div className="quadrant devops-tools">
        <h3 className="quadrant-title">DevOps & Tools</h3>
      </div>
      <div className="quadrant other">
        <h3 className="quadrant-title">Other</h3>
      </div>

      {Object.values(skills).flat().map(skill => {
        const Icon = iconMap[skill];
        if (!Icon) return null;

        return (
          <motion.div
            key={skill}
            className="skill-bubble"
            style={{
              top: positions[skill]?.top,
              left: positions[skill]?.left,
            }}
            animate={{
              translateX: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20],
              translateY: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <Icon />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingSkills;