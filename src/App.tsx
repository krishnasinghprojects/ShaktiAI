// @ts-nocheck
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/AuthPage';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navigation/Navbar';
import { Dashboard } from './components/Dashboard/Dashboard';
import Appliances from './pages/Appliances';
import Community from './pages/Community';
import Routines from './pages/Routines';
import AIConversation from './pages/AIConversation';
import Simulation from './pages/Simulation';
import VoiceDemo from './pages/VoiceDemo';
import Rewards from './pages/Rewards';
import RotatingEarth from './components/RotatingEarth';

import { NotificationProvider } from './contexts/NotificationContext';
import './index.css';

function AppContent() {
  const { currentUser } = useAuth();

  console.log('🔐 Auth Status:', { currentUser: !!currentUser, uid: currentUser?.uid });

  // Temporary bypass for testing - comment this out when authentication is needed
  const bypassAuth = true;

  if (!currentUser && !bypassAuth) {
    console.log('❌ No user authenticated, showing AuthPage');
    return <AuthPage />;
  }

  console.log('✅ User authenticated (or bypassed), showing main app');
  return (
    <NotificationProvider>
      <div className="App min-h-screen serif-optimized">
        <Routes>
          <Route path="/" element={
            <>
             
              <Navbar />
              <main><Dashboard /></main>
            </>
          } />
          <Route path="/dashboard" element={
            <>
             
              <Navbar />
              <main><Dashboard /></main>
            </>
          } />
          <Route path="/appliances" element={
            <>
         
              <Navbar />
              <main><Appliances /></main>
            </>
          } />
          <Route path="/community" element={
            <>

              <Navbar />
              <main><Community /></main>
            </>
          } />
          <Route path="/routine" element={
            <>
      
              <Navbar />
              <main><Routines /></main>
            </>
          } />
          <Route path="/ai-chat" element={
            <>
   
              <Navbar />
              <main><AIConversation /></main>
            </>
          } />
          <Route path="/simulation" element={
            <>
 
              <Navbar />
              <main><Simulation /></main>
            </>
          } />
          <Route path="/voice-demo" element={
            <>

              <Navbar />
              <main><VoiceDemo /></main>
            </>
          } />
          <Route path="/rewards" element={
            <>

              <Navbar />
              <main><Rewards /></main>
            </>
          } />
        </Routes>
      </div>
    </NotificationProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;