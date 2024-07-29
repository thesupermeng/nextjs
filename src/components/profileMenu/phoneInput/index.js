import { CaretDown, Valid } from '@/asset/icons';
import { useState, Children, useEffect } from 'react';
import {
  getExampleNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';
import Image from 'next/image';
import SelectPanel from '../otpModal/SelectPanel';
import CountryIcons from '@/asset/icons/countryIcons';
import useGetConfig from '@/hook/user/useGetConfig';

const PhoneInput = ({
  isValidPhone,
  emitPhoneNum,
  emitSelectedCountry,
  isError = false,
}) => {
  const { config, countries } = useGetConfig();
  const [phoneNum, setPhoneNum] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [validPhoneNum, setValidPhoneNum] = useState(false);

  const [showSelection, setShowSelection] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  useEffect(() => {
    setSelectedCountry(countries[0]);
  }, [countries]);
  useEffect(() => {
    try {
      setPlaceholder(
        getExampleNumber(selectedCountry.value, examples).formatNational()
      );
    } catch {
      (e) => {};
    }
  }, [selectedCountry]);

  const onChange = (e) => {
    const reg = /^[0-9\b]+$/;
    if (e.target.value === '' || reg.test(e.target.value)) {
      setPhoneNum(e.target.value);
      emitPhoneNum(e.target.value);
      emitSelectedCountry(selectedCountry);
      validatePhoneNumber(e.target.value);
    }
  };

  const validatePhoneNumber = (value) => {
    if (
      isPossiblePhoneNumber(value, selectedCountry.value) &&
      isValidPhoneNumber(value, selectedCountry.value) &&
      validatePhoneNumberLength(value, selectedCountry.value) === undefined
    ) {
      setValidPhoneNum(true);
      isValidPhone(true);
    } else {
      setValidPhoneNum(false);
      isValidPhone(false);
    }
  };
  if (!selectedCountry) {
    return null;
  }
  return (
    <div className='flex flex-1'>
      <>
        <div
          className={`flex justify-center items-center w-2/12 mr-[14px] rounded-lg ${
            isError ? 'bg-tayaRed/[.12]' : 'bg-tayaGrey'
          } h-11`}
          onClick={() => setShowSelection(!showSelection)}
        >
          {CountryIcons[selectedCountry.icon] ? (
            <Image
              alt='country'
              className='w-[20px] h-[20px] mr-3'
              src={CountryIcons[selectedCountry.icon]}
            />
          ) : (
            <p className='mr-3'>{selectedCountry.icon}</p>
          )}
          <Image
            className={`cursor-pointer ${showSelection ? 'rotate-180' : ''}`}
            src={CaretDown}
            width={16}
            height={16}
            alt='arrow'
          ></Image>
        </div>
        {showSelection && (
          <SelectPanel
            setSelection={setSelectedCountry}
            setShowSelection={setShowSelection}
          />
        )}
      </>
      {/* <div className='w-1/12'></div> */}
      <div
        className={`flex flex-1 rounded-lg ${
          isError ? 'bg-tayaRed/[.12]' : 'bg-tayaGrey'
        } mb-3.5 w-10/12 h-11`}
      >
        <div className='mt-auto mb-auto pl-3'>{selectedCountry.code}</div>
        <input
          placeholder={placeholder}
          value={phoneNum}
          onChange={onChange}
          type='text'
          inputMode='tel'
          className={`bg-transparent h-11 p-3 w-10/12 rounded-lg outline-none`}
        ></input>
        {validPhoneNum && <Image alt='img' className='mr-2.5' src={Valid} />}
      </div>
    </div>
  );
};

export default PhoneInput;
