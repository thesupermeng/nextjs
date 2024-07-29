export const FullPageContent = ({ children, className = '', full = true }) => {
  if (full) {
    return (
      <div
        className={`fixed inset-0 flex flex-1 flex-col z-10 bg-black/100 ${className}`}
      >
        {children}
      </div>
    );
  } else {
    return <>{children}</>;
  }
};
