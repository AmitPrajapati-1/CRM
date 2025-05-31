import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function CampaignLogsTab() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('https://crm-backend-production-a717.up.railway.app/api/logs')
      .then((res) => setLogs(res.data))
      .catch((err) => {
        console.error('Error fetching logs:', err);
        setError('Failed to load logs. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-white">📋 Campaign Communication Logs</h2>

      <div className="overflow-x-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
        <table className="min-w-full text-sm text-white">
          <thead className="text-left bg-white/5 text-gray-200 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Campaign</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3">Sent At</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-red-400">
                  {error}
                </td>
              </tr>
            ) : logs.length > 0 ? (
              logs.map((log) => (
                <tr
                  key={log._id}
                  className="hover:bg-white/5 transition border-t border-white/10"
                >
                  <td className="px-6 py-4">{log.campaignName}</td>
                  <td className="px-6 py-4">{log.customerName}</td>
                  <td
                    className={`px-6 py-4 font-medium ${
                      log.status === 'sent' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {log.status}
                  </td>
                  <td
                    className={`px-6 py-4 font-medium ${
                      log.status === 'sent' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {log.message}
                  </td>
                  <td className="px-6 py-4">
                    {log.sentAt
                      ? new Date(log.sentAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })
                      : '—'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
