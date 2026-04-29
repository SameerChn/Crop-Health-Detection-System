import { ShieldAlert, CheckCircle, Download, BarChart2, Tag, Leaf } from 'lucide-react';
import clsx from 'clsx';

// Known plant prefixes in the model
const PLANT_PREFIXES = ['Potato', 'Pepper'];

// Tags without a plant prefix belong to Tomato (general category)
const GENERAL_TAG_MAP = {
  'Early_Blight':    { plant: 'Tomato', disease: 'Early Blight' },
  'Late_Blight':     { plant: 'Tomato', disease: 'Late Blight' },
  'Healthy':         { plant: 'Crop',   disease: 'Healthy' },
  'Rust':            { plant: 'Crop',   disease: 'Rust' },
  'Powdery_Mildew':  { plant: 'Crop',   disease: 'Powdery Mildew' },
};

// Parse "Potato_EarlyBlight" → { plant: "Potato", disease: "Early Blight" }
const parseTagName = (tagName) => {
  if (!tagName) return { plant: 'Unknown', disease: 'Unknown' };

  // Check known general tags first
  if (GENERAL_TAG_MAP[tagName]) return GENERAL_TAG_MAP[tagName];

  // Check known plant prefixes
  for (const prefix of PLANT_PREFIXES) {
    if (tagName.startsWith(prefix + '_')) {
      const raw = tagName.slice(prefix.length + 1);
      // Insert spaces before capitals: "EarlyBlight" → "Early Blight"
      const disease = raw.replace(/([A-Z])/g, ' $1').trim();
      return { plant: prefix, disease };
    }
  }

  // Fallback: show full tag name as disease
  const disease = tagName.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim();
  return { plant: 'Crop', disease };
};

