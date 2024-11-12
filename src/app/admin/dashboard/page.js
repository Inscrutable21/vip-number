"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, Plus, Edit2, Trash2, ChevronDown } from 'lucide-react';
import VipNumberForm from '@/components/admin/VipNumberForm';
import LogoutButton from '@/components/admin/LogoutButton';
import HeroImageManager from '@/components/admin/HeroImageManager';

const AdminDashboard = () => {
  const [vipNumbers, setVipNumbers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingVipNumber, setEditingVipNumber] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeSection, setActiveSection] = useState('vip');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchVipNumbers = async () => {
    try {
      const response = await fetch('/api/vip-numbers');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch VIP numbers');
      }

      setVipNumbers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVipNumbers();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleSubmit = async (data) => {
    setVipNumbers(prev => {
      if (editingVipNumber) {
        return prev.map(vn => vn.id === data.id ? data : vn);
      }
      return [data, ...prev];
    });
    setEditingVipNumber(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this VIP number?')) return;
    
    try {
      const response = await fetch(`/api/vip-numbers?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete VIP number');
      }

      setVipNumbers(prev => prev.filter(vn => vn.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const StatusBadge = ({ status }) => (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
      status === 'available'
        ? 'bg-green-100 text-green-800'
        : 'bg-gray-100 text-gray-800'
    }`}>
      {status}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="ml-2 text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center">
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                setActiveSection('vip');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                activeSection === 'vip'
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              VIP Numbers
            </button>
            <button
              onClick={() => {
                setActiveSection('hero');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                activeSection === 'hero'
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Hero Images
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop Navigation Tabs */}
        <div className="hidden md:block mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveSection('vip')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSection === 'vip'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              VIP Numbers
            </button>
            <button
              onClick={() => setActiveSection('hero')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSection === 'hero'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Hero Images
            </button>
          </nav>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg relative">
            <p className="pr-8">{error}</p>
            <button
              className="absolute top-0 right-0 p-4 text-red-700 hover:text-red-900"
              onClick={() => setError('')}
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Content Sections */}
        {activeSection === 'vip' ? (
          <div className="space-y-6">
            {/* Action Button */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setEditingVipNumber(null);
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showForm ? (
                  <>
                    <X size={20} className="mr-2" />
                    Hide Form
                  </>
                ) : (
                  <>
                    <Plus size={20} className="mr-2" />
                    Add VIP Number
                  </>
                )}
              </button>
            </div>

            {/* VIP Number Form */}
            {showForm && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <VipNumberForm
                  vipNumber={editingVipNumber}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingVipNumber(null);
                  }}
                />
              </div>
            )}

            {/* VIP Numbers List/Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                          Loading...
                        </td>
                      </tr>
                    ) : vipNumbers.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                          No VIP numbers found
                        </td>
                      </tr>
                    ) : (
                      vipNumbers.map((vipNumber) => (
                        <tr key={vipNumber.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {vipNumber.number}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatPrice(vipNumber.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={vipNumber.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setEditingVipNumber(vipNumber);
                                  setShowForm(true);
                                }}
                                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                              >
                                <Edit2 size={16} className="mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(vipNumber.id)}
                                className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                              >
                                <Trash2 size={16} className="mr-1" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-gray-200">
                {loading ? (
                  <div className="p-4 text-center text-gray-500">Loading...</div>
                ) : vipNumbers.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">No VIP numbers found</div>
                ) : (
                  vipNumbers.map((vipNumber) => (
                    <div key={vipNumber.id} className="p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-lg font-medium text-gray-900">{vipNumber.number}</p>
                          <p className="text-sm text-gray-500">{formatPrice(vipNumber.price)}</p>
                          <StatusBadge status={vipNumber.status} />
                        </div>
                        <button
                          onClick={() => setExpandedRow(expandedRow === vipNumber.id ? null : vipNumber.id)}
                          className="p-2 text-gray-500 hover:text-gray-700"
                        >
                          <ChevronDown
                            size={20}
                            className={`transform transition-transform ${
                              expandedRow === vipNumber.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>
                      {expandedRow === vipNumber.id && (
                        <div className="pt-2 flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingVipNumber(vipNumber);
                              setShowForm(true);
                            }}
                            className="flex-1 inline-flex justify-center items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          >
                            <Edit2 size={16} className="mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(vipNumber.id)}
                            className="flex-1 inline-flex justify-center items-center px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          // Hero Images Management Section
          <div className="bg-white rounded-lg shadow-lg p-6">
            <HeroImageManager />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;