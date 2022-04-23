interface IContainerProps {
  children: any;
  classNames?: string;
  mainClassName?: string;
}

export default function Container({
  children,
  mainClassName = "flex flex-col justify-between",
  classNames = "select-none mx-auto my-0 max-w-[1400px] p-5 flex flex-col items-center gap-y-8",
}: IContainerProps) {
  return (
    <main className={mainClassName}>
      <div className={classNames}>{children}</div>
    </main>
  );
};
