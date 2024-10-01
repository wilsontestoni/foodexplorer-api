function replaceCommaWithPeriod(data) {
  const regex = /^(\d+([.,]\d+)?)?$/;
  if (regex.test(data)) {
    return data.replace(",", ".");
  }
  return null;
}

module.exports = { replaceCommaWithPeriod };
