import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import DataIngestionTab from '../components/dashboard/DataIngestionTab';
import CampaignCreationTab from '../components/dashboard/CampaignCreationTab';
import CampaignLogsTab from '../components/dashboard/CampaignLogsTab';
import CustomerInsightsTab from '../components/dashboard/CustomerInsightsTab';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../components/ui/tabs';

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  const tabs = [
    { label: 'Data Ingestion APIs', value: 'ingestion', component: <DataIngestionTab /> },
    { label: 'Campaign Creation', value: 'campaign', component: <CampaignCreationTab /> },
    { label: 'Campaign Logs', value: 'logs', component: <CampaignLogsTab /> },
    { label: 'Customer Insights', value: 'insights', component: <CustomerInsightsTab /> },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-poppins overflow-hidden">
      {/* Floating Blobs */}
      <div className="absolute top-[-100px] left-[-80px] w-96 h-96 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-floatSlow z-0" />
      <div className="absolute bottom-[-80px] right-[-60px] w-80 h-80 bg-pink-400 opacity-30 rounded-full blur-2xl animate-floatFast z-0" />

      {/* Dashboard Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto py-12 px-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold tracking-wide drop-shadow-md">CRM Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="px-5 py-2 bg-gradient-to-r from-pink-500 via-yellow-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-pink-400 transition"
          >
            Logout
          </motion.button>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue={tabs[0].value} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
          <TabsList className="flex gap-4 flex-wrap justify-center mb-6">
            {tabs.map(({ label, value }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="text-white px-4 py-2 rounded-lg hover:bg-white/10 transition font-medium"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map(({ value, component }) => (
            <TabsContent key={value} value={value}>
              {component}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Dashboard;
