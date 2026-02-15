import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function DatePicker({
  value: valueProp = null,
  onChange = () => {},
  placeholder = "mm/dd/yyyy",
  className = "",
  error,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(
    valueProp ? new Date(valueProp) : null
  );
  const [viewDate, setViewDate] = useState(
    selected ? new Date(selected) : new Date()
  );
  const [inputValue, setInputValue] = useState(
    selected ? formatInput(selected) : ""
  );
  const [dropdownStyle, setDropdownStyle] = useState({
    position: "fixed",
    opacity: 0,
    pointerEvents: "none",
  });

  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);

  function formatInput(d) {
    if (!d) return "";
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update selected value if valueProp changes
  useEffect(() => {
    if (valueProp) {
      const newDate = new Date(valueProp);
      setSelected(newDate);
      setViewDate(newDate);
      setInputValue(formatInput(newDate));
    }
  }, [valueProp]);

  useEffect(() => {
    function updatePosition() {
      if (open && wrapperRef.current && dropdownRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const dropdownWidth = dropdownRef.current.offsetWidth;
        const dropdownHeight = dropdownRef.current.offsetHeight;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Calculate horizontal position
        let left = rect.left + rect.width / 2 - dropdownWidth / 2;
        // Adjust if goes off left edge
        if (left < 5) {
          left = 5;
        }
        // Adjust if goes off right edge
        if (left + dropdownWidth > screenWidth - 5) {
          left = screenWidth - dropdownWidth - 5;
        }

        // Calculate vertical position
        let top = rect.bottom + 8; // 8px gap below input
        // If dropdown would go off bottom of screen, position it above the input
        if (top + dropdownHeight > screenHeight - 10) {
          top = rect.top - dropdownHeight - 8;
        }

        setDropdownStyle({
          position: "fixed",
          left: `${left}px`,
          top: `${top}px`,
          zIndex: 9999,
          opacity: 1,
          pointerEvents: "auto",
        });
      }
    }

    if (open) {
      // Small delay to ensure DOM is ready
      requestAnimationFrame(() => {
        updatePosition();
      });
    }
    
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
  const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0);

  function goMonth(offset) {
    const next = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() + offset,
      1
    );
    setViewDate(next);
  }

  function selectDate(day) {
    if (disabled) return;
    // Create a new date at noon to avoid timezone issues
    const dateAtNoon = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 12, 0, 0, 0);
    setSelected(dateAtNoon);
    onChange(dateAtNoon);
    setInputValue(formatInput(dateAtNoon));
    setOpen(false);
  }

  function handleInputChange(e) {
    if (disabled) return;
    const rawValue = e.target.value;
    
    // If user is typing and value contains slashes, preserve them during editing
    // Only auto-format when typing continuously without slashes
    let value;
    if (rawValue.includes('/')) {
      // User is editing with slashes present - minimal processing
      value = rawValue.replace(/[^\d\/]/g, "");
    } else {
      // User is typing fresh - apply auto-formatting
      value = rawValue.replace(/[^\d]/g, "");
      if (value.length >= 3 && value.length <= 4)
        value = value.slice(0, 2) + "/" + value.slice(2);
      else if (value.length >= 5)
        value =
          value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4, 8);
    }

    setInputValue(value);

    if (value === "") {
      setSelected(null);
      onChange(null);
      return;
    }

    const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (match) {
      const month = parseInt(match[1], 10);
      const day = parseInt(match[2], 10);
      const year = parseInt(match[3], 10);
      
      // Validate month range
      if (month < 1 || month > 12) {
        setSelected(null);
        onChange(null);
        return;
      }
      
      // Validate day range
      if (day < 1 || day > 31) {
        setSelected(null);
        onChange(null);
        return;
      }
      
      // Validate year range (reasonable range)
      if (year < 1900 || year > 2100) {
        setSelected(null);
        onChange(null);
        return;
      }
      
      // Create date at noon to avoid timezone issues
      const parsed = new Date(year, month - 1, day, 12, 0, 0, 0);
      
      // Validate that the date is real (e.g., not Feb 31, not Apr 31, etc.)
      if (
        parsed.getFullYear() === year &&
        parsed.getMonth() === month - 1 &&
        parsed.getDate() === day
      ) {
        setSelected(parsed);
        setViewDate(parsed);
        onChange(parsed);
        return;
      }
    }

    setSelected(null);
    onChange(null);
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

  const dropdown = open ? (
    <div
      ref={dropdownRef}
      className="w-60 bg-white rounded-2xl shadow-xl border border-gray-100"
      style={dropdownStyle}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => goMonth(-1)}
              className="p-1 rounded-md hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="none"
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
              onClick={() => goMonth(1)}
              className="p-1 rounded-md hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="none"
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
              const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0);
              setSelected(today);
              setViewDate(today);
              setInputValue(formatInput(today));
              onChange(today);
              setOpen(false);
            }}
            className="text-xs px-2 py-1 rounded-md hover:bg-green-100"
          >
            Today
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
                  className={`h-7 rounded-md text-sm flex items-center justify-center transition-all ${
                    isCurrentMonth ? "" : "opacity-40 cursor-default"
                  } ${
                    isSelected
                      ? "bg-green-600 text-white"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <div className="relative flex items-center justify-center w-full h-full">
                    <span>{day.getDate()}</span>
                    {isToday && !isSelected && (
                      <span className="absolute -bottom-2 text-[14px] text-green-700">
                        ●
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <div
      className={`relative inline-block ${
        open ? "border border-gray-500 ring-1 ring-gray-500" : "border border-gray-300"
      } ${
        error
          ? "border-red-500 outline outline-offset-0 outline-red-200"
          : "border-gray-300"
      } ${className} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      ref={wrapperRef}
    >
      <label className="sr-only">Date</label>
      <div className="flex items-center h-full w-full">
        <div className="flex items-center gap-2 bg-transparent rounded-xl border-0 w-full h-full">
          <button
            type="button"
            onClick={() => !disabled && setOpen((prev) => !prev)}
            className={`rounded-md flex items-center justify-center ${!disabled ? "hover:bg-gray-50" : ""}`}
            title="Open calendar"
            disabled={disabled}
          >
            <svg
              className="w-4 h-4 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
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
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={handleInputChange}
            onFocus={() => !disabled && setOpen(true)}
            className="flex-1 w-full h-full bg-transparent outline-none focus:ring-0 text-xs text-gray-800 placeholder-gray-400 border-0 flex items-center"
            disabled={disabled}
          />
        </div>
      </div>
      {dropdown && createPortal(dropdown, document.body)}
    </div>
  );
}