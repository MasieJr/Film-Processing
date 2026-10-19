// import React, { useState, useMemo } from 'react';
// import {
//   CheckCircle2,
//   ArrowRight,
//   ArrowLeft,
//   Minus,
//   Plus,
//   HelpCircle,
//   Mail,
//   Info,
//   Camera,
//   Film,
//   Layers,
//   Sparkles,
//   Check,
//   Printer,
//   Clock,
//   MapPin,
//   Download,
//   ShieldCheck,
//   RefreshCw,
//   Image as ImageIcon
// } from 'lucide-react';

// // Film Canister Vector Renderers to ensure sharp, reliable assets without broken external URLs
// const KodakCanister = ({ className = "w-16 h-20" }) => (
//   <div className={`relative flex flex-col items-center select-none ${className}`}>
//     {/* Spool top */}
//     <div className="w-4 h-2 bg-neutral-800 rounded-t-sm shadow-inner" />
//     <div className="w-12 h-2.5 bg-neutral-700 rounded-t-md" />
//     {/* Body */}
//     <div className="w-14 h-20 rounded-sm bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 shadow-md flex flex-col justify-between p-1.5 border border-amber-600/40 relative overflow-hidden">
//       <div className="w-full flex justify-between items-center text-[9px] font-black tracking-tighter text-black uppercase">
//         <span>Kodak</span>
//         <span className="bg-black text-amber-300 px-1 rounded text-[8px]">36 EXP</span>
//       </div>
//       <div className="flex flex-col items-center justify-center my-auto">
//         <span className="text-xl font-extrabold tracking-tighter text-black leading-none">400</span>
//         <span className="text-[9px] font-bold text-red-600 tracking-wider">ULTRAMAX</span>
//       </div>
//       <div className="w-full h-2 bg-neutral-900 rounded-xs flex items-center justify-center">
//         <div className="w-8 h-0.5 bg-neutral-600" />
//       </div>
//       {/* Film lip out */}
//       <div className="absolute right-0 top-6 w-3 h-8 bg-neutral-900 rounded-r-xs opacity-90 border-l border-neutral-700" />
//     </div>
//     {/* Spool bottom */}
//     <div className="w-12 h-2.5 bg-neutral-700 rounded-b-md" />
//   </div>
// );

// const FujiCanister = ({ className = "w-16 h-20" }) => (
//   <div className={`relative flex flex-col items-center select-none ${className}`}>
//     <div className="w-4 h-2 bg-neutral-800 rounded-t-sm shadow-inner" />
//     <div className="w-12 h-2.5 bg-neutral-700 rounded-t-md" />
//     <div className="w-14 h-20 rounded-sm bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 shadow-md flex flex-col justify-between p-1.5 border border-emerald-800 relative overflow-hidden text-white">
//       <div className="w-full flex justify-between items-center text-[9px] font-black tracking-tighter uppercase">
//         <span className="text-white drop-shadow-sm">FUJIFILM</span>
//         <span className="text-emerald-200 text-[8px] font-bold">C-41</span>
//       </div>
//       <div className="flex flex-col items-center justify-center my-auto">
//         <span className="text-xl font-extrabold tracking-tight leading-none text-white">200</span>
//         <span className="text-[8px] font-semibold text-emerald-100 uppercase">Fujicolor</span>
//       </div>
//       <div className="w-full h-2 bg-neutral-900 rounded-xs flex items-center justify-center">
//         <div className="w-8 h-0.5 bg-neutral-600" />
//       </div>
//       <div className="absolute right-0 top-6 w-3 h-8 bg-neutral-900 rounded-r-xs opacity-90 border-l border-neutral-700" />
//     </div>
//     <div className="w-12 h-2.5 bg-neutral-700 rounded-b-md" />
//   </div>
// );

// const IlfordCanister = ({ className = "w-16 h-20" }) => (
//   <div className={`relative flex flex-col items-center select-none ${className}`}>
//     <div className="w-4 h-2 bg-neutral-800 rounded-t-sm shadow-inner" />
//     <div className="w-12 h-2.5 bg-neutral-700 rounded-t-md" />
//     <div className="w-14 h-20 rounded-sm bg-gradient-to-r from-neutral-800 via-neutral-900 to-black shadow-md flex flex-col justify-between p-1.5 border border-neutral-600 relative overflow-hidden text-white">
//       <div className="w-full flex justify-between items-center text-[9px] font-bold tracking-widest uppercase">
//         <span className="text-neutral-100">ILFORD</span>
//         <span className="bg-white text-black px-1 rounded text-[7px] font-black">B&W</span>
//       </div>
//       <div className="flex flex-col items-center justify-center my-auto">
//         <span className="text-xl font-black tracking-tighter text-white leading-none">HP5</span>
//         <span className="text-[9px] font-extrabold text-neutral-300">PLUS 400</span>
//       </div>
//       <div className="w-full h-2 bg-neutral-800 rounded-xs flex items-center justify-center">
//         <div className="w-8 h-0.5 bg-neutral-500" />
//       </div>
//       <div className="absolute right-0 top-6 w-3 h-8 bg-neutral-900 rounded-r-xs opacity-90 border-l border-neutral-700" />
//     </div>
//     <div className="w-12 h-2.5 bg-neutral-700 rounded-b-md" />
//   </div>
// );

// const MediumFormat120 = () => (
//   <div className="w-14 h-20 bg-neutral-100 rounded border border-neutral-300 shadow-sm flex flex-col items-center justify-between py-1 relative">
//     <div className="w-12 h-1.5 bg-neutral-800 rounded-full" />
//     <div className="flex flex-col items-center">
//       <span className="text-base font-extrabold text-neutral-800">120</span>
//       <span className="text-[8px] text-neutral-500 uppercase tracking-widest font-semibold">Spool</span>
//     </div>
//     <div className="w-full px-1">
//       <div className="w-full h-1 bg-red-500 rounded-full" />
//     </div>
//     <div className="w-12 h-1.5 bg-neutral-800 rounded-full" />
//   </div>
// );

