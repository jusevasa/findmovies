export const LoadingSearch = () => {
  return (
    <div className='flex justify-center items-center h-full gap-2.5'>
      <span className='sr-only'>Loading...</span>
      <div className='h-4 w-4 animate-color-change rounded-full [animation-delay:-0.3s]'></div>
      <div className='h-4 w-4 animate-color-change rounded-full [animation-delay:-0.15s]'></div>
      <div className='h-4 w-4 animate-color-change rounded-full'></div>
    </div>
  );
};
