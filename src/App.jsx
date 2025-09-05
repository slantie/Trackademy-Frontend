import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Components
import Layout from "./components/layout/Layout";
import AuthLayout from "./components/layout/AuthLayout";

// Pages
import Home from "./pages/Home";
import Setup from "./pages/Setup";
import Authentication from "./pages/Authentication";
import CollegesPage from "./pages/admin/CollegesPage";
import SubjectsPage from "./pages/admin/SubjectsPage";
import SemestersPage from "./pages/admin/SemestersPage";
import DepartmentsPage from "./pages/admin/DepartmentsPage";
import AcademicYearsPage from "./pages/admin/AcademicYearsPage";
import FacultyPage from "./pages/admin/FacultyPage";
import StudentsPage from "./pages/admin/StudentsPage";
import DivisionsPage from "./pages/admin/DivisionsPage";
import UploadPage from "./pages/admin/UploadPage";
import DashboardHub from "./pages/Dashboard";

// Route Guards
import { Role } from "./constants/roles";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

// Toast Provider
import ToastProvider from "./providers/ToastProvider";
import Error from "./components/Error";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/setup"
          element={
            <Layout>
              <Setup />
            </Layout>
          }
        />

        {/* Auth Route (Login/Signup) */}
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthLayout>
                <Authentication />
              </AuthLayout>
            </PublicRoute>
          }
        />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardHub />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/colleges"
          element={
            <ProtectedRoute roles={[Role.ADMIN]}>
              <Layout>
                <CollegesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/departments"
          element={
            <ProtectedRoute roles={[Role.ADMIN]}>
              <Layout>
                <DepartmentsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/academic-year"
          element={
            <ProtectedRoute roles={[Role.ADMIN]}>
              <Layout>
                <AcademicYearsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/subject"
          element={
            <ProtectedRoute roles={[Role.ADMIN]}>
              <Layout>
                <SubjectsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/semester"
          element={
            <ProtectedRoute roles={[Role.ADMIN]}>
              <Layout>
                <SemestersPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/faculty"
          element={
            <ProtectedRoute roles={[Role.ADMIN]}>
              <Layout>
                <FacultyPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/student"
          element={
            <ProtectedRoute roles={[Role.ADMIN]}>
              <Layout>
                <StudentsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/division"
          element={
            <ProtectedRoute roles={[Role.ADMIN]}>
              <Layout>
                <DivisionsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/upload"
          element={
            <ProtectedRoute roles={[Role.ADMIN]}>
              <Layout>
                <UploadPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Fallback 404 Route */}
        <Route
          path="*"
          element={
            <Layout>
              <Error />
            </Layout>
          }
        />
      </Routes>
      <ToastProvider />
    </Router>
  );
}

export default App;
