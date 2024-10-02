"use client"; // Required for React hooks

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Link {
  label?: string;
  type?: string;
  url: string;
}

interface TokenBoost {
  url: string;
  chainId: string;
  icon: string;
  header: string;
  description?: string;
  links?: Link[];
  totalAmount: number;
}

const Home: React.FC = () => {
  const [data, setData] = useState<TokenBoost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<TokenBoost[]>('https://api.dexscreener.com/token-boosts/top/v1');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Top Token Boosts</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>DexScreener</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Chain ID</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Icon</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Header</th>
            <th style={{ border: '1px solid black', padding: '8px', width: '25%' }}>Description</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Total Amount</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Links</th>
          </tr>
        </thead>
        <tbody>
          {data.map((token, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <a href={token.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'blue' }}>
                  OPEN
                </a>
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{token.chainId}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <img src={token.icon} alt="Token Icon" style={{ width: '50px', height: '50px' }} />
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <img src={token.header} alt="Token Header" style={{ width: '100px', height: '50px' }} />
              </td>
              <td style={{ border: '1px solid black', padding: '8px', width: '25%' }}>{token.description || 'No description available'}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{token.totalAmount}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {token.links && token.links.length > 0 ? (
                  token.links.map((link, idx) => (
                    <div key={idx}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'underline', color: 'blue' }}
                      >
                        {link.label || link.type}
                      </a>
                    </div>
                  ))
                ) : (
                  'No links available'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
