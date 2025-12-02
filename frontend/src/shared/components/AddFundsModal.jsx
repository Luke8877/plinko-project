/**
 * AddFundsModal
 * ------------------------------------------
 * Simple popup allowing users to deposit funds.
 * - Accepts numeric input
 * - Calls onSubmit(amount) when confirmed
 * - Closes on cancel or overlay click
 */

import { useState } from 'react';

export default function AddFundsModal({ visible, onClose, onSubmit }) {
  const [amount, setAmount] = useState('');

  if (!visible) return null;

  const handleAddClick = () => {
    const val = Number(amount);
    if (!val || val <= 0) return;
    onSubmit(val);
    setAmount('');
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-surfaceDark p-6 rounded-xl border border-brandPink/40 w-80 shadow-xl">
        <h3 className="text-xl font-bold text-brandPink mb-4 text-center">
          Add Funds
        </h3>

        <input
          type="number"
          className="w-full bg-slate-900 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 mb-4 outline-none"
          placeholder="Enter amount..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex justify-between">
          <button
            className="px-4 py-2 rounded-md bg-brandPink/80 hover:bg-brandPink text-white font-semibold"
            onClick={handleAddClick}
          >
            Add
          </button>

          <button
            className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
