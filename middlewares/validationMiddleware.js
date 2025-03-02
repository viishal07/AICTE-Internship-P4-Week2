import { body } from 'express-validator';

export const validateTransactionInput = [
  body('title').notEmpty().withMessage('Title is required'),
  body('amount').isNumeric().withMessage('Amount should be a number'),
  body('category').notEmpty().withMessage('Category is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('transactionType').notEmpty().withMessage('Transaction Type is required'),
  body('date').isISO8601().withMessage('Invalid date format'),
];
