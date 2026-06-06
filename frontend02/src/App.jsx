import React, { useState } from 'react';
import Navbar          from './components/Navbar.jsx';
import HomePage        from './components/HomePage.jsx';
import ProjectsPage    from './components/ProjectsPage.jsx';
import FreelancersPage from './components/FreelancersPage.jsx';
import ContactPage     from './components/ContactPage.jsx';
import TaskManager     from './components/TaskManager.jsx';
import Footer          from './components/Footer.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');

  function renderPage() {
    switch (activeTab) {
      case 'Tasks':       return <TaskManager />;
      case 'Projects':    return <ProjectsPage />;
      case 'Freelancers': return <FreelancersPage />;
      case 'Contact':     return <ContactPage />;
      default:            return <HomePage setActiveTab={setActiveTab} />;
    }
  }

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>{renderPage()}</main>
      <Footer />
    </>
  );
}
