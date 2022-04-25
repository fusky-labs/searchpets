interface IYearPickerProps {
  years: string;
}

export default function YearPickerItem({ years, ...props }: IYearPickerProps) {
  return (
    <div className="relative block">
      <input
        className="absolute top-0 invisible"
        type="checkbox"
        id={"year-" + years}
        {...props}
      />
      <label
        className="block px-5 py-3 shadow-md font-bold rounded-md transition-all duration-300 text-xl text-center h-full w-full bg-slate-800"
        htmlFor={"year-" + years}
      >
        {years}
      </label>
    </div>
  );
};
