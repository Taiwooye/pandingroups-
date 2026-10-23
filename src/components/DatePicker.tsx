"use client";

import { useEffect, useId, useRef, useState } from "react";

interface DatePickerProps {
  /** Selected date as YYYY-MM-DD, or "" */
  value: string;
  onChange: (value: string) => void;
  /** Earliest selectable date as YYYY-MM-DD */
  min?: string;
  placeholder?: string;
  /** Other end of a date range, used to highlight the nights in between */
  rangeStart?: string;
  rangeEnd?: string;
  className?: string;
  ariaLabel?: string;
  /** Which side of the field the calendar opens on */
  placement?: "top" | "bottom";
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function fromKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDisplay(key: string): string {
  return fromKey(key).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

// Styled calendar popover replacing the browser's native date input.
export default function DatePicker({
  value,
  onChange,
  min,
  placeholder = "Select date",
  rangeStart,
  rangeEnd,
  className = "",
  ariaLabel,
  placement = "bottom",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const initial = value ? fromKey(value) : min ? fromKey(min) : new Date();
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popoverId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => {
    if (!open) {
      // Open on the selected month, or the earliest allowed month
      const focus = value ? fromKey(value) : min ? fromKey(min) : new Date();
      setViewYear(focus.getFullYear());
      setViewMonth(focus.getMonth());
    }
    setOpen((o) => !o);
  };

  const shiftMonth = (delta: number) => {
    const d = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const todayKey = toKey(new Date());
  const minDate = min ? fromKey(min) : null;
  const canGoBack = !minDate || new Date(viewYear, viewMonth, 1) > new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (string | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => toKey(new Date(viewYear, viewMonth, i + 1))),
  ];
  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={popoverId}
        aria-label={ariaLabel}
        className={`group w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl border bg-white text-left text-sm transition-all ${
          open ? "border-gold ring-2 ring-gold/30" : "border-slate-200 hover:border-gold/60"
        }`}
      >
        <svg className="w-4 h-4 text-gold-dark shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className={`truncate ${value ? "text-slate-800 font-medium" : "text-slate-400"}`}>
          {value ? formatDisplay(value) : placeholder}
        </span>
      </button>

      {open && (
        <div
          id={popoverId}
          role="dialog"
          aria-label="Choose date"
          className={`absolute z-50 left-0 ${placement === "top" ? "bottom-full mb-2" : "top-full mt-2"} w-[19rem] p-4 rounded-2xl bg-white shadow-2xl ring-1 ring-gold/30 animate-fade-in`}
        >
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              disabled={!canGoBack}
              aria-label="Previous month"
              className="w-8 h-8 rounded-full flex items-center justify-center text-wine hover:bg-cream disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="font-serif text-lg font-semibold text-wine">{monthLabel}</span>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              aria-label="Next month"
              className="w-8 h-8 rounded-full flex items-center justify-center text-wine hover:bg-cream transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {WEEKDAYS.map((d) => (
              <span key={d} className="text-center text-[11px] font-semibold uppercase tracking-wider text-gold-dark py-1">
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((key, i) => {
              if (!key) return <span key={`blank-${i}`} />;
              const disabled = !!min && key < min;
              const selected = key === value;
              const isEdge = key === rangeStart || key === rangeEnd;
              const inRange = !!rangeStart && !!rangeEnd && key > rangeStart && key < rangeEnd;
              const isToday = key === todayKey;
              return (
                <button
                  key={key}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(key);
                    setOpen(false);
                  }}
                  aria-pressed={selected}
                  aria-label={formatDisplay(key)}
                  className={`relative h-9 text-sm rounded-full transition-all ${
                    selected
                      ? "btn-wine font-semibold shadow-md"
                      : isEdge
                        ? "bg-primary/15 text-primary font-semibold"
                        : inRange
                          ? "bg-gold/15 text-wine rounded-none"
                          : disabled
                            ? "text-slate-300 cursor-not-allowed line-through decoration-slate-200"
                            : "text-slate-700 hover:bg-cream hover:text-primary"
                  } ${isToday && !selected ? "ring-1 ring-gold" : ""}`}
                >
                  {Number(key.slice(8))}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream-dark">
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="text-xs font-semibold text-slate-400 hover:text-primary transition-colors"
            >
              Clear
            </button>
            {(!min || todayKey >= min) && (
              <button
                type="button"
                onClick={() => {
                  onChange(todayKey);
                  setOpen(false);
                }}
                className="text-xs font-semibold text-gold-dark hover:text-primary transition-colors"
              >
                Today
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
