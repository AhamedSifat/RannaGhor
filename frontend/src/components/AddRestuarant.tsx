import axios from 'axios';
import { RESTAURANT_API_URL } from '../App';
import { useAuthStore } from '../stores/authStore';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { FcShop, FcCamera, FcGlobe, FcPhoneAndroid } from 'react-icons/fc';

export default function AddRestuarant() {
  const { location } = useAuthStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
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

    try {
      setSubmitting(true);
      await axios.post(`${RESTAURANT_API_URL}/api/restaurant/new`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      toast.success('Restaurant added successfully!');
      window.location.reload();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to add restaurant');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Background */}
      <div className="h-32 bg-gradient-to-r from-[#E23774] to-rose-500" />
      
      <div className="max-w-2xl mx-auto px-4 -mt-16">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#E23774] to-rose-400 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <FcShop size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Add Your Restaurant</h1>
            <p className="text-gray-500 text-sm mt-1">Start selling on RannaGhor</p>
          </div>

          {/* Image Upload - Full Preview */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Restaurant Image *</label>
            
            {!imagePreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative w-full aspect-video rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-[#E23774] hover:bg-rose-50 cursor-pointer overflow-hidden transition-all duration-200 flex flex-col items-center justify-center"
              >
                <FcCamera size={48} className="mb-3 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">Click to upload restaurant image</span>
                <span className="text-xs text-gray-400 mt-1">Recommended: 1200 x 800px</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg group">
                <img 
                  src={imagePreview} 
                  alt="Restaurant preview" 
                  className="w-full h-full object-cover"
                />
                {/* Overlay with cancel button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <button
                    onClick={handleCancelImage}
                    className="bg-white text-red-500 px-4 py-2 rounded-full font-semibold text-sm hover:bg-red-50 transition-colors flex items-center gap-2 shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Remove Image
                  </button>
                </div>
                {/* Always visible cancel button for mobile */}
                <button
                  onClick={handleCancelImage}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-full shadow-lg hover:bg-white transition-colors md:hidden"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Restaurant Name *</label>
              <div className="relative">
                <FcShop className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter restaurant name"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E23774] focus:ring-2 focus:ring-rose-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell customers about your restaurant"
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E23774] focus:ring-2 focus:ring-rose-100 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <FcPhoneAndroid className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#E23774] focus:ring-2 focus:ring-rose-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <div className="relative">
                <FcGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={location?.formattedAddress || 'Detecting location...'}
                  disabled
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-600"
                />
              </div>
              {!location && (
                <p className="text-xs text-red-500 mt-1">Please enable location access</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={submitting || !location}
            className="w-full mt-8 py-4 bg-gradient-to-r from-[#E23774] to-rose-500 text-white font-semibold rounded-xl shadow-lg shadow-rose-200 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              'Create Restaurant'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}