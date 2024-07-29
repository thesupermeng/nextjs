import CountryIcons from '@/asset/icons/countryIcons';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { searchIcon } from '../../../asset/icons';
import useGetConfig from '@/hook/user/useGetConfig';

export default function SelectPanel({ setShowSelection, setSelection }) {
  const { config, countries } = useGetConfig();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    if (countries?.length > 0) {
      setSearchResults(countries);
      setSelection(countries[0]);
    }
  }, [countries]);

  const handleSearch = useCallback(
    (event) => {
      const searchText = event.target.value;
      setSearchTerm(searchText);
      // Filter the options based on the search term
      const filteredResults = countries.filter((option) =>
        JSON.stringify(option).toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(filteredResults);
    },
    [countries]
  );

  return (
    <div
      className='absolute mt-11 z-10 flex w-[270px]'
      onClick={() => {
        setShowSelection(false);
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='absolute overflow-visible w-full p-3 text-center rounded-[14px] bg-tayaGrey/[1] '
      >
        <p>{t('selectYourCountry')}</p>
        <div className='flex items-center gap-3 my-5'>
          <Image src={searchIcon} alt='search' width={20} />
          <input
            className='bg-transparent'
            placeholder={t('search')}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className='max-h-[180px] mt-2 overflow-scroll no-scrollbar flex flex-col gap-0'>
          {searchResults?.map((d, index) => (
            <button
              key={index}
              className='flex gap-5 ml-2 hover:bg-tayaRed/[.12] p-3'
              onClick={() => {
                setSelection(d);
                setShowSelection(false);
              }}
            >
              {/* <p>{d.icon}</p> */}
              {CountryIcons[d.icon] ? (
                <Image
                  className='w-[20px] h-[20px]'
                  alt={d.icon}
                  src={CountryIcons[d.icon]}
                />
              ) : (
                <p>{d.icon}</p>
              )}
              <p>{d.code}</p>
              <p>{d.text}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