// const DisposableCameraIcon = () => (
//   <div className="w-20 h-14 bg-gradient-to-tr from-yellow-400 via-emerald-500 to-pink-500 rounded-md border border-neutral-400 p-1 flex flex-col justify-between shadow-sm relative">
//     <div className="flex justify-between items-center">
//       <div className="w-3 h-3 bg-neutral-800 rounded-full border border-neutral-400 flex items-center justify-center">
//         <div className="w-1 h-1 bg-white rounded-full" />
//       </div>
//       <div className="w-4 h-2 bg-neutral-800 rounded-sm" />
//     </div>
//     <div className="w-6 h-6 rounded-full bg-neutral-900 border-2 border-neutral-200 self-center flex items-center justify-center">
//       <div className="w-2.5 h-2.5 rounded-full bg-blue-900/60" />
//     </div>
//     <div className="text-[7px] text-white font-extrabold tracking-tighter truncate">SINGLE USE 27</div>
//   </div>
// );

// export default function App() {
//   // Navigation State: 'landing' | 1 | 2 | 3 | 4 | 5 | 6 | 'confirmed'
//   const [currentStep, setCurrentStep] = useState('landing');

//   // Form State
//   const [formData, setFormData] = useState({
//     // Step 1
//     fullName: '',
//     email: '',
//     phone: '',
//     referral: '',
//     newsletter: false,

//     // Step 2
//     filmType: '35mm', // '35mm' | '120' | 'disposable' | 'other'

//     // Step 3
//     rollsCount: 1,
//     isHalfFrame: false,
//     processingType: 'c41', // 'c41' | 'bw' | 'e6'

//     // Step 4
//     scanningTier: 'high', // 'standard' | 'high' | 'premium'

//     // Step 5
//     printOption: 'none', // 'none' | '4x6' | '5x7' | 'contact'
//   });

//   // Errors for basic validation
//   const [errors, setErrors] = useState({});

//   // Pricing configuration (in GBP)
//   const pricingConfig = {
//     baseDev: {
//       c41: 5.50,
//       bw: 7.00,
//       e6: 9.50
//     },
//     scanning: {
//       standard: 5.00,
//       high: 8.00,
//       premium: 12.00
//     },
//     prints: {
//       none: 0,
//       '4x6': 5.00, // bundled per roll (approx £0.25/frame)
//       '5x7': 9.00, // per roll
//       'contact': 1.50 // per roll
//     },
//     halfFrameFeePerRoll: 2.00
//   };

//   // Dynamic Price calculation
//   const orderFinancials = useMemo(() => {
//     const rolls = formData.rollsCount || 1;
//     const devCostPerRoll = pricingConfig.baseDev[formData.processingType] || 5.50;
//     const scanCostPerRoll = pricingConfig.scanning[formData.scanningTier] || 8.00;
//     const printCostPerRoll = pricingConfig.prints[formData.printOption] || 0;
//     const halfFrameCostPerRoll = formData.isHalfFrame ? pricingConfig.halfFrameFeePerRoll : 0;

//     const unitCost = devCostPerRoll + scanCostPerRoll + printCostPerRoll + halfFrameCostPerRoll;
//     const total = unitCost * rolls;

//     return {
//       rolls,
//       devCostPerRoll,
//       scanCostPerRoll,
//       printCostPerRoll,
//       halfFrameCostPerRoll,
//       unitCost,
//       total: total.toFixed(2)
//     };
//   }, [formData]);

//   // Stepper helper
//   const totalWizardSteps = 6;
//   const isNumericStep = typeof currentStep === 'number';

//   // Field change handler
//   const updateField = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: null }));
//     }
//   };

//   // Validation
//   const validateStep = (step) => {
//     const errs = {};
//     if (step === 1) {
//       if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
//       if (!formData.email.trim()) {
//         errs.email = 'Email address is required';
//       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//         errs.email = 'Please provide a valid email';
//       }
//       if (!formData.phone.trim()) errs.phone = 'Phone number is required';
//     }
//     setErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   const handleNext = () => {
//     if (isNumericStep) {
//       if (!validateStep(currentStep)) return;
//       if (currentStep < totalWizardSteps) {
//         setCurrentStep(prev => prev + 1);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       } else if (currentStep === 6) {
//         // Submit order
//         setCurrentStep('confirmed');
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       }
//     }
//   };

//   const handleBack = () => {
//     if (currentStep === 1) {
//       setCurrentStep('landing');
//     } else if (typeof currentStep === 'number' && currentStep > 1) {
//       setCurrentStep(prev => prev - 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   // Film type label lookup
//   const filmTypeLabels = {
//     '35mm': '35mm Standard',
//     '120': '120 Medium Format',
//     'disposable': 'Disposable Camera',
//     'other': 'Other / Specialist Film'
//   };

//   // Stepper Header
//   const renderStepper = () => {
//     if (!isNumericStep) return null;

//     // Visual mapped steps matching the reference graphic (1 to 4 or 1 to 6)
//     // The design displays a sleek 4-step indicator representing major milestones:
//     // 1: Details (Step 1)
//     // 2: Film & Options (Steps 2 & 3)
//     // 3: Scans & Prints (Steps 4 & 5)
//     // 4: Review (Step 6)
//     const milestoneMapping = {
//       1: 1,
//       2: 2,
//       3: 2,
//       4: 3,
//       5: 3,
//       6: 4
//     };
//     const activeMilestone = milestoneMapping[currentStep] || 1;

//     return (
//       <div className="w-full max-w-sm mx-auto mb-8 px-4">
//         <div className="flex items-center justify-between relative">
//           <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 -z-0 -translate-y-1/2" />
//           <div
//             className="absolute top-1/2 left-0 h-0.5 bg-[#2d6a4f] -z-0 -translate-y-1/2 transition-all duration-300"
//             style={{ width: `${((activeMilestone - 1) / 3) * 100}%` }}
//           />
//           {[1, 2, 3, 4].map((stepNum) => {
//             const isCompleted = stepNum < activeMilestone;
//             const isCurrent = stepNum === activeMilestone;

