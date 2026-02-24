import { useState, useRef } from 'react';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';
import AddRestaurantHeader from './addRestaurant/AddRestaurantHeader';
import ImageUpload from './addRestaurant/ImageUpload';
import RestaurantForm from './addRestaurant/RestaurantForm';
import SubmitButton from './addRestaurant/SubmitButton';
import { FcShop } from 'react-icons/fc';
import { useCreateRestaurant } from '../hooks/useCreateRestaurant';

export default function AddRestuarant() {
  const { location } = useAuthStore();
  const { mutate, isPending } = useCreateRestaurant();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCancelImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!name || !location || !image) {
      toast.error('Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('phone', phone);
    formData.append('latitude', location.latitude.toString());
    formData.append('longitude', location.longitude.toString());
    formData.append('formattedAddress', location.formattedAddress);
    formData.append('file', image);

    mutate(formData);
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
              Add Your Restaurant
            </h1>
            <p className='text-gray-500 text-sm mt-1'>
              Start selling on RannaGhor
            </p>
          </div>

          <ImageUpload
            imagePreview={imagePreview}
            fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
            onImageChange={handleImageChange}
            onCancelImage={handleCancelImage}
          />

          <RestaurantForm
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            phone={phone}
            setPhone={setPhone}
            location={location}
          />

          <SubmitButton
            onSubmit={handleSubmit}
            submitting={isPending}
            disabled={isPending || !location}
          />
        </div>
      </div>
    </div>
  );
}
