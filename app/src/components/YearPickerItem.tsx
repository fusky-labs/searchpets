export default function YearPickerItem({ years, ...props }: { years: string }) {
  return (
    <div className="year-picker__item">
      <input
        className="year-picker__input"
        type="checkbox"
        id={"year-" + years}
        {...props}
      />
      <label className="year-picker__label" htmlFor={"year-" + years}>
        {years}
      </label>
    </div>
  )
}
