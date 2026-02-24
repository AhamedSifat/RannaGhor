export default function RestaurantStats() {
  const stats = [
    { value: '128', label: 'Orders' },
    { value: '₹45K', label: 'Revenue' },
    { value: '4.8', label: 'Rating' },
  ];

  return (
    <div className='flex gap-6 mt-6 pt-6 border-t border-gray-100'>
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className='text-2xl font-bold text-[#E23774]'>{stat.value}</p>
          <p className='text-xs text-gray-500'>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
