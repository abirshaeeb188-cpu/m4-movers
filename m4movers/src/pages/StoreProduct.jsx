import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Calendar, FileText, AlignLeft, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

export default function StoreProduct() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-soft p-8 border border-slate-100">
          <Package size={32} className="mx-auto text-brand mb-3" />
          <h1 className="font-display font-bold text-2xl text-navy mb-2">Store a Product</h1>
          <p className="text-sm text-slate-500 mb-6">
            Please{' '}
            <Link to="/login" className="text-brand font-semibold hover:underline">
              login
            </Link>{' '}
            to store a product with us.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!productName.trim()) {
      setError('Product name is required.');
      return;
    }
    if (!startDate || !endDate) {
      setError('Please select both a start date and an end date.');
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setError('End date cannot be before the start date.');
      return;
    }

    setSubmitting(true);
    const res = await api.post(
      '/storage',
      {
        productName: productName.trim(),
        productDetails: productDetails.trim(),
        description: description.trim(),
        startDate,
        endDate,
      },
      { auth: true },
    );
    setSubmitting(false);

    if (!res.item) {
      setError(res.message || 'Could not save your product. Please try again.');
      return;
    }

    setSuccess('Your product has been stored successfully!');
    setProductName('');
    setProductDetails('');
    setDescription('');
    setStartDate('');
    setEndDate('');

    setTimeout(() => navigate('/profile'), 1200);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-navy mb-2 flex items-center gap-2">
          <Package className="text-brand" />
          Store a Product
        </h1>
        <p className="text-sm text-slate-500">
          Tell us what you'd like to store, along with the dates you need.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-6 border border-slate-100">
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-green-50 text-green-600 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Product Name</label>
            <div className="relative">
              <Package size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Sofa Set, Office Boxes..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Start Date</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">End Date</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Product Details</label>
            <div className="relative">
              <FileText size={16} className="absolute left-3.5 top-3 text-slate-400" />
              <textarea
                value={productDetails}
                onChange={(e) => setProductDetails(e.target.value)}
                rows={3}
                placeholder="Size, quantity, fragile items, special handling, etc."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 resize-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Description</label>
            <div className="relative">
              <AlignLeft size={16} className="absolute left-3.5 top-3 text-slate-400" />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Any extra notes about this storage request..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-60">
            <Send size={16} />
            {submitting ? 'Saving...' : 'Store Product'}
          </button>
        </form>
      </div>
    </div>
  );
}
