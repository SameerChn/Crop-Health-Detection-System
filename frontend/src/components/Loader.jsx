import { motion } from 'framer-motion';

const Loader = ({ message = "Analyzing crop health..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 relative">
      <div className="relative w-32 h-32 mb-8">
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-0 rounded-full border-4 border-[#e4f0e9] border-t-[#008f5d] shadow-[0_0_15px_rgba(0,143,93,0.3)]"
        />
        
        {/* Inner pulsing ring */}
        <motion.div
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute inset-4 rounded-full bg-[#008f5d] opacity-20 blur-md"
        />

        {/* Center element */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-[#e4f0e9] z-10"
          >
            <div className="w-8 h-8 bg-[#008f5d] rounded-full animate-pulse"></div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-center"
      >
        <h3 className="text-xl font-bold text-[#0e4e37] tracking-tight">{message}</h3>
        <p className="text-[#008f5d] font-bold mt-2 text-xs uppercase tracking-widest">Processing Data Modules</p>
      </motion.div>
    </div>
  );
};

export default Loader;
