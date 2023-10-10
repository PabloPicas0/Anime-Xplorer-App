const getDate = () => {
  const currentYear = new Date().toLocaleDateString("en-GB", { year: "numeric" });
  const currentMonth = new Date().toLocaleDateString("en-GB", { month: "short" });

  return [currentYear, currentMonth];
};

module.exports = getDate
