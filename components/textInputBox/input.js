import { useCallback, useState } from 'react';
import { CrossRed, TickBlue } from '@/asset/icons';
import Image from 'next/image';
import { debounce } from 'lodash';

export default function TextInput({ 
    name, 
    placeholder, 
    validator, 
    onChange, 
    errorMessage, 
    isShowIcon, 
    prefixText, 
    inputType = 'text', 
    initValue = '', 
    checkNotEmpty = false // New prop
}) {
    const [isError, setIsError] = useState(false);
    const [_value, _setValue] = useState(initValue); // for condition checking only

    const valueValidator = useCallback((e) => {
        let err = false;
        const value = e.target.value;

        if (checkNotEmpty && !value) {
            setIsError(true);
            err = true;
        } else if (validator && value) {
            const isValidInput = validator(value);

            if (!isValidInput) {
                setIsError(true);
                err = true;
            } else {
                setIsError(false);
            }
        } else {
            setIsError(false);
        }

        onChange(e, err);
    }, [validator, onChange, checkNotEmpty]);

    const debouncedValidator = debounce(valueValidator, 100);

    const internalOnChange = (e) => {
        debouncedValidator(e);
        _setValue(e.target.value);
    };

    const inputBackground = isError ? 'bg-[#FF10101A] border border-[#FF1010]' : 'bg-[#1D2023]';

    const icon = isError ? CrossRed : TickBlue;

    return (
        <div className='flex-col flex-1'>
            <div
                className={`h-[47px] px-[9px] py-[22px] rounded-[10px] flex items-center gap-[12px] ${inputBackground}`}
            >
                {prefixText &&
                    <span className={'text-white text-[15px] bg-transparent'}>{prefixText}</span>
                }
                <input
                    name={name}
                    placeholder={placeholder}
                    onChange={internalOnChange}
                    className={'text-white text-[15px] w-full bg-transparent outline-none pl-2 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none autofillInput'}
                    type={inputType}
                    value={_value}
                />
                {validator && // if validator exist
                    _value && // if value is not empty
                    isShowIcon && // prop
                <Image
                    src={icon}
                    alt="Icon"
                />}
            </div>
            {isError && <p className={'text-[13px] text-[#FF1010]'}>{errorMessage}</p>}
            {!isError && <p className={'text-[13px] text-transparent'}>placeholder</p>}
        </div>
    )
}
