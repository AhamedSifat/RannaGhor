import { useParams, useNavigate } from 'react-router-dom';

import AddRestaurantHeader from '../components/addRestaurant/AddRestaurantHeader';
import ImageUpload from '../components/addRestaurant/ImageUpload';
import RestaurantForm from '../components/addRestaurant/RestaurantForm';
import toast from 'react-hot-toast';
import { useState, useRef } from 'react';
import { FcShop } from 'react-icons/fc';
import { useUpdateRestaurant } from '../hooks/useUpdateRestaurant';
import { useRestaurantStore } from '../stores/restuarantStore';

export default function EditRestaurantPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { restaurant } = useRestaurantStore();

  console.log('Restaurant from store:', restaurant);

  const { mutate, isPending } = useUpdateRestaurant();

  const [name, setName] = useState(restaurant?.name || '');
  const [description, setDescription] = useState(restaurant?.description || '');
  const [phone, setPhone] = useState(restaurant?.phone.toString() || '');
  const [imagePreview] = useState<string | null>(restaurant?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!name.trim() || !description || !phone) {
      toast.error('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('phone', phone.toString());

    mutate(
      { id: id!, formData },
      {
        onSuccess: () => {
          toast.success('Restaurant updated successfully');
          navigate('/restaurant');
        },
      },
    );
  };

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      <AddRestaurantHeader />

      <div className='max-w-2xl mx-auto px-4 -mt-16'>
        <div className='bg-white rounded-3xl shadow-lg p-6 md:p-8'>
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-gradient-to-tr from-[#E23774] to-rose-400 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4'>
              <FcShop size={32} />
            </div>
            <h1 className='text-2xl font-bold text-gray-900'>
              Edit Restaurant
            </h1>
            <p className='text-gray-500 text-sm mt-1'>
              Update your restaurant details
            </p>
          </div>

          <ImageUpload
            imagePreview={imagePreview}
            fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
            disabled={true}
          />

          <RestaurantForm
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            phone={phone}
            setPhone={setPhone}
            location={restaurant?.autoLocation || null}
          />

          <div className='flex gap-3 mt-8'>
            <button
              onClick={() => navigate('/restaurant')}
              className='flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors'
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className='flex-[2] py-3 bg-gradient-to-r from-[#E23774] to-rose-500 text-white font-semibold rounded-xl shadow-lg shadow-rose-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all'
            >
              {isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