//             return (
//               <div
//                 key={stepNum}
//                 className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold z-10 transition-colors ${
//                   isCurrent
//                     ? 'bg-[#2d6a4f] text-white shadow-sm'
//                     : isCompleted
//                     ? 'bg-[#2d6a4f] text-white'
//                     : 'bg-white text-neutral-500 border border-neutral-300'
//                 }`}
//               >
//                 {stepNum}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#f7f8f6] text-neutral-900 font-sans antialiased selection:bg-[#2d6a4f] selection:text-white">
//       {/* Top Header */}
//       <header className="w-full bg-white border-b border-neutral-200 py-4 px-6 sticky top-0 z-30 shadow-xs">
//         <div className="max-w-2xl mx-auto flex items-center justify-between">
//           <button
//             onClick={() => setCurrentStep('landing')}
//             className="text-left group transition cursor-pointer"
//           >
//             <span className="text-xl font-bold tracking-tight text-neutral-900 block group-hover:text-[#2d6a4f] transition-colors">
//               Foto First
//             </span>
//           </button>
//           <div className="text-right">
//             <span className="text-xs font-medium text-neutral-500 block tracking-tight">Film Processing</span>
//             <span className="text-xs font-semibold text-[#2d6a4f] block">Made Simple</span>
//           </div>
//         </div>
//       </header>

//       {/* Main Container */}
//       <main className="max-w-xl mx-auto px-4 py-8 md:py-12">
//         {/* Stepper (Steps 1 to 6) */}
//         {renderStepper()}

//         {/* ----------------- LANDING VIEW ----------------- */}
//         {currentStep === 'landing' && (
//           <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/80 p-6 md:p-10 transition-all">
//             <div className="space-y-4">
//               <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight">
//                 Get your <br className="hidden md:inline" />
//                 film developed
//               </h1>
//               <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
//                 High quality processing, scanning and prints. Fill in a few details and we'll take care of the rest.
//               </p>

//               {/* Value propositions */}
//               <div className="py-4 space-y-3.5 border-t border-neutral-100 my-4">
//                 <div className="flex items-center gap-3 text-neutral-800 text-sm md:text-base font-medium">
//                   <div className="w-6 h-6 rounded-full bg-[#e8f5e9] text-[#2d6a4f] flex items-center justify-center shrink-0">
//                     <CheckCircle2 className="w-4 h-4" />
//                   </div>
//                   <span>Professional lab processing</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-neutral-800 text-sm md:text-base font-medium">
//                   <div className="w-6 h-6 rounded-full bg-[#e8f5e9] text-[#2d6a4f] flex items-center justify-center shrink-0">
//                     <Sparkles className="w-4 h-4" />
//                   </div>
//                   <span>High quality scans & prints</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-neutral-800 text-sm md:text-base font-medium">
//                   <div className="w-6 h-6 rounded-full bg-[#e8f5e9] text-[#2d6a4f] flex items-center justify-center shrink-0">
//                     <Layers className="w-4 h-4" />
//                   </div>
//                   <span>Easy online ordering</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-neutral-800 text-sm md:text-base font-medium">
//                   <div className="w-6 h-6 rounded-full bg-[#e8f5e9] text-[#2d6a4f] flex items-center justify-center shrink-0">
//                     <ShieldCheck className="w-4 h-4" />
//                   </div>
//                   <span>Trusted by film lovers</span>
//                 </div>
//               </div>

//               {/* Visual Canisters Hero Showcase */}
//               <div className="py-6 px-4 bg-gradient-to-b from-neutral-50 to-neutral-100 rounded-xl border border-neutral-200/60 flex items-end justify-center gap-5 my-6 overflow-hidden">
//                 <div className="transform -rotate-6 hover:rotate-0 transition-transform duration-300">
//                   <KodakCanister />
//                 </div>
//                 <div className="transform hover:-translate-y-1 transition-transform duration-300 scale-105">
//                   <FujiCanister />
//                 </div>
//                 <div className="transform rotate-6 hover:rotate-0 transition-transform duration-300">
//                   <IlfordCanister />
//                 </div>
//               </div>

//               {/* Start Order Button */}
//               <button
//                 onClick={() => setCurrentStep(1)}
//                 className="w-full py-4 px-6 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-medium text-base flex items-center justify-center gap-2 transition duration-200 shadow-sm cursor-pointer"
//               >
//                 <span>Start my order</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ----------------- STEP 1: YOUR DETAILS ----------------- */}
//         {currentStep === 1 && (
//           <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/80 p-6 md:p-8 space-y-6">
//             <div>
//               <h2 className="text-2xl font-bold tracking-tight text-neutral-900">1. Your details</h2>
//               <p className="text-neutral-500 text-sm mt-1">
//                 Let us know who you are so we can keep you updated about your order.
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
//                   Full name <span className="text-rose-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g. Alex Taylor"
//                   value={formData.fullName}
//                   onChange={(e) => updateField('fullName', e.target.value)}
//                   className={`w-full px-4 py-2.5 rounded-lg border text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 transition ${
//                     errors.fullName ? 'border-rose-400 focus:ring-rose-200' : 'border-neutral-200 focus:border-[#2d6a4f] focus:ring-[#2d6a4f]/20'
//                   }`}
//                 />
//                 {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
//                   Email address <span className="text-rose-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={(e) => updateField('email', e.target.value)}
//                   className={`w-full px-4 py-2.5 rounded-lg border text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 transition ${
//                     errors.email ? 'border-rose-400 focus:ring-rose-200' : 'border-neutral-200 focus:border-[#2d6a4f] focus:ring-[#2d6a4f]/20'
//                   }`}
//                 />
//                 {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
//                   Phone number <span className="text-rose-500">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   placeholder="e.g. 07123 456789"
//                   value={formData.phone}
//                   onChange={(e) => updateField('phone', e.target.value)}
//                   className={`w-full px-4 py-2.5 rounded-lg border text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 transition ${
//                     errors.phone ? 'border-rose-400 focus:ring-rose-200' : 'border-neutral-200 focus:border-[#2d6a4f] focus:ring-[#2d6a4f]/20'
//                   }`}
//                 />
//                 {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
//                   How did you hear about us?
//                 </label>
//                 <select
//                   value={formData.referral}
//                   onChange={(e) => updateField('referral', e.target.value)}
//                   className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 bg-white"
//                 >
//                   <option value="">Select an option</option>
//                   <option value="friend">Friend / Word of mouth</option>
//                   <option value="instagram">Instagram</option>
//                   <option value="google">Google Search</option>
//                   <option value="camera-club">Photography Club / University</option>
//                   <option value="youtube">YouTube / Forum</option>
//                 </select>
//               </div>

