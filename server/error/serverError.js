const serverError = (error, req, res, next) => {
  console.log(error);
  if (error.status) {
    res
      .status(error.status)
      .json({ status: error.status, message: error.message });
  } else {
    res.status(500).json({ status: 500, message: 'Server Error' });
  }
};

export default serverError;