const PredictionBar = ({ tagName, probability }) => {
  const pct = Math.round(probability * 100);
  const { plant, disease } = parseTagName(tagName);
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs font-bold mb-1">
        <span className="text-[#0e4e37]">{plant} <span className="text-[#5a8a72] font-medium">— {disease}</span></span>
        <span className={clsx(pct > 50 ? 'text-[#008f5d]' : 'text-[#5a8a72]')}>{pct}%</span>
      </div>
      <div className="h-2 bg-[#e4f0e9] rounded-full overflow-hidden">
        <div
          className={clsx('h-full rounded-full transition-all duration-700', pct > 50 ? 'bg-[#008f5d]' : 'bg-[#8cae9e]')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

const ResultCard = ({ result }) => {
  const isHealthy = result.status?.toUpperCase() === 'HEALTHY';
  const { plant, disease } = parseTagName(result.diseaseName);

  // allPredictions sorted by probability (top 5)
  const predictions = result.allPredictions
    ? [...result.allPredictions].sort((a, b) => b.probability - a.probability).slice(0, 5)
    : [];

  const handleDownload = () => {
    const predLines = predictions.map(p => `  - ${p.tagName}: ${Math.round(p.probability * 100)}%`).join('\n');
    const text = [
      `Crop Health Analysis Report`,
      `Report ID : #${String(result.id).slice(-6)}`,
      `Date      : ${new Date(result.date).toLocaleString()}`,
      ``,
      `─── Detection Result ───────────────────────────`,
      `Status    : ${result.status}`,
      `Plant     : ${plant}`,
      `Condition : ${disease}`,
      `Confidence: ${result.confidence}%`,
      ``,
      `─── All Predictions ────────────────────────────`,
      predLines,
      ``,
      `─── Recommendation ─────────────────────────────`,
      result.advice || result.recommendation || '',
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CropReport_${String(result.id).slice(-6)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-[#e2ece6] overflow-hidden flex flex-col lg:flex-row h-full">
      {/* Left: Image */}
      <div className="lg:w-1/3 bg-[#0e4e37] relative min-h-[300px]">
        {result.imageUrl ? (
          <img src={result.imageUrl} alt="Crop" className="w-full h-full object-cover opacity-90" />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-30">
            <Leaf className="w-20 h-20 text-white" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e4e37]/90 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <span className={clsx(
            'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg mb-3',
            isHealthy ? 'bg-[#cff3e0] text-[#008f5d]' : 'bg-[#fde8e8] text-[#c81e1e]'
          )}>
            <span className={clsx('w-2 h-2 rounded-full animate-pulse', isHealthy ? 'bg-[#008f5d]' : 'bg-[#c81e1e]')} />
            {result.status}
          </span>
          <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">{plant}</p>
          <h2 className="text-white text-2xl font-bold leading-tight drop-shadow-md">{disease}</h2>
        </div>
      </div>

      {/* Right: Details */}
      <div className="lg:w-2/3 p-8 lg:p-10 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 pb-6 border-b border-[#e2ece6]">
          <div>
            <p className="text-[#5a8a72] text-[10px] font-bold tracking-widest uppercase mb-1">
              Report ID: #{String(result.id).slice(-6)}
            </p>
            <p className="text-[#0e4e37] font-extrabold text-lg">
              {new Date(result.date).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}
            </p>
          </div>
          <button onClick={handleDownload}
            className="flex items-center gap-2 text-[#008f5d] bg-[#e4f0e9] hover:bg-[#cff3e0] px-5 py-2.5 rounded-2xl transition-all font-bold shadow-sm active:scale-95 text-sm"
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 flex-1">
          {/* Left column: All Predictions */}
          <div className="space-y-6">
            {/* Detection badge */}
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-[#e2ece6] bg-[#f4f9f6]">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <Tag className="w-5 h-5 text-[#008f5d]" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#5a8a72] uppercase tracking-wider">Top Detection</p>
                <p className="font-extrabold text-[#0e4e37] text-sm">{result.diseaseName}</p>
              </div>
              <span className="ml-auto text-2xl font-black text-[#0e4e37]">{result.confidence}%</span>
            </div>

            {/* All predictions bars */}
            {predictions.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BarChart2 className="w-4 h-4 text-[#008f5d]" />
                  <h3 className="text-sm font-bold text-[#0e4e37]">All Predictions</h3>
                </div>
                {predictions.map(p => (
                  <PredictionBar key={p.tagId || p.tagName} tagName={p.tagName} probability={p.probability} />
                ))}
              </div>
            )}
          </div>

          {/* Right column: Confidence ring + Advice */}
          <div className="space-y-6">
            {/* Confidence ring */}
            <div>
              <h3 className="text-sm font-bold text-[#0e4e37] mb-3">Detection Confidence</h3>
              <div className="bg-[#f4f9f6] rounded-[2rem] p-6 border border-[#e2ece6] flex items-center gap-6">
                <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="7" fill="transparent" className="text-[#e4f0e9]" />
                    <circle
                      cx="48" cy="48" r="42"
                      stroke="currentColor" strokeWidth="7" fill="transparent"
                      strokeDasharray="263.9"
                      strokeDashoffset={263.9 - (263.9 * result.confidence) / 100}
                      className={clsx('transition-all duration-1000', isHealthy ? 'text-[#008f5d]' : 'text-[#c81e1e]')}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xl font-black text-[#0e4e37]">{result.confidence}%</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#5a8a72] uppercase tracking-widest mb-1">AI Confidence</p>
                  <p className={clsx('font-extrabold text-base', isHealthy ? 'text-[#008f5d]' : 'text-[#c81e1e]')}>
                    {isHealthy ? 'Healthy Crop' : 'Disease Detected'}
                  </p>
                </div>
              </div>
            </div>

            {/* Advice */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className={clsx('w-4 h-4', isHealthy ? 'text-[#008f5d]' : 'text-[#c81e1e]')} />
                <h3 className="text-sm font-bold text-[#0e4e37]">Agronomist Advice</h3>
              </div>
              <div className={clsx('p-5 rounded-2xl border text-sm leading-relaxed font-medium',
                isHealthy ? 'bg-white border-[#e2ece6] text-[#5a8a72]' : 'bg-[#fde8e8] border-[#fbd5d5] text-[#9b1c1c]'
              )}>
                {result.advice || result.recommendation || (isHealthy
                  ? 'Crops are in good health. Maintain current care schedule.'
                  : 'Immediate intervention recommended. Consult an agronomist.'
                )}
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-[#008f5d]" />
                <h3 className="text-sm font-bold text-[#0e4e37]">Analysis Summary</h3>
              </div>
              <div className="p-5 bg-[#f4f9f6] border border-[#e2ece6] rounded-2xl text-sm text-[#5a8a72] leading-relaxed italic">
                "{result.details}"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