//               <div className="pt-2">
//                 <label className="flex items-center gap-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={formData.newsletter}
//                     onChange={(e) => updateField('newsletter', e.target.checked)}
//                     className="w-4 h-4 rounded text-[#2d6a4f] focus:ring-[#2d6a4f] border-neutral-300"
//                   />
//                   <span className="text-sm text-neutral-600">Keep me updated with news and offers</span>
//                 </label>
//               </div>
//             </div>

//             {/* Navigation */}
//             <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition cursor-pointer"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 <span>Back</span>
//               </button>
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="px-6 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-lg font-medium text-sm flex items-center gap-2 transition cursor-pointer"
//               >
//                 <span>Continue</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ----------------- STEP 2: YOUR FILM ----------------- */}
//         {currentStep === 2 && (
//           <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/80 p-6 md:p-8 space-y-6">
//             <div>
//               <h2 className="text-2xl font-bold tracking-tight text-neutral-900">2. Your film</h2>
//               <p className="text-neutral-500 text-sm mt-1">
//                 Select the type of film you're sending in.
//               </p>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               {/* Option: 35mm */}
//               <div
//                 onClick={() => updateField('filmType', '35mm')}
//                 className={`relative rounded-xl p-4 border-2 flex flex-col items-center justify-between cursor-pointer transition-all ${
//                   formData.filmType === '35mm'
//                     ? 'border-[#2d6a4f] bg-emerald-50/20 shadow-xs'
//                     : 'border-neutral-200 hover:border-neutral-300 bg-white'
//                 }`}
//               >
//                 {formData.filmType === '35mm' && (
//                   <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-[#2d6a4f] text-white rounded-full flex items-center justify-center">
//                     <Check className="w-3.5 h-3.5 stroke-[3]" />
//                   </div>
//                 )}
//                 <div className="py-4">
//                   <KodakCanister className="w-14 h-18" />
//                 </div>
//                 <div className="text-center mt-2">
//                   <h3 className="font-bold text-neutral-900 text-sm">35mm</h3>
//                   <p className="text-[11px] text-neutral-500 mt-0.5">Standard 35mm film</p>
//                 </div>
//               </div>

//               {/* Option: 120 */}
//               <div
//                 onClick={() => updateField('filmType', '120')}
//                 className={`relative rounded-xl p-4 border-2 flex flex-col items-center justify-between cursor-pointer transition-all ${
//                   formData.filmType === '120'
//                     ? 'border-[#2d6a4f] bg-emerald-50/20 shadow-xs'
//                     : 'border-neutral-200 hover:border-neutral-300 bg-white'
//                 }`}
//               >
//                 {formData.filmType === '120' && (
//                   <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-[#2d6a4f] text-white rounded-full flex items-center justify-center">
//                     <Check className="w-3.5 h-3.5 stroke-[3]" />
//                   </div>
//                 )}
//                 <div className="py-4">
//                   <MediumFormat120 />
//                 </div>
//                 <div className="text-center mt-2">
//                   <h3 className="font-bold text-neutral-900 text-sm">120 (Medium Format)</h3>
//                   <p className="text-[11px] text-neutral-500 mt-0.5">e.g. 6x6, 6x7, 6x9</p>
//                 </div>
//               </div>

//               {/* Option: Disposable Camera */}
//               <div
//                 onClick={() => updateField('filmType', 'disposable')}
//                 className={`relative rounded-xl p-4 border-2 flex flex-col items-center justify-between cursor-pointer transition-all ${
//                   formData.filmType === 'disposable'
//                     ? 'border-[#2d6a4f] bg-emerald-50/20 shadow-xs'
//                     : 'border-neutral-200 hover:border-neutral-300 bg-white'
//                 }`}
//               >
//                 {formData.filmType === 'disposable' && (
//                   <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-[#2d6a4f] text-white rounded-full flex items-center justify-center">
//                     <Check className="w-3.5 h-3.5 stroke-[3]" />
//                   </div>
//                 )}
//                 <div className="py-4 flex items-center justify-center">
//                   <DisposableCameraIcon />
//                 </div>
//                 <div className="text-center mt-2">
//                   <h3 className="font-bold text-neutral-900 text-sm">Disposable Camera</h3>
//                   <p className="text-[11px] text-neutral-500 mt-0.5">e.g. Kodak, Fujifilm, Ilford</p>
//                 </div>
//               </div>

//               {/* Option: Other */}
//               <div
//                 onClick={() => updateField('filmType', 'other')}
//                 className={`relative rounded-xl p-4 border-2 flex flex-col items-center justify-between cursor-pointer transition-all ${
//                   formData.filmType === 'other'
//                     ? 'border-[#2d6a4f] bg-emerald-50/20 shadow-xs'
//                     : 'border-neutral-200 hover:border-neutral-300 bg-white'
//                 }`}
//               >
//                 {formData.filmType === 'other' && (
//                   <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-[#2d6a4f] text-white rounded-full flex items-center justify-center">
//                     <Check className="w-3.5 h-3.5 stroke-[3]" />
//                   </div>
//                 )}
//                 <div className="py-4 flex items-center justify-center gap-1">
//                   <div className="w-12 h-14 bg-amber-950/80 rounded border border-amber-900/40 p-1 flex flex-col justify-around">
//                     <div className="flex justify-between px-0.5">
//                       <div className="w-1.5 h-1.5 bg-neutral-900 rounded-xs" />
//                       <div className="w-1.5 h-1.5 bg-neutral-900 rounded-xs" />
//                     </div>
//                     <div className="w-full h-4 bg-amber-900/40 border border-amber-700/50 rounded-xs flex items-center justify-center text-[7px] text-amber-200 font-mono">
//                       110/APS
//                     </div>
//                     <div className="flex justify-between px-0.5">
//                       <div className="w-1.5 h-1.5 bg-neutral-900 rounded-xs" />
//                       <div className="w-1.5 h-1.5 bg-neutral-900 rounded-xs" />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-center mt-2">
//                   <h3 className="font-bold text-neutral-900 text-sm">Other</h3>
//                   <p className="text-[11px] text-neutral-500 mt-0.5">e.g. 110, APS, 126, Cine</p>
//                 </div>
//               </div>
//             </div>

