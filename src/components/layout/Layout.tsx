
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AssistantWidget from '@/components/ai/AssistantWidget';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
      <AssistantWidget />
    </div>
  );
};

export default Layout;
