import { param, query, body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateAccommodationId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Accommodation id must be a positive integer'),
  handleValidationErrors,
];

const allowedSortFields = ['id', 'name', 'pricePerNight', 'type'];
const allowedSortOrders = ['asc', 'desc'];
export const validateAccommodationQuery = [
  query('search').optional().isString().withMessage('search must be a string'),

  query('sortBy')
    .optional()
    .isIn(allowedSortFields)
    .withMessage(`sortBy must be one of: ${allowedSortFields.join(', ')}`),

  query('sortOrder')
    .optional()
    .isIn(allowedSortOrders)
    .withMessage(`sortOrder must be one of: ${allowedSortOrders.join(', ')}`),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('limit must be an integer between 1 and 100'),

  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must be 0 or a positive integer'),

  handleValidationErrors,
];

export const validateCreateAccommodation = [
  body('destinationId')
    .exists({ values: 'falsy' })
    .withMessage('destinationId is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('destinationId must be a positive integer'),

  body('name')
    .exists({ values: 'falsy' })
    .withMessage('name is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('name must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters'),

  body('type')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('type must be a string')
    .bail()
    .isLength({ min: 1 })
    .withMessage('type must be at least 1 character'),

  body('pricePerNight')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('pricePerNight must be a positive number'),  

  handleValidationErrors,
];

export const validateUpdateAccommodation = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('type').exists({ values: 'falsy' }),
      body('pricePerNight').exists(),
    ],
    {
      message:
        'At least one field (name, type, pricePerNight) must be provided',
    },
  ),

  body('name')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('name must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters'),

  body('type')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('type must be a string')
    .bail()
    .isLength({ min: 1 })
    .withMessage('type must be at least 1 character'),

  body('pricePerNight')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('pricePerNight must be a positive number'),

  handleValidationErrors,
];
