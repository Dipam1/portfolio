import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaChevronLeft,
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaMedal,
  FaEnvelope,
  FaChevronRight,
} from "react-icons/fa";
import "./Homepage.css";
import { select } from "motion/react-client";

export default function Homepage() {
  return (
    <>
      <Layout>
        
      </Layout>
    </>
  );
}

const navItems = [
  { name: "Introduction", icon: <FaUser /> },
  { name: "Education", icon: <FaGraduationCap /> },
  { name: "Experience", icon: <FaBriefcase /> },
  { name: "Skills", icon: <FaTools /> },
  { name: "Achievements", icon: <FaMedal /> },
  { name: "Contact", icon: <FaEnvelope /> },
];

const Layout = ({ children }) => {
  const [isCollapsed, setCollapsed] = useState(window.innerWidth <= 992);
  const [userCollapsed, setUserCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Introduction");

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (!userCollapsed) {
        setCollapsed(window.innerWidth <= 992);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [userCollapsed]);

  const sidebarVariants = {
    expanded: { width: 260 },
    collapsed: { width: 88 },
  };

  return (
    <div className="layout-shell">
      <motion.aside
        className="sidebar"
        initial={false}
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, type: "spring", bounce: 0.1 }}
      >
        <SidebarContent
          onToggle={() => {
            setUserCollapsed(!isCollapsed);
            setCollapsed(!isCollapsed);
          }}
          isCollapsed={isCollapsed}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </motion.aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <main className="main-container">{children}</main>
      </div>
    </div>
  );
};

const SidebarContent = ({ onToggle, isCollapsed, selectedItem, setSelectedItem }) => {
  return (
    <div className="sidebar-inner">
      <div className="sidebar-header">
        {!isCollapsed && (
          <motion.div
            className="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span>Dipam</span>
          </motion.div>
        )}
        <motion.div
          className="toggle-button"
          whileHover={{ scale: 1.1 }}
          onClick={onToggle}
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </motion.div>
      </div>

      <nav className="nav-menu">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                className="nav-button"
                onClick={() => setSelectedItem(item.name)}
              >
                <div className="nav-icon">{item.icon}</div>
                {!isCollapsed && <span className="nav-text">{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
