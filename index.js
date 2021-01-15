module.exports = () => (req, res, next) => {
  req.only = (...fields) => {
    if (Array.isArray(fields[0])) fields = fields[0];

    const data = {};

    for (const field of fields) {
      reqData = req.body[field];

      if (reqData !== undefined) {
        data[field] = reqData;
      }
    }

    const isEmpty = !Object.keys(data).length;

    if (isEmpty) {
      return null;
    } else {
      return data;
    }
  };

  next();
};
