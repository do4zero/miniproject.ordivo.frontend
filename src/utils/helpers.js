export const cantZeroValue = (value) => {
  if (value > 0) {
    return true;
  }
  return false;
};

export const minimalDonation = (value) => {
  if (value >= 0) {
    return true;
  }
  return false;
};