//             {/* Navigation */}
//             <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition cursor-pointer"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 <span>Back</span>
//               </button>
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="px-6 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-lg font-medium text-sm flex items-center gap-2 transition cursor-pointer"
//               >
//                 <span>Continue</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ----------------- STEP 3: FILM OPTIONS ----------------- */}
//         {currentStep === 3 && (
//           <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/80 p-6 md:p-8 space-y-6">
//             <div>
//               <h2 className="text-2xl font-bold tracking-tight text-neutral-900">3. Film options</h2>
//               <p className="text-neutral-500 text-sm mt-1">
//                 Choose the processing and scanning options for your {filmTypeLabels[formData.filmType]}.
//               </p>
//             </div>

//             {/* Selected Pill Header */}
//             <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-9 h-11 bg-amber-400 rounded-sm border border-amber-600 flex flex-col justify-center items-center text-[8px] font-black leading-tight shadow-2xs">
//                   <span>400</span>
//                   <span className="text-[6px] text-neutral-800">FILM</span>
//                 </div>
//                 <span className="text-sm font-semibold text-neutral-800">
//                   You selected {filmTypeLabels[formData.filmType]}
//                 </span>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setCurrentStep(2)}
//                 className="text-xs font-semibold text-[#2d6a4f] hover:underline cursor-pointer"
//               >
//                 Change
//               </button>
//             </div>

//             {/* Number of rolls */}
//             <div className="space-y-2">
//               <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
//                 Number of rolls
//               </label>
//               <div className="flex items-center gap-4">
//                 <button
//                   type="button"
//                   disabled={formData.rollsCount <= 1}
//                   onClick={() => updateField('rollsCount', Math.max(1, formData.rollsCount - 1))}
//                   className="w-10 h-10 rounded-lg border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
//                 >
//                   <Minus className="w-4 h-4" />
//                 </button>
//                 <span className="text-base font-bold text-neutral-900 w-8 text-center">
//                   {formData.rollsCount}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={() => updateField('rollsCount', formData.rollsCount + 1)}
//                   className="w-10 h-10 rounded-lg border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 cursor-pointer"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             {/* Is this half-frame film? */}
//             <div className="space-y-2 pt-1">
//               <div className="flex items-center gap-1.5">
//                 <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
//                   Is this half-frame film?
//                 </label>
//                 <div className="group relative cursor-pointer">
//                   <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
//                   <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-neutral-900 text-white text-[11px] rounded shadow-md z-20">
//                     Half-frame cameras (like Olympus Pen or Kodak Ektar H35) yield 72 photos per 36-exposure roll.
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div
//                   onClick={() => updateField('isHalfFrame', false)}
//                   className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
//                     !formData.isHalfFrame
//                       ? 'border-[#2d6a4f] bg-emerald-50/20'
//                       : 'border-neutral-200 hover:border-neutral-300'
//                   }`}
//                 >
//                   <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
//                     !formData.isHalfFrame ? 'bg-[#2d6a4f] text-white' : 'border border-neutral-300'
//                   }`}>
//                     {!formData.isHalfFrame && <div className="w-2 h-2 bg-white rounded-full" />}
//                   </div>
//                   <div>
//                     <p className="text-xs font-bold text-neutral-900">No</p>
//                     <p className="text-[11px] text-neutral-500">(Standard 36 exp)</p>
//                   </div>
//                 </div>

//                 <div
//                   onClick={() => updateField('isHalfFrame', true)}
//                   className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
//                     formData.isHalfFrame
//                       ? 'border-[#2d6a4f] bg-emerald-50/20'
//                       : 'border-neutral-200 hover:border-neutral-300'
//                   }`}
//                 >
//                   <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
//                     formData.isHalfFrame ? 'bg-[#2d6a4f] text-white' : 'border border-neutral-300'
//                   }`}>
//                     {formData.isHalfFrame && <div className="w-2 h-2 bg-white rounded-full" />}
//                   </div>
//                   <div>
//                     <p className="text-xs font-bold text-neutral-900">Yes</p>
//                     <p className="text-[11px] text-neutral-500">(Half-frame 72 exp)</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Processing Chemistry */}
//             <div className="space-y-2 pt-1">
//               <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
//                 Processing
//               </label>

//               <div className="grid grid-cols-2 gap-3">
//                 {/* C-41 */}
//                 <div
//                   onClick={() => updateField('processingType', 'c41')}
//                   className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
//                     formData.processingType === 'c41'
//                       ? 'border-[#2d6a4f] bg-emerald-50/20 ring-1 ring-[#2d6a4f]'
//                       : 'border-neutral-200 hover:border-neutral-300'
//                   }`}
//                 >
//                   <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-500 flex items-center justify-center shrink-0 shadow-2xs">
//                     <div className="w-2 h-2 bg-white rounded-full" />
//                   </div>
//                   <div>
//                     <p className="text-xs font-bold text-neutral-900">Standard C-41</p>
//                     <p className="text-[11px] text-neutral-500">(Colour)</p>
//                   </div>
//                 </div>

