import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CustomerInsightsTab() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('https://crm-backend-production-a717.up.railway.app/api/customers/top')
      .then((res) => setCustomers(res.data))
      .catch((err) => {
        console.error('Failed to fetch customer insights:', err);
        setError('Failed to load customer insights. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mt-6 p-4 bg-white/10 rounded-xl shadow-xl backdrop-blur-md border border-white/10">
      <h2 className="text-2xl font-bold mb-6 text-white">📊 Top Customers by Spend</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-white">
          <thead className="bg-white/10 text-white border-b border-white/10">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Total Spend</th>
              <th className="px-6 py-3">Visits</th>
              <th className="px-6 py-3">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
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
            ) : customers.length > 0 ? (
              customers.map((c) => (
                <tr key={c._id} className="hover:bg-white/5 transition duration-200">
                  <td className="px-6 py-4">{c.name || 'N/A'}</td>
                  <td className="px-6 py-4">{c.email || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 rounded-full font-medium">
                      ${typeof c.totalSpend === 'number' ? c.totalSpend.toFixed(2) : '0.00'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{c.visits ?? 0}</td>
                  <td className="px-6 py-4">
                    {c.lastActive
                      ? new Date(c.lastActive).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No customer insights found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
