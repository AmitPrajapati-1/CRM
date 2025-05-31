import React, { useState } from 'react';
import axios from 'axios';

const AiMessageSelection = ({ messages, onConfirm }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Select AI Message for Campaign</h2>
      <ul className="space-y-4">
        {messages.map((msg, i) => (
          <li
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`cursor-pointer p-4 border rounded ${
              selectedIndex === i ? 'bg-blue-600 text-white' : 'bg-white text-black'
            }`}
          >
            {msg}
          </li>
        ))}
      </ul>

      <button
        disabled={selectedIndex === null}
        onClick={() => onConfirm(messages[selectedIndex])}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        Confirm & Create Campaign
      </button>
    </div>
  );
};

const CampaignCreationTab = () => {
  const [rules, setRules] = useState('');
  const [objective, setObjective] = useState('');
  const [audienceSize, setAudienceSize] = useState(null);
  const [aiMessages, setAiMessages] = useState([]);
  const [campaignCreated, setCampaignCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  const API_BASE = 'https://crm-backend-production-a717.up.railway.app';

  const resetForm = () => {
    setRules('');
    setObjective('');
    setAudienceSize(null);
    setAiMessages([]);
    setStep(1);
    setCampaignCreated(false);
  };

  const handlePreview = async () => {
    if (!rules.trim()) return alert('Please enter some rules.');
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE}/api/campaigns/preview`, { rules });
      setAudienceSize(data.audienceSize);
    } catch (err) {
      console.error(err);
      alert('Failed to preview audience.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMessages = async () => {
    if (!objective.trim()) return alert('Please enter a campaign objective.');
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE}/generate-messages`, { rules, objective });
      setAiMessages(data.messages.slice(0, 3));
      setStep(3);
    } catch (err) {
      console.error(err);
      alert('Failed to generate AI messages.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmMessage = async (message) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/campaigns/create`, { rules, message, objective });
      setCampaignCreated(true);
    } catch (err) {
      console.error(err);
      alert('Failed to create campaign.');
    } finally {
      setLoading(false);
    }
  };

  const handleShowHistory = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/campaigns`);
      setHistoryData(data);
      setShowHistory(true);
    } catch (err) {
      console.error(err);
      alert('Failed to load campaign history.');
    } finally {
      setLoading(false);
    }
  };

  // --- UI RENDERING ---

  if (showHistory) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">📜 Campaign History</h2>
        {historyData.length === 0 ? (
          <p>No campaigns found.</p>
        ) : (
          <ul className="space-y-4">
            {historyData.map((campaign, i) => (
              <li key={i} className="p-4 border rounded bg-gray-100 shadow text-gray-900">
                <p><strong>Name:</strong> {campaign.name}</p>
                <p><strong>Rules:</strong> {campaign.segmentRules}</p>
                <p><strong>Message:</strong> {campaign.message}</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <p><strong>📤 Sent:</strong> {campaign.sentCount}</p>
                  <p><strong>❌ Failed:</strong> {campaign.failedCount}</p>
                  <p><strong>👥 Audience Size:</strong> {campaign.audienceSize}</p>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>🕒 Created At:</strong> {new Date(campaign.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => setShowHistory(false)}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Back
        </button>
      </div>
    );
  }

  if (campaignCreated) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold text-green-600">🎉 Campaign Created!</h2>
        <p>Your campaign has been successfully created using the selected AI message.</p>
        <button
          onClick={resetForm}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Another Campaign
        </button>
      </div>
    );
  }

  if (step === 3 && aiMessages.length > 0) {
    return <AiMessageSelection messages={aiMessages} onConfirm={handleConfirmMessage} />;
  }

  if (step === 2) {
    return (
      <div className="max-w-xl mx-auto p-6 space-y-4">
        <h2 className="text-xl font-semibold">Enter Campaign Objective</h2>
        <input
          type="text"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          className="w-full p-3 border rounded text-black"
          placeholder="E.g., Re-engage inactive users"
        />
        <button
          onClick={handleGenerateMessages}
          className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate AI Messages'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-semibold">Define Audience Segment Rules</h2>
      <textarea
        rows={4}
        className="w-full p-3 border rounded text-black"
        placeholder="E.g., visits > 3 AND spend > 1000"
        value={rules}
        onChange={(e) => setRules(e.target.value)}
        disabled={loading}
      />

      <div className="flex space-x-4 mt-2">
        <button
          onClick={handlePreview}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Preview Audience Size'}
        </button>

        <button
          onClick={() => setStep(2)}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          disabled={loading || !rules.trim()}
        >
          Save Rules & Continue
        </button>
      </div>

      {audienceSize !== null && (
        <>
          <p className="mt-2">
            🎯 Matching Audience Size: <strong>{audienceSize}</strong>
          </p>
          <button
            onClick={handleShowHistory}
            className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            disabled={loading}
          >
            Show Campaign History
          </button>
        </>
      )}
    </div>
  );
};

export default CampaignCreationTab;
