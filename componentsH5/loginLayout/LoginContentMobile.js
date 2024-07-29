import PhoneInput from '@/components/profileMenu/phoneInput';

export const LoginContentMobile = ({
  isError,
  setMobileValidated,
  setPhoneNum,
  setSelectedCountry,
}) => {
  return (
    <div>
      <PhoneInput
        isValidPhone={setMobileValidated}
        emitPhoneNum={setPhoneNum}
        emitSelectedCountry={setSelectedCountry}
        isError={isError}
      />
    </div>
  );
};
