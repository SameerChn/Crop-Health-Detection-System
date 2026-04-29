import { HelpCircle, UploadCloud, History, BarChart2, ShieldCheck, Mail, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const faqs = [
  {
    q: 'What types of images does the system accept?',
    a: 'The system accepts JPG, JPEG, PNG, and WEBP images. For best results, use clear, well-lit close-up photos of crop leaves taken in natural daylight. Avoid blurry, dark, or heavily shadowed images.',
  },
  {
    q: 'Which crops and diseases can be detected?',
    a: 'The current model is trained to detect diseases across Tomato (Early Blight, Late Blight), Potato (Early Blight, Late Blight), and Pepper (Bacterial Spot). It also classifies Rust and Powdery Mildew as general crop conditions.',
  },
  {
    q: 'How accurate is the detection?',
    a: 'Accuracy depends on image quality and the specific disease. The model returns a confidence score (0–100%) for each prediction. A score above 70% is considered reliable. Always consult an agronomist for critical decisions.',
  },
  {
    q: 'Are my uploaded images stored?',
    a: 'Yes. Uploaded images are securely stored in Azure Blob Storage using private access with time-limited SAS URLs. Prediction results are stored in Azure Cosmos DB for MongoDB. Your data is not shared with third parties.',
  },
  {
    q: 'Why does the History tab show "No Image" for some records?',
    a: 'Records created before Azure Blob Storage integration was enabled do not have stored images. Only uploads made after the integration was set up will show images in the History tab.',
  },
  {
    q: 'Can I download my analysis report?',
    a: 'Yes. On the Analysis Result page, click "Download Report" to save a text summary of the detection result, confidence score, and agronomist advice to your device.',
  },
];

const Section = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-[2rem] border border-[#e2ece6] p-8 shadow-sm">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 bg-[#e4f0e9] rounded-xl">
        <Icon className="w-5 h-5 text-[#008f5d]" />
      </div>
      <h2 className="text-lg font-bold text-[#0e4e37]">{title}</h2>
    </div>
    {children}
  </div>
);

const Step = ({ number, title, description }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#008f5d] text-white flex items-center justify-center text-sm font-black">
      {number}
    </div>
    <div className="pt-0.5">
      <p className="font-bold text-[#0e4e37] text-sm mb-1">{title}</p>
      <p className="text-sm text-[#5a8a72] leading-relaxed">{description}</p>
    </div>
  </div>
);

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#e2ece6] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#f4f9f6] transition-colors"
      >
        <span className="font-bold text-[#0e4e37] text-sm pr-4">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-[#5a8a72] flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#5a8a72] flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-4 text-sm text-[#5a8a72] leading-relaxed border-t border-[#e2ece6] pt-4 bg-[#f4f9f6]">
          {a}
        </div>
      )}
    </div>
  );
};

const Help = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-4xl font-extrabold text-[#0e4e37] mb-2">Help & Documentation</h1>
        <p className="text-[#5a8a72] text-lg">Everything you need to get the most out of AgroLens.</p>
      </div>

      {/* How to use */}
      <Section icon={UploadCloud} title="How to Analyze a Crop">
        <div className="space-y-5">
          <Step number="1" title="Go to Analyze" description='Click "ANALYZE" in the sidebar or "New Analysis" button to open the upload page.' />
          <Step number="2" title="Upload your image" description="Drag and drop a crop leaf image into the upload area, or click to browse your files. Supported formats: JPG, PNG, WEBP." />
          <Step number="3" title="Click Analyze Crop" description='Press the green "ANALYZE CROP" button. The image is sent to the Azure Custom Vision model for classification.' />
          <Step number="4" title="Review your result" description="The result page shows the detected disease, confidence score, all prediction probabilities, and agronomist advice." />
          <Step number="5" title="Download or view history" description='Click "Download Report" to save results, or visit the History tab to review all past analyses.' />
        </div>
      </Section>

      {/* Supported detections */}
      <Section icon={BarChart2} title="Supported Detections">
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { plant: 'Tomato', conditions: ['Early Blight', 'Late Blight', 'Healthy'] },
            { plant: 'Potato', conditions: ['Early Blight', 'Late Blight', 'Healthy'] },
            { plant: 'Pepper', conditions: ['Bacterial Spot', 'Healthy'] },
            { plant: 'General', conditions: ['Rust', 'Powdery Mildew'] },
          ].map(({ plant, conditions }) => (
            <div key={plant} className="p-4 bg-[#f4f9f6] rounded-2xl border border-[#e2ece6]">
              <p className="font-bold text-[#0e4e37] text-sm mb-2">{plant}</p>
              <ul className="space-y-1">
                {conditions.map(c => (
                  <li key={c} className="text-xs text-[#5a8a72] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008f5d] flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* History */}
      <Section icon={History} title="Using the History Tab">
        <p className="text-sm text-[#5a8a72] leading-relaxed mb-4">
          The History tab loads all your past analyses directly from the database. You can:
        </p>
        <ul className="space-y-2">
          {[
            'View the image, disease name, date, and confidence for each past scan',
            'Click the eye icon to re-open the full result page for any past scan',
            'Click the download icon to save a text report for any history entry',
            'Records without images were created before Blob Storage was enabled',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[#5a8a72]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008f5d] mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Privacy */}
      <Section icon={ShieldCheck} title="Data & Privacy">
        <p className="text-sm text-[#5a8a72] leading-relaxed">
          Images are uploaded to <strong className="text-[#0e4e37]">Azure Blob Storage</strong> (private access, SAS URLs valid for 1 year).
          Predictions are stored in <strong className="text-[#0e4e37]">Azure Cosmos DB for MongoDB</strong>.
          No data is shared with third parties. API keys are never exposed to the browser —
          all Azure calls are made server-side via the backend.
        </p>
      </Section>

      {/* FAQ */}
      <Section icon={HelpCircle} title="Frequently Asked Questions">
        <div className="space-y-3">
          {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}
        </div>
      </Section>

      {/* Contact */}
      <Section icon={Mail} title="Contact & Support">
        <p className="text-sm text-[#5a8a72] mb-4">
          This is a student project built as part of a semester capstone. For issues or feedback, reach out via the project repository.
        </p>
        <a
          href="https://github.com/SameerChn/Crop-Health-Detection-System"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#0e4e37] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#008f5d] transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View on GitHub
        </a>
      </Section>
    </div>
  );
};

export default Help;
