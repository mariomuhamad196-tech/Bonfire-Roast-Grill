import React, { useState } from "react";
import { X, Calendar, Clock, Users, Coffee, NotepadText, CheckCircle2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export interface Booking {
  code: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  seating: string;
  notes: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

export default function BookingModal({ isOpen, onClose, onBookingSuccess }: BookingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seating, setSeating] = useState("indoor");
  const [notes, setNotes] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Silakan masukkan Nama Lengkap Anda.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("Silakan masukkan No. WhatsApp / Telepon aktif Anda.");
      return;
    }
    if (!date) {
      setErrorMsg("Silakan pilih Tanggal Kedatangan.");
      return;
    }
    if (!time) {
      setErrorMsg("Silakan pilih Jam Kedatangan.");
      return;
    }

    setIsSubmitting(true);

    // Simulate database write
    setTimeout(() => {
      // Generate unique elegant booking code (e.g. BF-8273)
      const bookingCode = `BF-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const newBooking: Booking = {
        code: bookingCode,
        name,
        phone,
        guests,
        date,
        time,
        seating,
        notes
      };

      // Save into localStorage
      try {
        const stored = localStorage.getItem("bonfire_bookings");
        const existing = stored ? JSON.parse(stored) : [];
        existing.push(newBooking);
        localStorage.setItem("bonfire_bookings", JSON.stringify(existing));
      } catch (err) {
        console.error("Local storage fail:", err);
      }

      setSuccessBooking(newBooking);
      setIsSubmitting(false);

      // Fire a luxurious golden-orange confetti burst!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ea580c", "#f59e0b", "#fbbf24", "#ffffff", "#1d1512"]
      });

      onBookingSuccess(newBooking);
    }, 1200);
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setGuests(2);
    setDate("");
    setTime("");
    setSeating("indoor");
    setNotes("");
    setSuccessBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div 
        id="booking-modal-holder"
        className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-fade-in"
      >
        {/* Top wood luxury accent banner */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-amber-500 to-amber-900" />

        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-800/80 bg-zinc-950/50">
          <div>
            <h3 className="text-white font-sans text-[17px] font-bold uppercase tracking-wide">
              {successBooking ? "RESERVASI BERHASIL" : "RESERVASI MEJA"}
            </h3>
            <p className="text-stone-400 text-xs mt-0.5">Bonfire Roast & Grill Bandung</p>
          </div>
          <button
            onClick={successBooking ? handleReset : onClose}
            className="w-10 h-10 bg-zinc-900 border border-stone-800 text-stone-300 hover:text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer"
            aria-label="Tutup Form Reservasi"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Modal body Content container scrollable */}
        <div className="overflow-y-auto p-6 md:p-8 flex-grow">
          {successBooking ? (
            /* SUCCESS BOOKING SUMMARY */
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mx-auto animate-pulse">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-white font-sans text-xl font-bold uppercase tracking-wide">Sampai Jumpa, {successBooking.name}!</h4>
                <p className="text-stone-400 text-xs font-sans mt-1.5 px-4">
                  Reservasi Anda telah terkonfirmasi. Salinan kode reservasi telah disimpan di peramban Anda. Tunjukkan kode berikut kepada staf kami saat kedatangan.
                </p>
              </div>

              {/* Elegant Ticket Card presentation */}
              <div className="bg-zinc-950/80 rounded-2xl border border-stone-800 p-5 max-w-sm mx-auto text-left relative overflow-hidden">
                {/* Decorative cutouts */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-stone-900 rounded-full border-r border-stone-800" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-stone-900 rounded-full border-l border-stone-800" />

                <div className="flex items-center justify-between border-b border-stone-800/60 pb-3 mb-4">
                  <span className="text-stone-400 font-mono text-[10px] uppercase tracking-wider">KODE RESERVASI</span>
                  <span className="text-orange-400 font-mono text-base font-bold tracking-widest">{successBooking.code}</span>
                </div>

                <div className="grid grid-cols-2 gap-y-3 text-xs font-sans text-stone-300">
                  <div>
                    <span className="text-stone-500 font-mono text-[9px] uppercase tracking-wider block">GUEST(S)</span>
                    <strong className="text-stone-200">{successBooking.guests} Orang</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 font-mono text-[9px] uppercase tracking-wider block">AREA TEMPAT DUDUK</span>
                    <strong className="text-stone-200 uppercase">{successBooking.seating}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 font-mono text-[9px] uppercase tracking-wider block">TANGGAL</span>
                    <strong className="text-stone-200">{successBooking.date}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 font-mono text-[9px] uppercase tracking-wider block">JAM KEDATANGAN</span>
                    <strong className="text-amber-300 font-mono">{successBooking.time} WIB</strong>
                  </div>
                </div>

                {successBooking.notes && (
                  <div className="border-t border-stone-800/40 mt-4 pt-3 flex items-start gap-1.5">
                    <NotepadText className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-stone-400 leading-normal italic">
                      Notes: "{successBooking.notes}"
                    </p>
                  </div>
                )}
              </div>

              {/* Local guides reminder */}
              <p className="text-[11px] text-amber-500/80 font-mono uppercase tracking-widest flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-orange-500 animate-spin" />
                Dikonfirmasi Langsung oleh Reservasi Pusat Bonfire
              </p>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl text-xs uppercase font-bold tracking-wider hover:from-orange-500 hover:to-amber-500 transition-colors uppercase cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>
          ) : (
            /* BOOKING INPUT FORM */
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3.5 rounded-xl text-center">
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* Full Name Input */}
              <div>
                <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1.5 font-bold">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Mario Muhamad"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-stone-800 hover:border-stone-700 focus:border-amber-500 text-stone-200 outline-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-amber-500/30 transition-colors"
                />
              </div>

              {/* Phone / WhatsApp Input */}
              <div>
                <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1.5 font-bold">
                  No. WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-950 border border-stone-800 hover:border-stone-700 focus:border-amber-500 text-stone-200 outline-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-amber-500/30 transition-colors"
                />
              </div>

              {/* Guests Count Selector */}
              <div>
                <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1.5 font-bold flex items-center justify-between">
                  <span>Jumlah Orang *</span>
                  <span className="text-amber-400 font-mono">{guests} Tamu</span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={guests <= 1}
                    onClick={() => setGuests(guests - 1)}
                    className="w-11 h-11 bg-zinc-950 border border-stone-800 text-stone-400 hover:text-white rounded-xl flex items-center justify-center hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <div className="flex-grow bg-zinc-950 border border-stone-800 rounded-xl h-11 flex items-center justify-center font-mono text-sm text-stone-200">
                    <Users className="w-4 h-4 text-orange-500 mr-2" />
                    {guests} Tamu / Kursi
                  </div>
                  <button
                    type="button"
                    disabled={guests >= 20}
                    onClick={() => setGuests(guests + 1)}
                    className="w-11 h-11 bg-zinc-950 border border-stone-800 text-stone-400 hover:text-white rounded-xl flex items-center justify-center hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Date & Time Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1.5 font-bold">
                    Tanggal Kedatangan *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-zinc-950 border border-stone-800 hover:border-stone-700 focus:border-amber-500 text-stone-200 outline-none rounded-xl pl-9 pr-3 py-3 text-xs sm:text-sm focus:ring-1 focus:ring-amber-500/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1.5 font-bold">
                    Jam Kedatangan *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
                    <select
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-zinc-950 border border-stone-800 hover:border-stone-700 focus:border-amber-500 text-stone-200 outline-none rounded-xl pl-9 pr-3 py-3 text-xs sm:text-sm focus:ring-1 focus:ring-amber-500/30 transition-colors appearance-none"
                    >
                      <option value="">Pilih Jam</option>
                      <option value="11:00">11:00 WIB</option>
                      <option value="12:00">12:00 WIB</option>
                      <option value="13:00">13:00 WIB</option>
                      <option value="14:00">14:00 WIB</option>
                      <option value="17:50">17:50 WIB</option>
                      <option value="18:30">18:30 WIB</option>
                      <option value="19:00">19:00 WIB</option>
                      <option value="19:30">19:30 WIB</option>
                      <option value="20:00">20:00 WIB</option>
                      <option value="20:30">20:30 WIB</option>
                      <option value="21:00">21:00 WIB</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Seating Area Category Selectors */}
              <div>
                <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1.5 font-bold">
                  Pilih Area Meja *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "indoor", label: "Indoor", desc: "Live Music" },
                    { id: "outdoor", label: "Outdoor", desc: "Taman Asri" },
                    { id: "private", label: "Private Rm", desc: "Eksklusif" }
                  ].map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setSeating(area.id)}
                      className={`px-3 py-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        seating === area.id
                          ? "bg-orange-500/10 border-orange-500 text-orange-200 font-bold"
                          : "bg-zinc-950 border-stone-800 text-stone-400 hover:border-stone-700"
                      }`}
                    >
                      <span className="text-xs uppercase tracking-wider">{area.label}</span>
                      <span className="text-[9px] font-mono mt-0.5 opacity-60 text-stone-400">{area.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Notes input */}
              <div>
                <label className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1.5 font-bold">
                  Catatan Khusus (Opsional)
                </label>
                <textarea
                  rows={2}
                  maxLength={180}
                  placeholder="Contoh: Rayakan ulang tahun pernikahan, mohon siapkan lilin di steak/meja besar dekat panggung akustik."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-zinc-950 border border-stone-800 hover:border-stone-700 focus:border-amber-500 text-stone-200 outline-none rounded-xl px-4 py-3 text-xs sm:text-sm focus:ring-1 focus:ring-amber-500/30 transition-colors resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs uppercase font-bold tracking-wider cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-grow py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-sans text-xs uppercase font-bold tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg relative flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Coffee className="w-4 h-4 text-orange-200" />
                      Konfirmasi Reservasi
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
