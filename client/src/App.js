import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import DashboardLayout from './components/DashboardLayout';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WorkingProcess from './components/WorkingProcess';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/login';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import SignUpPage from './components/SignUpPage';
import WhySolar from './components/why-solar';
import Dashboard from './components/Dashboard';
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import Settings from './components/Settings';
import Payments from './components/Payments';
import Leads from './components/Leads';
import Books from './components/Books';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Pages with Header, Navbar, Footer */}
        <Route path="/" element={
          <>
            <Header />
            <Navbar />
            <Hero />
            <About />
            <Services />
            <WorkingProcess />
            <Contact />
            <Footer />
          </>
        } />

        <Route path="/about" element={
          <>
            <Header />
            <Navbar />
            <About />
            <Footer />
          </>
        } />

        <Route path="/services" element={
          <>
            <Header />
            <Navbar />
            <Services />
            <Footer />
          </>
        } />

        <Route path="/contact" element={
          <>
            <Header />
            <Navbar />
            <Contact />
            <Footer />
          </>
        } />

        <Route path="/why-solar" element={
          <>
            <Header />
            <Navbar />
            <WhySolar />
            <Footer />
          </>
        } />

        <Route path="/login" element={
          <>
            <Header />
            <Navbar />
            <Login />
            <Footer />
          </>
        } />

        <Route path="/signup" element={
          <>
            <Header />
            <Navbar />
            <SignUpPage />
            <Footer />
          </>
        } />

        <Route path="/forgot-password" element={
          <>
            <Header />
            <Navbar />
            <ForgotPasswordPage />
            <Footer />
          </>
        } />

        {/* Dashboard Pages with fixed Sidebar and Header */}
        <Route path="/dashboard" element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        } />

        <Route path="/dashboard/projects" element={
          <DashboardLayout>
            <Projects />
          </DashboardLayout>
        } />

        <Route path="/dashboard/tasks" element={
          <DashboardLayout>
            <Tasks />
          </DashboardLayout>
        } />

        <Route path="/dashboard/settings" element={
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        } />

        <Route path="/dashboard/leads" element={
          <DashboardLayout>
            <Leads />
          </DashboardLayout>
        } />

        <Route path="/dashboard/payments" element={
          <DashboardLayout>
            <Payments />
          </DashboardLayout>
        } />

        <Route path="/dashboard/books" element={
          <DashboardLayout>
            <Books />
          </DashboardLayout>
        } />

      </Routes>
    </Router>
  );
}

export default App;
