export const LoginContentError = ({ errorMsg }) => {
  return errorMsg ? (
    <p className='text-[0.8125rem] text-tayaRed mt-2 mb-2'>{errorMsg}</p>
  ) : null;
};
