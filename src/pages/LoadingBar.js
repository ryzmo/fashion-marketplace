export default function LoadingBar() {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center space-y-6">
        {/* Logo */}
        <img
          src="/logo.jpg" // Ganti path sesuai logo kamu
          alt="Logo"
          className="w-20 h-20 object-contain"
        />
  
        {/* Text */}
        <p className="text-gray-600 text-sm font-medium animate-pulse">
          Sedang memuat data...
        </p>
  
        {/* Animated Progress Bar */}
        <div className="relative w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="absolute inset-0">
            <div className="h-full w-1/3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-slide" />
          </div>
        </div>
      </div>
    );
  }
  