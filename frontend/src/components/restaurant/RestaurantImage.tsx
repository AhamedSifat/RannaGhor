interface Props {
  image?: string;
  name: string;
}

export default function RestaurantImage({ image, name }: Props) {
  return (
    <div className='w-full md:w-64 flex-shrink-0'>
      <div className='aspect-square rounded-2xl overflow-hidden shadow-lg bg-gray-100'>
        <img
          src={image || 'https://via.placeholder.com/400'}
          alt={name}
          className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'
        />
      </div>
    </div>
  );
}
