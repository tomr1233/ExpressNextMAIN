import React, { useState, useEffect } from 'react';

export default function SMSSettings() {
  // Store data from the webhook here
  const [webhookData, setWebhookData] = useState(null);

  useEffect(() => {
    const fetchWebhookData = async () => {
      try {
        // Make a GET request to the Make.com webhook
        const response = await fetch(
          'https://hook.us1.make.com/vt71jvqerfmvthpili4t4ebvo3sbwyo4'
        );
        
        // Parse the response as JSON (adjust if your webhook sends another format)
        const data = await response.json();

        // Store the data in state
        setWebhookData(data);
      } catch (error) {
        console.error('Error fetching from Make webhook:', error);
      }
    };

    // Fetch the data as soon as the component mounts
    fetchWebhookData();
  }, []);

  return (
    <div>
      <h1>SMS Settings</h1>
      {/* Other UI code here if needed */}

      {/* Display the webhook data (if any) */}
      {webhookData ? (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <h2 className="text-sm font-semibold mb-2 text-gray-700">
            Webhook Response:
          </h2>
          <pre className="text-xs text-gray-600">
            {JSON.stringify(webhookData, null, 2)}
          </pre>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No data from webhook yet.</p>
      )}
    </div>
  );
}