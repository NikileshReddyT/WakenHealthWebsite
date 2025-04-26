import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="flex flex-col min-h-screen font-inter">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
      </div>
  );
}

export default App;
