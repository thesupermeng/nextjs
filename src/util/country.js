export const CountryData = [
  {
    value: 'US',
    text: 'United States of America',
    code: '+1',
    icon: '🇺🇸',
  },
  {
    value: 'UK',
    text: 'United Kingdom',
    code: '+44',
    icon: '🇬🇧',
  },
  {
    value: 'CA',
    text: 'Canada',
    code: '+1',
    icon: '🇨🇦',
  },
  {
    value: 'AU',
    text: 'Australia',
    code: '+61',
    icon: '🇦🇺',
  },
  {
    value: 'IE',
    text: 'Ireland',
    code: '+353',
    icon: '🇮🇪',
  },
  {
    value: 'NZ',
    text: 'New Zealand',
    code: '+64',
    icon: '🇳🇿',
  },
  {
    value: 'ZA',
    text: 'South Africa',
    code: '+27',
    icon: '🇿🇦',
  },
  {
    value: 'IN',
    text: 'India',
    code: '+91',
    icon: '🇮🇳',
  },
  {
    value: 'MY',
    text: 'Malaysia',
    code: '+60',
    icon: 'my',
  },
  {
    value: 'SG',
    text: 'Singapore',
    code: '+65',
    icon: 'sg',
  },
  {
    value: 'CN',
    text: 'China',
    code: '+86',
    icon: 'cn',
  },

  {
    value: 'HK',
    text: 'Hong Kong',
    code: '+852',
    icon: 'hk',
  },
  {
    value: 'MA',
    text: 'Macau',
    code: '+853',
    icon: 'ma',
  },
  {
    value: 'TW',
    text: 'Taiwan',
    code: '+886',
    icon: 'tw',
  },
  {
    value: 'PH',
    text: 'Philippines',
    code: '+63',
    icon: 'ph',
  },
  {
    value: 'TH',
    text: 'Thailand',
    code: '+66',
    icon: 'th',
  },
  {
    value: 'VN',
    text: 'Vietnam',
    code: '+84',
    icon: 'vt',
  },
  {
    value: 'IR',
    text: 'Iran',
    code: '+98',
    icon: 'ir',
  },
];

export const filteredCountries = (display_country_arr = []) => {
  return display_country_arr?.length > 0
    ? display_country_arr.map((code) => {
        return CountryData.find((d) => d.code === code);
      })
    : [...CountryData];
};
