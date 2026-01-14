// src/components/FlightCard.tsx
import { Plane, ArrowRight, Clock, Briefcase, Utensils, AlertCircle } from "lucide-react";

const FlightCard = ({ data }: { data: any }) => {
  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-lg my-4 overflow-hidden">
      
      {/* Header: Airline & Price */}
      <div className="flex justify-between items-start p-5 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Plane className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white leading-tight">{data.airline}</h3>
            <span className="text-xs text-slate-500 font-medium bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
              Economy • T3
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-slate-900 dark:text-white">{data.price}</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wide">per adult</p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between relative">
          
          {/* Origin */}
          <div className="text-center z-10">
            <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{data.departureTime}</p>
            <p className="text-sm font-semibold text-slate-500">{data.origin}</p>
          </div>

          {/* Visual Path */}
          <div className="flex-1 px-4 relative flex flex-col items-center justify-center">
            <span className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {data.duration}
            </span>
            <div className="w-full h-[2px] bg-slate-200 dark:bg-slate-700 relative">
               {/* Dot Start */}
               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
               {/* Plane Icon Moving */}
               <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-1">
                 <Plane className="w-4 h-4 text-blue-500 rotate-90" />
               </div>
               {/* Dot End */}
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 font-medium uppercase tracking-wider">{data.stops}</span>
          </div>

          {/* Destination */}
          <div className="text-center z-10">
            <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{data.arrivalTime}</p>
            <p className="text-sm font-semibold text-slate-500">{data.destination}</p>
          </div>
        </div>
      </div>

      {/* Amenities & Badges */}
      <div className="px-5 pb-4 flex gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100">
           <Briefcase className="w-3 h-3" /> 15kg Baggage
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-orange-50 text-orange-700 px-2 py-1 rounded border border-orange-100">
           <Utensils className="w-3 h-3" /> Meal Included
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-200">
           <AlertCircle className="w-3 h-3" /> Refundable
        </span>
      </div>

      {/* Action Footer */}
      <div className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 p-3 flex gap-2">
        <button className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors">
          View Details
        </button>
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]">
          Add to Quote
        </button>
      </div>
    </div>
  );
};

export default FlightCard;