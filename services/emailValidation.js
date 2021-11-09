const emailValidation = (email) => {
  const regex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  if (!email || regex.test(email) === false) {
    return false;
  } else {
    return true;
  }
}

module.exports = emailValidation;