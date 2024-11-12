'use client';

import { useState } from 'react';
import { Alert } from '@/components/common/Alert';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

const VipNumberForm = ({ vipNumber, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    number: vipNumber?.number || '',
    price: vipNumber?.price || '',
    status: vipNumber?.status || 'available'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/vip-numbers', {
        method: vipNumber ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: vipNumber?.id
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.errors?.join(', ') || 'Something went wrong');
      }

      onSubmit(data);
      setFormData({ number: '', price: '', status: 'available' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert type="error" message={error} />
      )}

      <div>
        <Input
          label="VIP Number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="Enter VIP number"
          required
        />
      </div>

      <div>
        <Input
          label="Price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
          required
        />
      </div>

      {vipNumber && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Saving...' : (vipNumber ? 'Update' : 'Create')}
        </Button>
        
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default VipNumberForm;