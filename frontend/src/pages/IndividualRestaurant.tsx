import { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Star,
  Plus,
  Minus,
  ShoppingBag,
  ChevronLeft,
  Info,
  Search,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router'; // Added useNavigate
import { useQuery } from '@tanstack/react-query';
import { fetchRestaurantById } from '../services/restaurant.api';
import { fetchMenuItems } from '../services/menuApi';
import type { IMenuItem } from '../type';

interface CartState {
  [key: string]: IMenuItem & { quantity: number };
}

export default function IndividualRestaurant() {
  const [cart, setCart] = useState<CartState>({});
  const [scrollY, setScrollY] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const {
    data: restaurant,
    isLoading: isRestaurantLoading,
    error: restaurantError,
  } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => fetchRestaurantById(id as string),
    enabled: !!id,
  });

  const { data: menuItems, isLoading: isMenuLoading } = useQuery({
    queryKey: ['menuItems', id],
    queryFn: () => fetchMenuItems(id as string),
    enabled: !!id,
  });

  //Cart Logic
  const addToCart = (item: IMenuItem) => {
    const itemId = item._id;

    setCart((prev) => ({
      ...prev,
      [itemId]: {
        ...item,
        quantity: (prev[itemId]?.quantity || 0) + 1,
      },
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId].quantity > 1) {
        newCart[itemId] = {
          ...newCart[itemId],
          quantity: newCart[itemId].quantity - 1,
        };
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const cartTotal = Object.values(cart).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const cartCount = Object.values(cart).reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  // --- Loading/Error States ---
  if (isRestaurantLoading || isMenuLoading)
    return <div className='p-10 flex justify-center'>Loading...</div>;

  if (restaurantError || !restaurant)
    return <div className='p-10 text-red-500'>Error loading restaurant.</div>;

  return (
    <div className='min-h-screen bg-gray-50 font-sans text-slate-900 pb-32'>
      {/* --- HERO SECTION --- */}
      <div className='relative h-[40vh] w-full overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out'
          style={{
            backgroundImage: `url(${restaurant.restaurant.image})`,
            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
          }}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20' />

        <div className='absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20'>
          <button
            onClick={() => navigate(-1)}
            className='p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition'
          >
            <ChevronLeft size={24} />
          </button>
          <div className='flex gap-3'>
            <button className='p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition'>
              <Search size={20} />
            </button>
            <button className='p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition'>
              <Info size={20} />
            </button>
          </div>
        </div>

        <div className='absolute bottom-0 left-0 right-0 p-6 text-white z-10 bg-gradient-to-t from-black/90 to-transparent pt-20'>
          <div className='flex justify-between items-end'>
            <div>
              <h1 className='text-4xl font-black tracking-tight mb-1'>
                {restaurant.restaurant.name}
              </h1>
              <p className='text-gray-200 text-sm font-medium line-clamp-1 opacity-90'>
                {restaurant.restaurant.autoLocation?.formattedAddress}
              </p>
            </div>
            <div className='bg-white text-black px-3 py-1 rounded-xl flex items-center gap-1 font-bold shadow-lg'>
              <Star size={16} className='fill-yellow-400 text-yellow-400' />
              {restaurant.restaurant.rating}
            </div>
          </div>
        </div>
      </div>

      {/* --- DETAILS BAR --- */}
      <div className='bg-white px-6 py-4 shadow-sm border-b border-gray-100 flex justify-between items-center sticky top-0 z-30'>
        <div className='flex items-center gap-4 text-sm text-gray-600'>
          <div className='flex items-center gap-1'>
            <Clock size={16} className='text-orange-500' />
            <span className='font-semibold'>
              {restaurant.restaurant.deliveryTime} mins
            </span>
          </div>
          <div className='flex items-center gap-1'>
            <MapPin size={16} className='text-blue-500' />
            <span>
              {restaurant.restaurant.deliveryFee > 0
                ? `$${restaurant.restaurant.deliveryFee} Delivery`
                : 'Free Delivery'}
            </span>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <div
            className={`w-2 h-2 rounded-full ${restaurant.restaurant.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}
          />
          <span className='text-xs font-bold uppercase tracking-wider text-gray-500'>
            {restaurant.restaurant.isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>
      </div>

      {/* --- MENU LIST --- */}
      <div className='p-4 max-w-3xl mx-auto'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          Menu{' '}
          <span className='text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full'>
            {menuItems?.menuItems?.length || 0}
          </span>
        </h2>

        <div className='space-y-4'>
          {menuItems?.menuItems?.map((item: IMenuItem) => {
            const itemId = item._id;
            const cartItem = cart[itemId];
            const isInCart = !!cartItem;

            return (
              <div
                key={itemId}
                className='bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center transition hover:shadow-md'
              >
                <div className='relative w-24 h-24 flex-shrink-0'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-full h-full object-cover rounded-xl bg-gray-100'
                  />
                  {!item.isAvailable && (
                    <div className='absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center text-white text-xs font-bold'>
                      SOLD OUT
                    </div>
                  )}
                </div>

                <div className='flex-1 min-w-0'>
                  <h3 className='font-bold text-lg truncate'>{item.name}</h3>
                  <p className='text-gray-500 text-xs line-clamp-2 mb-2 leading-relaxed'>
                    {item.description}
                  </p>
                  <div className='flex justify-between items-center'>
                    <span className='font-bold text-lg text-slate-800'>
                      ${item.price}
                    </span>

                    {isInCart ? (
                      <div className='flex items-center gap-3 bg-slate-900 rounded-xl p-1 pl-3'>
                        <span className='font-bold text-white w-4 text-center'>
                          {cartItem.quantity}
                        </span>
                        <div className='flex gap-1'>
                          <button
                            onClick={() => removeFromCart(itemId)}
                            className='w-8 h-8 flex items-center justify-center bg-slate-700 rounded-lg text-white hover:bg-slate-600'
                          >
                            <Minus size={14} />
                          </button>
                          <button
                            onClick={() => addToCart(item)}
                            className='w-8 h-8 flex items-center justify-center bg-orange-500 rounded-lg text-white hover:bg-orange-600'
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        disabled={!item.isAvailable}
                        className={`flex items-center gap-1 px-4 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95
                          ${
                            item.isAvailable
                              ? 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                      >
                        <Plus size={16} /> Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- STICKY CART BAR --- */}
      {cartCount > 0 && (
        <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]'>
          <div className='max-w-3xl mx-auto flex justify-between items-center gap-4'>
            {/* Cart Info */}

            <div className='flex items-center gap-3'>
              <div className='bg-orange-100 p-2.5 rounded-full text-orange-600'>
                <ShoppingBag size={20} />
              </div>

              <div>
                <p className='text-xs text-gray-500 font-medium'>
                  {cartCount} items added
                </p>

                <p className='font-bold text-lg leading-none'>
                  ${cartTotal.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Checkout Button */}

            <button className='bg-slate-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all'>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
