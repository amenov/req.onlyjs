const flat = require("flat");

module.exports = () => (req, res, next) => {
  req.only = (...fields) => {
    if (Array.isArray(fields[0])) fields = fields[0];

    const tmpFields = [];

    const parser = (fields, prevKey) => {
      fields.forEach((field) => {
        if (typeof field === "object") {
          Object.keys(field).forEach((key) => {
            parser(field[key], prevKey ? prevKey + "." + key : key);
          });
        } else {
          tmpFields.push(prevKey ? prevKey + "." + field : field);
        }
      });
    };

    parser(fields);

    const body = {};

    tmpFields.forEach((field) => {
      try {
        if (eval("req.body." + field) !== undefined) {
          body[field] = eval("req.body." + field);
        }
      } catch (e) {
        console.log(e);
      }
    });

    return flat.unflatten(body);
  };

  next();
};