//                 {/* B&W */}
//                 <div
//                   onClick={() => updateField('processingType', 'bw')}
//                   className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
//                     formData.processingType === 'bw'
//                       ? 'border-[#2d6a4f] bg-emerald-50/20 ring-1 ring-[#2d6a4f]'
//                       : 'border-neutral-200 hover:border-neutral-300'
//                   }`}
//                 >
//                   <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 border border-neutral-300 shadow-2xs">
//                     <div className="w-3.5 h-7 bg-white rounded-r-full overflow-hidden" />
//                   </div>
//                   <div>
//                     <p className="text-xs font-bold text-neutral-900">Black & White</p>
//                     <p className="text-[11px] text-neutral-500">(B&W)</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Navigation */}
//             <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition cursor-pointer"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 <span>Back</span>
//               </button>
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="px-6 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-lg font-medium text-sm flex items-center gap-2 transition cursor-pointer"
//               >
//                 <span>Continue</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ----------------- STEP 4: SCANNING OPTIONS ----------------- */}
//         {currentStep === 4 && (
//           <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/80 p-6 md:p-8 space-y-6">
//             <div>
//               <h2 className="text-2xl font-bold tracking-tight text-neutral-900">4. Scanning options</h2>
//               <p className="text-neutral-500 text-sm mt-1">
//                 Choose how you'd like your photos scanned.
//               </p>
//             </div>

//             <div className="space-y-3">
//               {/* Standard */}
//               <div
//                 onClick={() => updateField('scanningTier', 'standard')}
//                 className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
//                   formData.scanningTier === 'standard'
//                     ? 'border-[#2d6a4f] bg-emerald-50/20'
//                     : 'border-neutral-200 hover:border-neutral-300'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-16 h-12 rounded-lg bg-gradient-to-tr from-amber-600 to-orange-400 overflow-hidden flex items-end justify-center shadow-xs">
//                     <div className="w-12 h-6 bg-amber-900/40 rounded-t-full transform scale-110 translate-y-1" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-bold text-neutral-900">Standard</h3>
//                     <p className="text-xs text-neutral-500">Good quality for everyday use</p>
//                     <p className="text-xs font-semibold text-neutral-800 mt-0.5">£5.00 <span className="font-normal text-neutral-500">per roll</span></p>
//                   </div>
//                 </div>
//                 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
//                   formData.scanningTier === 'standard' ? 'border-[#2d6a4f] bg-[#2d6a4f]' : 'border-neutral-300'
//                 }`}>
//                   {formData.scanningTier === 'standard' && <div className="w-2 h-2 bg-white rounded-full" />}
//                 </div>
//               </div>

//               {/* High Resolution */}
//               <div
//                 onClick={() => updateField('scanningTier', 'high')}
//                 className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
//                   formData.scanningTier === 'high'
//                     ? 'border-[#2d6a4f] bg-emerald-50/20'
//                     : 'border-neutral-200 hover:border-neutral-300'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-16 h-12 rounded-lg bg-gradient-to-tr from-blue-700 via-sky-600 to-cyan-400 overflow-hidden flex items-end justify-center shadow-xs">
//                     <div className="w-10 h-8 bg-blue-950/50 rounded-t-md transform rotate-12 translate-y-2" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-bold text-neutral-900">High Resolution</h3>
//                     <p className="text-xs text-neutral-500">More detail and larger files</p>
//                     <p className="text-xs font-semibold text-neutral-800 mt-0.5">£8.00 <span className="font-normal text-neutral-500">per roll</span></p>
//                   </div>
//                 </div>
//                 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
//                   formData.scanningTier === 'high' ? 'border-[#2d6a4f] bg-[#2d6a4f]' : 'border-neutral-300'
//                 }`}>
//                   {formData.scanningTier === 'high' && <div className="w-2 h-2 bg-white rounded-full" />}
//                 </div>
//               </div>

//               {/* Premium */}
//               <div
//                 onClick={() => updateField('scanningTier', 'premium')}
//                 className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
//                   formData.scanningTier === 'premium'
//                     ? 'border-[#2d6a4f] bg-emerald-50/20'
//                     : 'border-neutral-200 hover:border-neutral-300'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-16 h-12 rounded-lg bg-gradient-to-tr from-purple-800 via-indigo-600 to-pink-500 overflow-hidden flex items-end justify-center shadow-xs">
//                     <div className="w-10 h-7 bg-purple-950/60 rounded-t-lg translate-y-1" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-bold text-neutral-900">Premium (RAW + JPEG)</h3>
//                     <p className="text-xs text-neutral-500">Maximum quality and flexibility</p>
//                     <p className="text-xs font-semibold text-neutral-800 mt-0.5">£12.00 <span className="font-normal text-neutral-500">per roll</span></p>
//                   </div>
//                 </div>
//                 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
//                   formData.scanningTier === 'premium' ? 'border-[#2d6a4f] bg-[#2d6a4f]' : 'border-neutral-300'
//                 }`}>
//                   {formData.scanningTier === 'premium' && <div className="w-2 h-2 bg-white rounded-full" />}
//                 </div>
//               </div>
//             </div>

//             {/* Note banner */}
//             <div className="p-3.5 bg-amber-50/70 border border-amber-200/60 rounded-xl flex items-start gap-2.5">
//               <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
//               <p className="text-xs text-amber-900 leading-relaxed">
//                 All scans are supplied as high quality digital files via a download link sent directly to your email.
//               </p>
//             </div>

//             {/* Navigation */}
//             <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition cursor-pointer"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 <span>Back</span>
//               </button>
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="px-6 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-lg font-medium text-sm flex items-center gap-2 transition cursor-pointer"
//               >
//                 <span>Continue</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ----------------- STEP 5: PRINTS (OPTIONAL) ----------------- */}
//         {currentStep === 5 && (
//           <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/80 p-6 md:p-8 space-y-6">
//             <div>
//               <h2 className="text-2xl font-bold tracking-tight text-neutral-900">5. Prints (optional)</h2>
//               <p className="text-neutral-500 text-sm mt-1">
//                 Add photo prints to your order.
//               </p>
//             </div>

//             <div className="space-y-3">
//               {/* No prints */}
//               <div
//                 onClick={() => updateField('printOption', 'none')}
//                 className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
//                   formData.printOption === 'none'
//                     ? 'border-[#2d6a4f] bg-emerald-50/20'
//                     : 'border-neutral-200 hover:border-neutral-300'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-lg bg-neutral-100 border border-neutral-300 flex items-center justify-center text-neutral-500">
//                     <ImageIcon className="w-5 h-5 text-neutral-400" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-bold text-neutral-900">No prints</h3>
//                     <p className="text-xs text-neutral-500">Digital scans only</p>
//                   </div>
//                 </div>
//                 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
//                   formData.printOption === 'none' ? 'border-[#2d6a4f] bg-[#2d6a4f]' : 'border-neutral-300'
//                 }`}>
//                   {formData.printOption === 'none' && <div className="w-2 h-2 bg-white rounded-full" />}
//                 </div>
//               </div>

