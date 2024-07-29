import Footer from '../Footer';

export const PageContent = ({
  header = null,
  children,
  footer = <Footer />,
}) => {
  return (
    <div className='flex flex-1 pt-6 flex-col items-stretch'>
      <div className='flex flex-initial px-12'>{header}</div>
      <div className='flex flex-[1_0_0] overflow-y-auto min-y-0 pt-6 flex-col bg-transparent'>
        <div className='flex flex-1 flex-col px-12'>{children}</div>
        {footer ? <div className='flex-none w-full'>{footer}</div> : null}
      </div>
    </div>
  );
};
