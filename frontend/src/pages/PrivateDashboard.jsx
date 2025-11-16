import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import api from '../services/api';

const PrivateDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    gymProgress: 0,
    fridgeItems: 0,
    devices: 0,
    cppProblems: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [gym, fridge, devices, cpp] = await Promise.all([
          api.get('/gym-progress').catch(() => ({ data: [] })),
          api.get('/fridge').catch(() => ({ data: [] })),
          api.get('/devices').catch(() => ({ data: [] })),
          api.get('/cpp-problems').catch(() => ({ data: [] })),
        ]);

        setStats({
          gymProgress: gym.data?.length || 0,
          fridgeItems: fridge.data?.length || 0,
          devices: devices.data?.length || 0,
          cppProblems: cpp.data?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px', color: '#fff', textAlign: 'center' }}>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0e27', padding: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{ color: '#fff', fontSize: '32px' }}>
            Welcome, {user?.username}!
          </h1>
          <button
            onClick={logout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff6b6b',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Logout
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ color: '#fff', marginBottom: '12px' }}>Gym Progress</h3>
            <p style={{ color: '#4CAF50', fontSize: '32px', fontWeight: 'bold' }}>
              {stats.gymProgress}
            </p>
            <p style={{ color: '#aaa', fontSize: '14px' }}>Sessions tracked</p>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ color: '#fff', marginBottom: '12px' }}>Fridge Items</h3>
            <p style={{ color: '#2196F3', fontSize: '32px', fontWeight: 'bold' }}>
              {stats.fridgeItems}
            </p>
            <p style={{ color: '#aaa', fontSize: '14px' }}>Items in fridge</p>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ color: '#fff', marginBottom: '12px' }}>Devices</h3>
            <p style={{ color: '#FF9800', fontSize: '32px', fontWeight: 'bold' }}>
              {stats.devices}
            </p>
            <p style={{ color: '#aaa', fontSize: '14px' }}>Devices tracked</p>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ color: '#fff', marginBottom: '12px' }}>C++ Problems</h3>
            <p style={{ color: '#9C27B0', fontSize: '32px', fontWeight: 'bold' }}>
              {stats.cppProblems}
            </p>
            <p style={{ color: '#aaa', fontSize: '14px' }}>Problems solved</p>
          </div>
        </div>

        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h2 style={{ color: '#fff', marginBottom: '20px' }}>Quick Links</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            <a href="/private/gym" style={{
              color: '#4CAF50',
              textDecoration: 'none',
              padding: '12px',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>Gym Progress</a>
            <a href="/private/fridge" style={{
              color: '#2196F3',
              textDecoration: 'none',
              padding: '12px',
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>Fridge Management</a>
            <a href="/private/devices" style={{
              color: '#FF9800',
              textDecoration: 'none',
              padding: '12px',
              backgroundColor: 'rgba(255, 152, 0, 0.1)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>Devices</a>
            <a href="/private/cpp-problems" style={{
              color: '#9C27B0',
              textDecoration: 'none',
              padding: '12px',
              backgroundColor: 'rgba(156, 39, 176, 0.1)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>C++ Problems</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateDashboard;

// Force server-side rendering to prevent static generation
export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

