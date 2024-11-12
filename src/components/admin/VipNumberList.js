'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Alert } from '@/components/common/Alert';

const VipNumberList = ({ 
  vipNumbers, 
  onEdit, 
  onDelete, 
  loading, 
  error 
}) => {
  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-24 bg-gray-200 rounded"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        type="error"
        message={error}
        className="mb-4"
      />
    );
  }

  if (!vipNumbers.length) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No VIP numbers found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {vipNumbers.map((vipNumber) => (
        <Card key={vipNumber.id} className="relative">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{vipNumber.number}</h3>
              <p className="text-gray-600">{formatPrice(vipNumber.price)}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                vipNumber.status === 'available'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {vipNumber.status}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => onEdit(vipNumber)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this VIP number?')) {
                    onDelete(vipNumber.id);
                  }
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default VipNumberList;