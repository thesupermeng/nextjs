import Image from 'next/image';
import { CaretDown, CNFlag } from '@/asset/icons';
import { useEffect, useState } from 'react';
import { getCountryList } from '@/services/yingshiUser';
import { Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react';
import TextInput from '../textInputBox/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function CountryInput({ name, placeholder, validator, onChange, errorMessage, isShowIcon, setCountryPrefix }) {
  const [countryList, setCountryList] = useState([]);
  const [chosenCountry, setChosenCountry] = useState(null);
  const [openCountry, setOpenCountry] = useState(false);
  const [searchCountry, setSearchCountry] = useState('');

  useEffect(() => {
    getCountryList().then((result) => {
      setCountryList(result)
      setChosenCountry(result[0])
      onChange({ target: { name: 'phonecode', value: result[0].country_phonecode } })
      onChange({ target: { name: 'countryId', value: result[0].country_id } })
    })
  }, [])


  useEffect(() => {


    if (chosenCountry) {

      setCountryPrefix(chosenCountry.country_phonecode)
    }
  }, [chosenCountry])

  const prefix = chosenCountry ? `+${chosenCountry.country_phonecode}` : '+86'
  const flag = chosenCountry ? chosenCountry.country_flag : CNFlag;

  const handleClick = () => {
    setOpenCountry(true);
  }

  return (
    <div className={'flex gap-[14px]'}>
      <Popover open={openCountry} handler={() => setOpenCountry(x => !x)} placement={'bottom-start'}>
        <PopoverHandler>
          <div className='flex px-[12px] py-[14px] gap-[10px] items-center bg-[#1D2023] rounded-[6px] w-fit h-[47px]' onClick={handleClick}>
            <Image src={flag} alt={'country flag'} width={20} height={20} />
            <Image src={CaretDown} alt={'more'} />
          </div>
        </PopoverHandler>
        <PopoverContent className={'w-[300px] bg-[#191A1D] border-[#191A1D] p-[12px] z-[10000] text-white'}> {/* modal z-index 9999, so need to be above */}
          <div>
            <p className={'text-[16px] text-center'}>选择国家电话代码</p>
            <div className={'mt-[10px]'}>
              <FontAwesomeIcon icon={faSearch} width={20} className={'mr-[10px]'} />
              <input
                type={'text'}
                className={'text-[#9C9C9C] bg-transparent outline-none'}
                placeholder={'搜索'}
                value={searchCountry}
                onChange={(e) => setSearchCountry(e.target.value)}
              />
            </div>
            <div className={'max-h-[300px] overflow-scroll mt-[10px]'}>
              {countryList
                .filter((country) => country.country_name.toLowerCase().includes(searchCountry.toLowerCase()) || country.country_phonecode.toString().includes(searchCountry.toLowerCase()))
                .map((country, idx) => {
                  return <CountrySelectItem
                    key={idx}
                    country={country}
                    onClick={(e) => {
                      onChange(e)
                      setChosenCountry(country)
                      setOpenCountry(false)
                    }}
                    isSelected={country.country_id === chosenCountry.country_id}
                  />
                })

              }
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <TextInput name={name} placeholder={placeholder} validator={validator} onChange={onChange}
        errorMessage={errorMessage} isShowIcon={isShowIcon} prefixText={prefix}
        inputType={'number'}
      />
    </div>
  )
}


function CountrySelectItem({ country, onClick, isSelected }) {
  const selectedStyles = isSelected ? 'bg-[#FAC33D1F]' : ''

  const handleOnClick = (e) => {
    const phonecodeEvent = { ...e }
    phonecodeEvent.target.name = 'phonecode'
    phonecodeEvent.target.value = country.country_phonecode
    onClick(phonecodeEvent)

    const countryidEvent = { ...e }
    countryidEvent.target.name = 'countryId'
    countryidEvent.target.value = country.country_id
    onClick(countryidEvent)
  }

  return (
    <div className={`flex gap-[15px] p-[12px] rounded-[6px] ${selectedStyles} hover:bg-[#FAC33D10]`} onClick={handleOnClick} data-name={'test'}>
      <Image src={country.country_flag} alt={country.country_iso3} width={22} height={22} />
      <span className={'w-[45px]'}>+{country.country_phonecode}</span>
      <span className={'flex-1'}>{country.country_name}</span>
    </div>
  )
}
