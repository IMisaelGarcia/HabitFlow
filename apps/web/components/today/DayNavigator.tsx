import { ChevronLeft, ChevronRight } from "lucide-react";
import { iconButton } from "../ui/styles";

type DayNavigatorProps = {
  isToday: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
};

export function DayNavigator({
  isToday,
  onPrevious,
  onNext,
  onToday,
}: DayNavigatorProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Día anterior"
        title="Día anterior"
        className={iconButton}
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={isToday}
        aria-label="Día siguiente"
        title="Día siguiente"
        className={`${iconButton} disabled:pointer-events-none disabled:opacity-40`}
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
      {!isToday && (
        <button
          type="button"
          onClick={onToday}
          className="ml-2 rounded-card px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent-soft/60"
        >
          Volver a hoy
        </button>
      )}
    </div>
  );
}