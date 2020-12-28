exports.userSignupValidator = (req, res, next) => {
    req.check("name", "Name is required").notEmpty();
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });
    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.userSigninValidator = (req, res, next) => {
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });
    req.check("password", "Password is required, it must not be empty").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.categoryFormValidator = (req, res, next) => {
    req.check("name", "Name is required").notEmpty()
        .isLength({ max: 32 })
        .withMessage("Name must be between 0 to 32 characters");
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.directorCreateValidator = (req, res, next) => {
    req.check("name", "Name is required").notEmpty()
        .isLength({ min: 4, max: 32 })
        .withMessage("Name must be between 4 to 32 characters");
    req.check("summary", "summary is required").notEmpty()
        .isLength({ min: 4, max: 200 })
        .withMessage("Summary must be between 4 to 200 characters");
    req.check("birthdate", "birthdate is required").notEmpty()
        .isISO8601()
        .withMessage('Must be a valid date');
    req.check("nationality", "nationality is required").notEmpty()
        .isLength({ min: 2, max: 32 })
        .withMessage("Nationality must be between 2 to 32 characters");
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};
    
exports.directorUpdateValidator = (req, res, next) => {
    req.check("name")
        .isLength({ min: 4, max: 32 })
        .withMessage("Name must be between 4 to 32 characters")
        .optional();
    req.check("summary")
        .isLength({ min: 4, max: 200 })
        .withMessage("Summary must be between 4 to 200 characters")
        .optional();
    req.check("birthdate")
        .isISO8601()
        .withMessage('Must be a valid date')
        .optional();
    req.check("nationality")
        .isLength({ min: 2, max: 32 })
        .withMessage("Nationality must be between 2 to 32 characters")
        .optional();
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.movieCreateValidator = (req, res, next) => {
    req.check("name", "Name is required").notEmpty()
        .isLength({ min: 4, max: 32 })
        .withMessage("Name must be between 4 to 32 characters");
    req.check("summary", "summary is required").notEmpty()
        .isLength({ min: 4, max: 200 })
        .withMessage("Summary must be between 4 to 200 characters");
    req.check("date_emit", "Date Emit is required").notEmpty()
        .isISO8601()
        .withMessage('Must be a valid date');
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};