//               {/* 4x6 Prints */}
//               <div
//                 onClick={() => updateField('printOption', '4x6')}
//                 className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
//                   formData.printOption === '4x6'
//                     ? 'border-[#2d6a4f] bg-emerald-50/20'
//                     : 'border-neutral-200 hover:border-neutral-300'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center relative overflow-hidden">
//                     <div className="w-8 h-6 bg-white border border-neutral-300 shadow-xs rounded-2xs flex items-center justify-center text-[7px] text-neutral-500">
//                       4x6
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-bold text-neutral-900">4x6" Prints</h3>
//                     <p className="text-xs text-neutral-500">Classic size, great for albums</p>
//                     <p className="text-xs font-semibold text-neutral-800 mt-0.5">£0.25 each <span className="text-neutral-500 font-normal">(£5.00 / roll)</span></p>
//                   </div>
//                 </div>
//                 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
//                   formData.printOption === '4x6' ? 'border-[#2d6a4f] bg-[#2d6a4f]' : 'border-neutral-300'
//                 }`}>
//                   {formData.printOption === '4x6' && <div className="w-2 h-2 bg-white rounded-full" />}
//                 </div>
//               </div>

//               {/* 5x7 Prints */}
//               <div
//                 onClick={() => updateField('printOption', '5x7')}
//                 className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
//                   formData.printOption === '5x7'
//                     ? 'border-[#2d6a4f] bg-emerald-50/20'
//                     : 'border-neutral-200 hover:border-neutral-300'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-lg bg-indigo-100 border border-indigo-300 flex items-center justify-center relative overflow-hidden">
//                     <div className="w-9 h-7 bg-white border border-neutral-300 shadow-xs rounded-2xs flex items-center justify-center text-[7px] text-neutral-500">
//                       5x7
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-bold text-neutral-900">5x7" Prints</h3>
//                     <p className="text-xs text-neutral-500">Larger size for framing</p>
//                     <p className="text-xs font-semibold text-neutral-800 mt-0.5">£0.75 each <span className="text-neutral-500 font-normal">(£9.00 / roll)</span></p>
//                   </div>
//                 </div>
//                 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
//                   formData.printOption === '5x7' ? 'border-[#2d6a4f] bg-[#2d6a4f]' : 'border-neutral-300'
//                 }`}>
//                   {formData.printOption === '5x7' && <div className="w-2 h-2 bg-white rounded-full" />}
//                 </div>
//               </div>

//               {/* 6x4 Contact Sheet */}
//               <div
//                 onClick={() => updateField('printOption', 'contact')}
//                 className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
//                   formData.printOption === 'contact'
//                     ? 'border-[#2d6a4f] bg-emerald-50/20'
//                     : 'border-neutral-200 hover:border-neutral-300'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-lg bg-neutral-900 border border-neutral-700 flex flex-wrap gap-0.5 p-1 items-center justify-center">
//                     <div className="w-2 h-2 bg-neutral-300 rounded-2xs" />
//                     <div className="w-2 h-2 bg-neutral-400 rounded-2xs" />
//                     <div className="w-2 h-2 bg-neutral-300 rounded-2xs" />
//                     <div className="w-2 h-2 bg-neutral-500 rounded-2xs" />
//                     <div className="w-2 h-2 bg-neutral-300 rounded-2xs" />
//                     <div className="w-2 h-2 bg-neutral-400 rounded-2xs" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-bold text-neutral-900">6x4" Contact Sheet</h3>
//                     <p className="text-xs text-neutral-500">All frames on one print</p>
//                     <p className="text-xs font-semibold text-neutral-800 mt-0.5">£1.50 <span className="text-neutral-500 font-normal">per roll</span></p>
//                   </div>
//                 </div>
//                 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
//                   formData.printOption === 'contact' ? 'border-[#2d6a4f] bg-[#2d6a4f]' : 'border-neutral-300'
//                 }`}>
//                   {formData.printOption === 'contact' && <div className="w-2 h-2 bg-white rounded-full" />}
//                 </div>
//               </div>
//             </div>

//             {/* Navigation */}
//             <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition cursor-pointer"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 <span>Back</span>
//               </button>
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="px-6 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-lg font-medium text-sm flex items-center gap-2 transition cursor-pointer"
//               >
//                 <span>Continue</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ----------------- STEP 6: REVIEW YOUR ORDER ----------------- */}
//         {currentStep === 6 && (
//           <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/80 p-6 md:p-8 space-y-6">
//             <div>
//               <h2 className="text-2xl font-bold tracking-tight text-neutral-900">6. Review your order</h2>
//               <p className="text-neutral-500 text-sm mt-1">
//                 Check everything looks right before you send it in.
//               </p>
//             </div>

//             <div className="space-y-4">
//               {/* Your Details Summary */}
//               <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-600">Your details</h3>
//                   <button
//                     type="button"
//                     onClick={() => setCurrentStep(1)}
//                     className="text-xs font-semibold text-[#2d6a4f] hover:underline cursor-pointer"
//                   >
//                     Edit
//                   </button>
//                 </div>
//                 <div className="text-sm font-semibold text-neutral-900">{formData.fullName || 'Alex Taylor'}</div>
//                 <div className="text-xs text-neutral-500 mt-0.5">{formData.email || 'alex@example.com'}</div>
//                 <div className="text-xs text-neutral-500 mt-0.5">{formData.phone || '07123 456789'}</div>
//               </div>

//               {/* Film & Services Summary */}
//               <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50">
//                 <div className="flex items-center justify-between mb-3">
//                   <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-600">Film & services</h3>
//                   <button
//                     type="button"
//                     onClick={() => setCurrentStep(3)}
//                     className="text-xs font-semibold text-[#2d6a4f] hover:underline cursor-pointer"
//                   >
//                     Edit
//                   </button>
//                 </div>

