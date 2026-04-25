import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Shield, Sparkles } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#e2ece6] hover:shadow-md transition-shadow"
  >
    <div className="w-14 h-14 bg-[#e4f0e9] rounded-2xl flex items-center justify-center mb-6">
      <Icon className="w-7 h-7 text-[#008f5d]" />
    </div>
    <h3 className="text-xl font-bold text-[#0e4e37] mb-3">{title}</h3>
    <p className="text-[#5a8a72] leading-relaxed">{description}</p>
  </motion.div>
);

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-20 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-4xl mb-20 relative z-10"
      >
        <div className="inline-flex items-center space-x-2 bg-[#e4f0e9] text-[#008f5d] px-5 py-2.5 rounded-full text-sm font-bold mb-8">
          <Sparkles className="w-4 h-4" />
          <span>Next-Generation AI Agriculture</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#0e4e37] mb-8 tracking-tight leading-tight">
          Nature-Inspired Precision <br />
          <span className="text-[#008f5d]">Crop Health Analysis</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[#5a8a72] mb-12 leading-relaxed max-w-2xl mx-auto">
          Upload an image of your crops and our advanced neural engine will instantly detect over 200+ types of pathogens, nutrient deficiencies, and hydration stress points.
        </p>
        
        <Link
          to="/upload"
          className="inline-flex items-center space-x-3 bg-[#008f5d] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#007a4f] hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-[#008f5d]/30"
        >
          <span>Start Analysis Workflow</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
        <FeatureCard
          icon={Sparkles}
          title="Instant Results"
          description="Get disease detection results within milliseconds using our state-of-the-art edge computing algorithms."
          delay={0.2}
        />
        <FeatureCard
          icon={Shield}
          title="Clinical Accuracy"
          description="Enterprise-grade precision trained on millions of multispectral crop images for highly reliable scores."
          delay={0.3}
        />
        <FeatureCard
          icon={Leaf}
          title="Farmer Friendly"
          description="A beautifully simple interface designed specifically for agricultural professionals and greenhouse managers."
          delay={0.4}
        />
      </div>
    </div>
  );
};

export default Home;
