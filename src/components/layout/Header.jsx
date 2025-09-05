import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, LogOut, Menu, X } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { useAuth } from "../../hooks/useAuth";
import { Role } from "../../constants/roles";
import { showToast } from "../../utils/toast";

const getNavItems = (role) => {
  switch (role) {
    case Role.STUDENT:
      return [
        { path: "/dashboard", label: "Dashboard" },
        { path: "/student/assignments", label: "Assignments" },
        { path: "/student/results", label: "Results" },
        { path: "/student/certificates", label: "Certificates" },
        { path: "/student/internships", label: "Internships" },
      ];
    case Role.FACULTY:
      return [
        { path: "/dashboard", label: "Dashboard" },
        { path: "/faculty/courses", label: "Courses" },
        { path: "/faculty/assignments", label: "Assignments" },
        { path: "/faculty/attendance", label: "Attendance" },
      ];
    case Role.ADMIN:
      return [
        { path: "/dashboard", label: "Dashboard" },
        { path: "/admin/colleges", label: "Colleges" },
        { path: "/admin/departments", label: "Departments" },
        { path: "/admin/students", label: "Students" },
        { path: "/admin/upload", label: "Upload" },
      ];
    default:
      return [{ path: "/", label: "Home" }];
  }
};

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const navItems = isAuthenticated
    ? getNavItems(user?.role)
    : [
        { path: "/", label: "Home" },
        { path: "/setup", label: "Setup" },
      ];

  const handleLogout = () => {
    logout();
    showToast.success("You have been logged out.");
    navigate("/");
  };

  const handleProfileClick = () => {
    setShowUserMenu(false);
    setShowMobileMenu(false);
    navigate("/profile");
  };

  const _handleNavClick = () => {
    setShowMobileMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest(".user-menu-container")) {
        setShowUserMenu(false);
      }
      if (showMobileMenu && !event.target.closest(".mobile-menu-container")) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu, showMobileMenu]);

  return (
    <header className="p-4 flex justify-between items-center border-b-2 border-light-muted-text/20 dark:border-dark-muted-text/20 relative">
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/Logo.png" alt="Logo" className="w-8 h-8" />
        <h1 className="text-xl md:text-2xl font-semibold tracking-wide hover:text-light-highlight dark:hover:text-dark-highlight truncate">
          Trackademy
        </h1>
      </div>

      <div className="hidden lg:flex items-center space-x-4">
        <nav>
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative text-md tracking-wider text-light-text hover:text-light-highlight dark:text-dark-text dark:hover:text-dark-highlight transition-colors duration-300 ${
                      isActive
                        ? "text-light-highlight dark:text-dark-highlight"
                        : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center space-x-2">
          <span className="h-10 border-l-2 border-light-muted-text/20 dark:border-dark-muted-text/20"></span>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {isAuthenticated && user ? (
            <div className="relative user-menu-container">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 bg-light-muted-background dark:bg-dark-muted-background border-2 border-light-muted-text/20 hover:border-light-highlight dark:hover:border-dark-highlight dark:border-dark-muted-text/20 tracking-wider font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-light-highlight to-light-highlight/80 dark:from-dark-highlight dark:to-dark-highlight/80 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span className="hidden xl:inline">{user.name}</span>
                <div
                  className={`transform transition-transform duration-200 ${
                    showUserMenu ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </div>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-light-background dark:bg-dark-background border-2 border-light-muted-text/20 dark:border-dark-muted-text/20 rounded-lg shadow-lg z-50 overflow-hidden">
                  <div className="py-2">
                    <button
                      onClick={handleProfileClick}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left text-light-text dark:text-dark-text hover:bg-light-muted-background/50 dark:hover:bg-dark-muted-background/50 transition-colors duration-200"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <div className="border-t border-light-muted-text/10 dark:border-dark-muted-text/10 my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink
                to="/auth?view=login"
                className="bg-light-muted-background dark:bg-dark-muted-background border-2 border-light-muted-text/20 hover:border-light-highlight dark:hover:border-dark-highlight dark:border-dark-muted-text/20 tracking-wider font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Login
              </NavLink>
              <NavLink
                to="/auth?view=signup"
                className="bg-gradient-to-r from-light-highlight to-light-highlight/90 dark:from-dark-highlight dark:to-dark-highlight/90 text-white border-2 border-transparent tracking-wider font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
      <div className="flex lg:hidden items-center space-x-3">
        <ThemeToggle />
        <div className="mobile-menu-container">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 bg-light-muted-background dark:bg-dark-muted-background border-2 border-light-muted-text/20 hover:border-light-highlight dark:hover:border-dark-highlight dark:border-dark-muted-text/20 rounded-lg transition-all duration-300"
          >
            {showMobileMenu ? (
              <X className="w-5 h-5 text-light-text dark:text-dark-text" />
            ) : (
              <Menu className="w-5 h-5 text-light-text dark:text-dark-text" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