//                 <div className="flex items-start gap-4">
//                   <div className="w-12 h-14 bg-amber-400 rounded-sm border border-amber-600 flex flex-col justify-center items-center text-[8px] font-black leading-tight shadow-xs shrink-0">
//                     <span>400</span>
//                     <span className="text-[6px] text-neutral-800">FILM</span>
//                   </div>
//                   <div className="space-y-1">
//                     <h4 className="text-sm font-bold text-neutral-900">{filmTypeLabels[formData.filmType]}</h4>
//                     <p className="text-xs font-medium text-neutral-600">{formData.rollsCount} {formData.rollsCount === 1 ? 'roll' : 'rolls'}</p>
//                     <ul className="text-xs text-neutral-500 space-y-0.5 list-disc list-inside pt-1">
//                       <li>
//                         {formData.processingType === 'c41' ? 'Standard C-41 processing' : formData.processingType === 'bw' ? 'Black & White processing' : 'E-6 Slide processing'}
//                       </li>
//                       <li>
//                         {formData.scanningTier === 'standard' && 'Standard scans'}
//                         {formData.scanningTier === 'high' && 'High resolution scans'}
//                         {formData.scanningTier === 'premium' && 'Premium RAW + JPEG scans'}
//                       </li>
//                       <li>
//                         {formData.printOption === 'none' && 'No prints'}
//                         {formData.printOption === '4x6' && '4x6" Prints included'}
//                         {formData.printOption === '5x7' && '5x7" Prints included'}
//                         {formData.printOption === 'contact' && '6x4" Contact sheets'}
//                       </li>
//                       <li>{formData.isHalfFrame ? 'Half-frame format (72 exp)' : 'Not half-frame'}</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               {/* Estimated Total */}
//               <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-between">
//                 <div>
//                   <h3 className="text-sm font-bold text-neutral-900">Estimated total</h3>
//                   <p className="text-[11px] text-neutral-500 mt-0.5">
//                     Final price may vary if we spot anything unusual.
//                   </p>
//                 </div>
//                 <div className="text-2xl font-extrabold text-neutral-900">
//                   £{orderFinancials.total}
//                 </div>
//               </div>
//             </div>

//             {/* Navigation */}
//             <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition cursor-pointer"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 <span>Back</span>
//               </button>
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="px-6 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-lg font-medium text-sm flex items-center gap-2 transition cursor-pointer shadow-sm"
//               >
//                 <span>Place my order</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ----------------- ORDER CONFIRMATION ----------------- */}
//         {currentStep === 'confirmed' && (
//           <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/80 p-6 md:p-8 space-y-6 text-center">
//             {/* Success Icon */}
//             <div className="w-16 h-16 bg-[#2d6a4f] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
//               <Check className="w-9 h-9 stroke-[3]" />
//             </div>

//             <div className="space-y-1">
//               <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900">
//                 Order received!
//               </h2>
//               <p className="text-neutral-500 text-sm">
//                 Thanks {formData.fullName || 'there'}, we've received your order.
//               </p>
//             </div>

//             {/* Confirmation Box */}
//             <div className="p-4 bg-emerald-50/70 border border-emerald-200/70 rounded-xl flex items-center gap-3 text-left">
//               <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-[#2d6a4f] shrink-0">
//                 <Mail className="w-5 h-5" />
//               </div>
//               <div className="text-xs">
//                 <p className="text-neutral-600">We've sent a confirmation email to</p>
//                 <p className="font-bold text-neutral-900 text-sm">{formData.email || 'alex@example.com'}</p>
//                 <p className="text-neutral-500">with your order ID <span className="font-mono font-semibold">#FF-{(Math.random() * 89999 + 10000).toFixed(0)}</span> and packing instructions.</p>
//               </div>
//             </div>

//             {/* What happens next roadmap */}
//             <div className="text-left space-y-4 pt-2">
//               <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">What happens next?</h3>

//               <div className="space-y-4 relative pl-7 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
//                 <div className="relative">
//                   <div className="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-[#2d6a4f] text-white flex items-center justify-center text-xs font-bold shadow-xs">
//                     1
//                   </div>
//                   <h4 className="text-sm font-bold text-neutral-900">Send us your film</h4>
//                   <p className="text-xs text-neutral-500 mt-0.5">
//                     We'll email you the address and instructions. Pop your rolls in a padded envelope with your order slip.
//                   </p>
//                 </div>

//                 <div className="relative">
//                   <div className="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-neutral-300 text-neutral-700 flex items-center justify-center text-xs font-bold">
//                     2
//                   </div>
//                   <h4 className="text-sm font-bold text-neutral-900">We process your film</h4>
//                   <p className="text-xs text-neutral-500 mt-0.5">
//                     Usually within 3–5 working days of arrival in the darkroom.
//                   </p>
//                 </div>

//                 <div className="relative">
//                   <div className="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-neutral-300 text-neutral-700 flex items-center justify-center text-xs font-bold">
//                     3
//                   </div>
//                   <h4 className="text-sm font-bold text-neutral-900">Receive your photos</h4>
//                   <p className="text-xs text-neutral-500 mt-0.5">
//                     We'll send you a download link (and prints via tracked post if selected).
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="pt-4 space-y-2.5">
//               <button
//                 type="button"
//                 onClick={() => {
//                   window.print();
//                 }}
//                 className="w-full py-2.5 px-4 rounded-lg border border-neutral-300 hover:bg-neutral-50 text-neutral-700 text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
//               >
//                 <Download className="w-4 h-4" />
//                 <span>Print Order Packing Slip</span>
//               </button>

//               <button
//                 type="button"
//                 onClick={() => {
//                   // Reset back to landing
//                   setCurrentStep('landing');
//                 }}
//                 className="w-full py-3 px-4 rounded-lg bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-sm font-semibold transition cursor-pointer"
//               >
//                 Back to home
//               </button>
//             </div>
//           </div>
//         )}
//       </main>

//       {/* Footer Info */}
//       <footer className="w-full py-6 text-center text-xs text-neutral-400 border-t border-neutral-200 mt-12 bg-white">
//         <p>© Foto First Film Processing Lab. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }
