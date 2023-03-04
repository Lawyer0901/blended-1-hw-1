const checkExtention = (fileName) => {
  const EXTENTIONS = ["txt", "js", "json", "yaml", "xml"];
  // slice
  // lastIindexOf
  const fileExtention = fileName.slice(fileName.lastIndexOf(".") + 1);
  const isExtentionValid = EXTENTIONS.some((el) => el === fileExtention);
  return { isExtentionValid, fileExtention };
};

module.exports = checkExtention;
