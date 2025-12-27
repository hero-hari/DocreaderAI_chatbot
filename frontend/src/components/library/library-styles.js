// components/library/library-styles.js
// Shared styles and constants for Library components

export const categoryColors = {
  'Government': 'bg-blue-500',
  'Economic': 'bg-green-500',
  'Social': 'bg-purple-500',
  'Technology': 'bg-cyan-500',
  'Infrastructure': 'bg-orange-500',
  'Environment': 'bg-teal-500',
  'Rural': 'bg-yellow-500',
  'Cultural': 'bg-pink-500',
  'Media': 'bg-red-500',
  'Entertainment': 'bg-indigo-500'
};

// Common button styles
export const buttonStyles = {
  primary: `bg-gradient-to-r from-[#5ac8fa] to-[#007aff] 
            hover:from-[#007aff] hover:to-[#005bbb]
            text-white py-2 rounded-lg transition-colors 
            flex items-center justify-center gap-2 shadow-md`,
  
  upgrade: `bg-gradient-to-r from-yellow-400 to-orange-500 
            hover:from-yellow-500 hover:to-orange-600
            text-white py-2 rounded-lg transition-colors 
            flex items-center justify-center gap-2 shadow-md`,
  
  viewDetails: `bg-gradient-to-r from-purple-500 to-blue-500 
                hover:from-purple-600 hover:to-blue-600
                text-white px-6 py-3 rounded-lg transition-all 
                flex items-center gap-2 shadow-lg whitespace-nowrap`
};

// Card container styles
export const cardStyles = {
  domain: `rounded-xl p-4 transition-all hover:shadow-xl 
           bg-white/70 border border-white/60 
           hover:border-[#007aff] backdrop-blur-xl flex flex-col`,
  
  ragInfo: `rounded-xl p-6 transition-all hover:shadow-xl cursor-pointer
            bg-gradient-to-br from-purple-100/70 to-blue-100/70 
            border-2 border-purple-300/60 
            hover:border-[#007aff] backdrop-blur-xl`,
  
  listItem: `rounded-xl p-4 border border-white/60 bg-white/70 backdrop-blur-xl
             hover:border-[#007aff] transition-all flex flex-col gap-3`
};

export const ITEMS_PER_PAGE = 20;
