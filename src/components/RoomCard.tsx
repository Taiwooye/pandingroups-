import Image from "next/image";
import Link from "next/link";
import { Room } from "@/types";

interface RoomCardProps {
  room: Room;
  basePath: string;
}

export default function RoomCard({ room, basePath }: RoomCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
              room.available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {room.available ? "Available" : "Booked"}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-[#7B2D3A]/90 text-white capitalize">
            {room.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-800 mb-1">{room.name}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">{room.description}</p>

        <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {room.capacity} {room.capacity === 1 ? "Guest" : "Guests"}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {room.size} m²
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {room.features.slice(0, 3).map((f) => (
            <span key={f} className="px-2 py-0.5 bg-sky-50 text-sky-700 text-xs rounded-full font-medium">
              {f}
            </span>
          ))}
          {room.features.length > 3 && (
            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full font-medium">
              +{room.features.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <span className="text-2xl font-bold text-sky-700">${room.price}</span>
            <span className="text-sm text-slate-400 ml-1">/ night</span>
          </div>
          <Link
            href={`${basePath}/${room.id}`}
            className="px-4 py-2 bg-[#7B2D3A] text-white text-sm font-semibold rounded-lg hover:bg-[#5C1D28] transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
