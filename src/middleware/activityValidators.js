import { param, query, body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateActivityId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Activity id must be a positive integer'),
  handleValidationErrors,
];

const allowedSortFields = ['id', 'title'];
const allowedSortOrders = ['asc', 'desc'];
export const validateActivityQuery = [
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

export const validateCreateActivity = [
  body('title')
    .exists({ values: 'falsy' })
    .withMessage('title is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('title must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('title must be at least 3 characters'),

  body('type')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('type must be a string')
    .bail()
    .isLength({ min: 1 })
    .withMessage('type must be at least 1 character'),

   body('startTime')
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('startTime must be in HH:mm format'),

  body('endTime')
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('endTime must be in HH:mm format')
    .bail(),

  handleValidationErrors,
];

export const validateUpdateActivity = [
  oneOf(
    [
      body('title').exists({ values: 'falsy' }),
    ],
    {
      message:
        'At least one field (title) must be provided',
    },
  ),

  body('title')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('title must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('title must be at least 3 characters'),

  body('type')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('type must be a string')
    .bail()
    .isLength({ min: 1 })
    .withMessage('type must be at least 1 character'),

  body('startTime')
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('startTime must be in HH:mm format'),

  body('endTime')
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('endTime must be in HH:mm format')
    .bail(),

  handleValidationErrors,
];
