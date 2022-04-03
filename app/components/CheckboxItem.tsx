interface ICheckboxItemProps {
  year: string
}

export default function CheckboxItem({year = new Date().getFullYear().toString()}: ICheckboxItemProps) {
  return(
    <div className="relative block">
      <input
        className="absolute top-0 invisible"
        type="checkbox"
        id={"year-" + year}
      />
      <label 
        className="block px-5 py-3 shadow-md font-bold rounded-md transition-all duration-300 text-xl text-center h-full w-full bg-slate-800"
        htmlFor={'year-' + year}
      >
        {year}
      </label>
    </div>
  )
};
