import { param, query, body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateTripId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Trip id must be a positive integer'),
  handleValidationErrors,
];

const allowedSortFields = ['id', 'name', 'startDate', 'endDate'];
const allowedSortOrders = ['asc', 'desc'];
export const validateTripQuery = [
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

export const validateCreateTrip = [
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

  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('startDate must be a valid date (YYYY-MM-DD)')
    .toDate(),

  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('endDate must be a valid date (YYYY-MM-DD)')
    .toDate()
    .bail()
    .custom((value, { req }) => {
      if (req.body.startDate && new Date(value) < new Date(req.body.startDate)) {
        throw new Error('endDate must be after or equal to startDate');
      }
      return true;
    }),

  handleValidationErrors,
];

export const validateUpdateTrip = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
    ],
    {
      message:
        'At least one field (name) must be provided',
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

  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('startDate must be a valid date (YYYY-MM-DD)')
    .toDate(),

  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('endDate must be a valid date (YYYY-MM-DD)')
    .toDate()
    .bail()
    .custom((value, { req }) => {
      if (req.body.startDate && new Date(value) < new Date(req.body.startDate)) {
        throw new Error('endDate must be after or equal to startDate');
      }
      return true;
    }),
  handleValidationErrors,
];
