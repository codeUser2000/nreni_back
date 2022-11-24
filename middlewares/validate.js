import HttpError from 'http-errors';

const validate = (schema) => (req, res, next) => {
  try {
    // eslint-disable-next-line no-shadow
    const validate = schema.unknown().validate(req, {
      abortEarly: false,
      errors: {
        label: 'key',
      },
    });

    if (validate.error) {
      const errors = {};

      validate.error.details.forEach((error) => {
        error.path.shift();
        errors[error.path.join('.')] = error.message;
      });
      throw HttpError(409, { errors });
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default validate;
