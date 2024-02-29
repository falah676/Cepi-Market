const TruncateString = (str, length) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
  }
  export default TruncateString