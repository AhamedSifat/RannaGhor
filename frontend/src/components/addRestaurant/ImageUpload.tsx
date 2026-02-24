import { FcCamera } from 'react-icons/fc';

interface Props {
  imagePreview: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancelImage: () => void;
}

export default function ImageUpload({
  imagePreview,
  fileInputRef,
  onImageChange,
  onCancelImage,
}: Props) {
  return (
    <div className='mb-6'>
      <label className='block text-sm font-semibold text-gray-700 mb-2'>
        Restaurant Image *
      </label>

      {!imagePreview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className='relative w-full aspect-video rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-[#E23774] hover:bg-rose-50 cursor-pointer overflow-hidden transition-all duration-200 flex flex-col items-center justify-center'
        >
          <FcCamera size={48} className='mb-3 text-gray-400' />
          <span className='text-sm font-medium text-gray-500'>
            Click to upload restaurant image
          </span>
          <span className='text-xs text-gray-400 mt-1'>
            Recommended: 1200 x 800px
          </span>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={onImageChange}
            className='hidden'
          />
        </div>
      ) : (
        <div className='relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg group'>
          <img
            src={imagePreview}
            alt='Restaurant preview'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center'>
            <button
              onClick={onCancelImage}
              className='bg-white text-red-500 px-4 py-2 rounded-full font-semibold text-sm hover:bg-red-50 transition-colors flex items-center gap-2 shadow-lg'
            >
              <svg
                className='w-4 h-4'
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
              Remove Image
            </button>
          </div>
          <button
            onClick={onCancelImage}
            className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-full shadow-lg hover:bg-white transition-colors md:hidden'
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
  );
}
