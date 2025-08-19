import React, { useState } from "react";
import { motion } from "framer-motion";
import Education from "../Education/Education";
import Experience from "../Experience/Experience";
import Skills from "../Skills/Skills";
import Contact from "../Contact/Contact";
import Achievements from "../Achievements/Achievements";
import Introduction from "../Introduction/Introduction";
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
import { Route, Routes, useNavigate } from "react-router";
import ParticlesBG from "../../Components/ParticlesBG";
//get the selectedItem and write that as h1
export default function Homepage() {
  //check the current path and set the selectedItem accordingly

  let navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("Introduction");
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path === "/") {
      setSelectedItem("Introduction");
    } else {
      const item = path.slice(1); // remove leading '/'
      const capitalizedItem =
        item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
      const validItems = navItems.map((nav) => nav.name.toLowerCase());
      if (validItems.includes(item.toLowerCase())) {
        setSelectedItem(capitalizedItem);
      } else {
        // If path is invalid, redirect to homepage
        navigate("/");
      }
    }
  }, [navigate]);

  return (
    <>
      <Layout selectedItem={selectedItem} setSelectedItem={setSelectedItem}>
        {/* add a react router to route */}
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/education" element={<Education />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
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

const Layout = ({ children, selectedItem, setSelectedItem }) => {
  const [isCollapsed, setCollapsed] = useState(window.innerWidth <= 992);
  const [userCollapsed, setUserCollapsed] = useState(false);

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
    expanded: { width: 238 },
    collapsed: { width: 88 },
  };

  return (
    <div className="layout-shell">
      <motion.div
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
      </motion.div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <main className="main-container main-page-container">
          {/* implement tsparticles */}
          <ParticlesBG />
          {children}
        </main>
      </div>
    </div>
  );
};

const SidebarContent = ({
  onToggle,
  isCollapsed,
  selectedItem,
  setSelectedItem,
}) => {
  let navigate = useNavigate();
  const clickedNavItem = (name) => {
    //route to the page
    // use react router to route to the page using js
    setSelectedItem(name);
    navigate(`/${name === "Introduction" ? "" : name.toLowerCase()}`);
    //scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // animate from left on startup
    <motion.div className="sidebar-inner">
      <div className={`sidebar-header ${isCollapsed ? "flex-col" : ""}`}>
        <motion.div
          className="logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span>Dipam</span>
        </motion.div>

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
            <li
              key={item.name}
              className={`nav-item ${
                selectedItem === item.name ? "active" : ""
              }`}
            >
              <button
                className="nav-button"
                onClick={() => clickedNavItem(item.name)}
              >
                <div className="nav-icon">{item.icon}</div>
                {!isCollapsed && <span className="nav-text">{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};
