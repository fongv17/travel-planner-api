import { param, query, body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateDestinationId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Destination id must be a positive integer'),
  handleValidationErrors,
];

const allowedSortFields = ['id', 'city', 'country', 'arrivalDate', 'departureDate'];
const allowedSortOrders = ['asc', 'desc'];
export const validateDestinationQuery = [
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

export const validateCreateDestination = [
  body('tripId')
    .exists({ values: 'falsy' })
    .withMessage('tripId is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('tripId must be a positive integer'),

  body('city')
    .exists({ values: 'falsy' })
    .withMessage('city is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('city must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('city must be at least 3 characters'),

  body('country')
    .exists({ values: 'falsy' })
    .withMessage('country is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('country must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('country must be at least 3 characters'),

  body('arrivalDate')
    .optional()
    .isISO8601()
    .withMessage('arrivalDate must be a valid date (YYYY-MM-DD)')
    .toDate(),

  body('departureDate')
    .optional()
    .isISO8601()
    .withMessage('departureDate must be a valid date (YYYY-MM-DD)')
    .toDate()
    .bail()
    .custom((value, { req }) => {
      if (req.body.arrivalDate && new Date(value) < new Date(req.body.arrivalDate)) {
        throw new Error('departureDate must be after or equal to arrivalDate');
      }
      return true;
    }),

  handleValidationErrors,
];

export const validateUpdateDestination = [
  oneOf(
    [
      body('city').exists({ values: 'falsy' }),
      body('country').exists({ values: 'falsy' }),
    ],
    {
      message:
        'At least one field (city, country) must be provided',
    },
  ),

  body('city')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('city must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('city must be at least 3 characters'),

  body('country')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('country must be a string')
    .bail()
    .isLength({ min: 1 })
    .withMessage('country must be at least 3 characters'),

  body('arrivalDate')
    .optional()
    .isISO8601()
    .withMessage('arrivalDate must be a valid date (YYYY-MM-DD)')
    .toDate(),

  body('departureDate')
    .optional()
    .isISO8601()
    .withMessage('departureDate must be a valid date (YYYY-MM-DD)')
    .toDate()
    .bail()
    .custom((value, { req }) => {
      if (req.body.startDate && new Date(value) < new Date(req.body.startDate)) {
        throw new Error('departureDate must be after or equal to startDate');
      }
      return true;
    }),  
  handleValidationErrors,
];
