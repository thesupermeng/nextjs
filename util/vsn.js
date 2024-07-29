export const vsnType = {
  heimuer: 'h',
  liangzi: 'l',
  huawei8: '8',
};

export const encodeVSN = (value) => {
  if (!vsnType[value]) {
    // Assign the next character code and increment it for future use
    return btoa(value);
  }

  return vsnType[value];
};

export const decodeVSN = (value) => {
  for (const [key, val] of Object.entries(vsnType)) {
    if (val === value) {
      return key;
    }
  }

  // If not found in vsnType, assume it's a base64 encoded value
  try {
    return atob(value);
  } catch (e) {
    // Handle invalid base64 strings
    return '';
  }
};
