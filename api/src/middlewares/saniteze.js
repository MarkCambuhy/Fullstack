import xss from "xss";

const sanitizeInput = (req, res, next) => {
  if (req.body) {
    sanitizeObject(req.body);
  }
  if (req.query) {
    sanitizeObject(req.query);
  }
  next();
};

const sanitizeObject = (obj) => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj[key] = sanitizeValue(obj[key]);
    }
  }
};

const sanitizeValue = (value) => {
  if (typeof value === "string") {
    return xss(value);
  } else if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  } else if (typeof value === "object" && value !== null) {
    sanitizeObject(value);
  }
  return value;
};

export default sanitizeInput;
