import BaseCard from './BaseCard';

export default function BalanceCard({ balance }) {
  const formattedBalance =
    balance !== undefined ? `$${balance.toLocaleString()}` : '$----';

  return (
    <BaseCard className="row-start-1 col-start-3 relative overflow-hidden">
      <h2 className="text-xl font-semibold text-brandPink mb-2">Balance</h2>

      <p className="text-4xl font-bold text-brandPink mb-1">
        {formattedBalance}
      </p>
    </BaseCard>
  );
}
