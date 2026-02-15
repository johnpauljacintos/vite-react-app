import React, { useState, useRef, useEffect } from "react";

export default function DateTimePicker({
  value: valueProp = null,
  onChange = () => {},
  placeholder = "mm/dd/yyyy hh:mm AM",
  className = "",
  showTime = true,
}) {
  const [open, setOpen] = useState(false);
  const [dropdownReady, setDropdownReady] = useState(false);
  const [selected, setSelected] = useState(
    valueProp ? new Date(valueProp) : null,
  );
  const [viewDate, setViewDate] = useState(
    selected ? new Date(selected) : new Date(),
  );
  const [inputValue, setInputValue] = useState(
    selected ? formatInput(selected) : "",
  );
  const [hours, setHours] = useState(
    selected ? selected.getHours() % 12 || 12 : 12,
  );
  const [minutes, setMinutes] = useState(selected ? selected.getMinutes() : 0);
  const [period, setPeriod] = useState(
    selected && selected.getHours() >= 12 ? "PM" : "AM",
  );
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  function formatInput(d) {
    if (!d) return "";
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();

    if (showTime) {
      const hrs = d.getHours();
      const mins = d.getMinutes();
      const displayHours = hrs % 12 || 12;
      const displayMinutes = String(mins).padStart(2, "0");
      const ampm = hrs >= 12 ? "PM" : "AM";
      return `${month}/${day}/${year} ${displayHours}:${displayMinutes} ${ampm}`;
    }

    return `${month}/${day}/${year}`;
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (valueProp) {
      const newDate = new Date(valueProp);
      setSelected(newDate);
      setViewDate(newDate);
      setInputValue(formatInput(newDate));
      if (showTime) {
        setHours(newDate.getHours() % 12 || 12);
        setMinutes(newDate.getMinutes());
        setPeriod(newDate.getHours() >= 12 ? "PM" : "AM");
      }
    }
  }, [valueProp, showTime]);

  useEffect(() => {
    if (open) {
      setDropdownReady(false);
      requestAnimationFrame(() => {
        setDropdownReady(true);
      });
    } else {
      setDropdownReady(false);
    }
  }, [open]);

  const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
  const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0);

  function goMonth(offset) {
    const next = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() + offset,
      1,
    );
    setViewDate(next);
  }

  function updateDateTime(day, hrs, mins, prd) {
    const newDate = new Date(day);
    const hour24 = prd === "PM" ? (hrs % 12) + 12 : hrs % 12;
    newDate.setHours(hour24, mins, 0, 0);
    return newDate;
  }

  function selectDate(day) {
    let finalDate;
    if (showTime) {
      finalDate = updateDateTime(day, hours, minutes, period);
    } else {
      finalDate = new Date(day);
      finalDate.setHours(0, 0, 0, 0);
    }

    setSelected(finalDate);
    onChange(finalDate);
    setInputValue(formatInput(finalDate));
    if (!showTime) {
      setOpen(false);
    }
  }

  function applyTime() {
    if (selected) {
      const finalDate = updateDateTime(selected, hours, minutes, period);
      setSelected(finalDate);
      onChange(finalDate);
      setInputValue(formatInput(finalDate));
      setOpen(false);
    }
  }

  function handleInputChange(e) {
    const value = e.target.value;
    setInputValue(value);

    const match = value.match(
      /^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})\s*(AM|PM))?$/i,
    );
    if (match) {
      const month = parseInt(match[1], 10);
      const day = parseInt(match[2], 10);
      const year = parseInt(match[3], 10);

      let parsed = new Date(year, month - 1, day);

      if (match[4] && match[5] && match[6]) {
        const hrs = parseInt(match[4], 10);
        const mins = parseInt(match[5], 10);
        const prd = match[6].toUpperCase();
        const hour24 = prd === "PM" ? (hrs % 12) + 12 : hrs % 12;
        parsed.setHours(hour24, mins, 0, 0);
        setHours(hrs);
        setMinutes(mins);
        setPeriod(prd);
      }

      if (
        parsed.getFullYear() === year &&
        parsed.getMonth() === month - 1 &&
        parsed.getDate() === day
      ) {
        setSelected(parsed);
        setViewDate(parsed);
        onChange(parsed);
      }
    }
  }

  const buildWeeks = () => {
    const first = startOfMonth(viewDate);
    const last = endOfMonth(viewDate);
    const startDay = new Date(first);
    startDay.setDate(first.getDate() - first.getDay());

    const weeks = [];
    let cursor = new Date(startDay);

    while (cursor <= last || cursor.getDay() !== 0) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(cursor));
        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  };

  const weeks = buildWeeks();
  const today = new Date();

  return (
    <div className={`relative inline-block ${className}`} ref={wrapperRef}>
      <label className="sr-only">Date</label>
      <div className="flex items-center h-full w-full">
        <div className="flex items-center gap-2 bg-transparent rounded-xl border-0 w-full h-full">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-md flex items-center justify-center hover:bg-gray-50"
            title="Open calendar"
          >
            <svg
              className="w-4 h-4 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M16 2V6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 2V6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={handleInputChange}
            onFocus={() => setOpen(true)}
            className="flex-1 w-full h-full bg-transparent outline-none focus:ring-0 text-xs text-gray-800 placeholder-gray-400 border-0 flex items-center"
            aria-label="Choose date"
          />
          <button
            type="button"
            className="rounded-md hover:bg-gray-100 flex items-center justify-center"
            onClick={() => {
              setSelected(null);
              setInputValue("");
              onChange(null);
            }}
            title="Clear"
          >
            <svg
              className="w-4 h-4 text-gray-500"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6l8 8M14 6L6 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div
          className={`absolute z-50 mt-2 left-1/2 -translate-x-1/2 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 transition-opacity duration-75 ${
            dropdownReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ maxWidth: "calc(100vw - 10px)" }}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goMonth(-1)}
                  className="p-1 rounded-md hover:bg-gray-50"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15L7 10L12 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="text-xs whitespace-nowrap font-semibold text-gray-800">
                  {viewDate.toLocaleString(undefined, { month: "long" })}{" "}
                  {viewDate.getFullYear()}
                </div>
                <button
                  type="button"
                  onClick={() => goMonth(1)}
                  className="p-1 rounded-md hover:bg-gray-50"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 5L13 10L8 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  const now = new Date();
                  setSelected(now);
                  setViewDate(now);
                  setInputValue(formatInput(now));
                  if (showTime) {
                    setHours(now.getHours() % 12 || 12);
                    setMinutes(now.getMinutes());
                    setPeriod(now.getHours() >= 12 ? "PM" : "AM");
                  }
                  onChange(now);
                  setOpen(false);
                }}
                className="text-xs px-2 py-1 rounded-md hover:bg-green-100"
              >
                Now
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-[10px] text-gray-500 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-center font-medium">
                  {d}
                </div>
              ))}
            </div>
            {weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
                {week.map((day) => {
                  const isCurrentMonth = day.getMonth() === viewDate.getMonth();
                  const isSelected =
                    selected && day.toDateString() === selected.toDateString();
                  const isToday = day.toDateString() === today.toDateString();
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => selectDate(day)}
                      className={`h-7 rounded-md text-sm flex items-center justify-center transition-all
                        ${isCurrentMonth ? "" : "opacity-40 cursor-default"}
                        ${
                          isSelected
                            ? "bg-green-600 text-white"
                            : "text-gray-800 hover:bg-gray-100"
                        }`}
                    >
                      <div className="relative flex items-center justify-center w-full h-full">
                        <span>{day.getDate()}</span>
                        {isToday && !isSelected && (
                          <span className="absolute -bottom-2 text-[14px] text-green-500">
                            ●
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
            {showTime && (
              <div className="mt-4 pt-2 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => setHours((h) => (h === 12 ? 1 : h + 1))}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 15L5 10L15 10L10 15Z"
                          fill="currentColor"
                          transform="rotate(180 10 10)"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      value={String(hours).padStart(2, "0")}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        if (val >= 1 && val <= 12) setHours(val);
                      }}
                      className="w-12 text-center text-sm font-semibold bg-gray-50 rounded py-0 border-0 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setHours((h) => (h === 1 ? 12 : h - 1))}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 15L5 10L15 10L10 15Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                  <span className="text-xl font-semibold text-gray-600">:</span>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => setMinutes((m) => (m + 1) % 60)}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 15L5 10L15 10L10 15Z"
                          fill="currentColor"
                          transform="rotate(180 10 10)"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      value={String(minutes).padStart(2, "0")}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        if (val >= 0 && val <= 59) setMinutes(val);
                      }}
                      className="w-12 text-center text-sm font-semibold bg-gray-50 rounded py-0 border-0 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setMinutes((m) => (m === 0 ? 59 : m - 1))}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 15L5 10L15 10L10 15Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() =>
                        setPeriod((p) => (p === "AM" ? "PM" : "AM"))
                      }
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 15L5 10L15 10L10 15Z"
                          fill="currentColor"
                          transform="rotate(180 10 10)"
                        />
                      </svg>
                    </button>
                    <div className="w-12 text-center text-[13px] font-semibold bg-gray-50 rounded py-1">
                      {period}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setPeriod((p) => (p === "AM" ? "PM" : "AM"))
                      }
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 15L5 10L15 10L10 15Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={applyTime}
                  className="w-full mt-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
