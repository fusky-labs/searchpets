interface IContainerProps {
  children: any;
  classNames?: string;
  mainClassName?: string;
}

export default function Container({
  children,
  mainClassName = "flex flex-col justify-between",
  classNames = "page_searchComic-wrapper",
}: IContainerProps) {
  return (
    <main className={mainClassName}>
      <div className={classNames}>{children}</div>
    </main>
  );
};
