import { useState, useRef } from 'react';

import toast from 'react-hot-toast';
import { FcCamera, FcShop } from 'react-icons/fc';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMenuItem } from '../../services/menuApi';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  restaurantId: string;
}

export default function AddMenuModal({ isOpen, onClose, restaurantId }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { mutate: createMenuItemMutation, isPending } = useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items', restaurantId] });
      onClose();
      toast.success('Menu item added!');
    },
  });

  if (!isOpen) return null;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !description || !image) {
      toast.error('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('file', image);

    try {
      createMenuItemMutation(formData);
      // Reset form
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
      setImagePreview(null);
    } catch {
      toast.error('Failed to add item');
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-gradient-to-tr from-[#E23774] to-rose-400 rounded-xl flex items-center justify-center'>
              <FcShop size={24} />
            </div>
            <div>
              <h2 className='text-xl font-bold text-gray-900'>Add Menu Item</h2>
              <p className='text-sm text-gray-500'>Create a new dish</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <svg
              className='w-6 h-6 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='p-6 space-y-5'>
          {/* Image Upload */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Item Image *
            </label>
            {!imagePreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className='w-full aspect-video rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-[#E23774] hover:bg-rose-50 cursor-pointer overflow-hidden transition-all flex flex-col items-center justify-center'
              >
                <FcCamera size={40} className='mb-2' />
                <span className='text-sm text-gray-500'>
                  Click to upload image
                </span>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='hidden'
                />
              </div>
            ) : (
              <div className='relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg group'>
                <img
                  src={imagePreview}
                  alt='Preview'
                  className='w-full h-full object-cover'
                />
                <button
                  type='button'
                  onClick={handleCancelImage}
                  className='absolute top-2 right-2 bg-white/90 text-red-500 p-2 rounded-full shadow-lg hover:bg-white transition-colors'
                >
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Name */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Item Name *
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='e.g., Chicken Biryani'
              className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E23774] focus:ring-2 focus:ring-rose-100 transition-all'
            />
          </div>

          {/* Price */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Price (₹) *
            </label>
            <input
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='e.g., 250'
              min='0'
              className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E23774] focus:ring-2 focus:ring-rose-100 transition-all'
            />
          </div>

          {/* Description */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Describe the dish...'
              rows={3}
              className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E23774] focus:ring-2 focus:ring-rose-100 transition-all resize-none'
            />
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={isPending}
            className='w-full py-4 bg-gradient-to-r from-[#E23774] to-rose-500 text-white font-semibold rounded-xl shadow-lg shadow-rose-200 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2'
          >
            {isPending ? (
              <>
                <svg
                  className='animate-spin h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Adding...
              </>
            ) : (
              'Add to Menu'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
