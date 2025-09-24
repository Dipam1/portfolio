import React, { useState } from "react";
import { motion } from "framer-motion";
import Education from "../Education/Education";
import Experience from "../Experience/Experience";
import Skills from "../Skills/Skills";
import Contact from "../Contact/Contact";
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
  // { name: "Achievements", icon: <FaMedal /> },
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
        <main className="main-container main-page-container">{children}</main>
      </div>
    </div>
  );
};

const wobble = {
  initial: { scale: 1 },
  animate: {
    scale: 1.1,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 1.5,
    },
  },
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
            <motion.li
              //

              animate={{
                borderRadius: [
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                  "30% 70% 62% 38% / 40% 60% 40% 60%",
                  "55% 45% 35% 65% / 58% 42% 58% 42%",
                  "40% 60% 70% 30% / 45% 55% 45% 55%",
                  "68% 32% 53% 47% / 61% 55% 45% 39%",
                  "34% 66% 66% 34% / 50% 40% 60% 50%",
                  "50% 50% 50% 50% / 50% 50% 50% 50%",
                  "42% 58% 58% 42% / 63% 37% 63% 37%",
                  "61% 39% 49% 51% / 44% 56% 44% 56%",
                  "36% 64% 56% 44% / 59% 41% 59% 41%",
                  "53% 47% 67% 33% / 41% 59% 41% 59%",
                  "69% 31% 41% 59% / 54% 46% 54% 46%",
                  "45% 55% 45% 55% / 65% 35% 65% 35%",
                  "50% 50% 50% 50% / 50% 50% 50% 50%",
                ],
              }}
              transition={{
                duration: 12,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
              // Example styles to make the component visible
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                fontWeight: "bold",
              }}
              //
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
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};
