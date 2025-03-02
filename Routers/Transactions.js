// import express from 'express';
// import { addTransactionController, deleteTransactionController, getAllTransactionController, updateTransactionController } from '../controllers/transactionController.js';

// const router = express.Router();

// router.route("/addTransaction").post(addTransactionController);

// router.route("/getTransaction").post(getAllTransactionController);

// router.route("/deleteTransaction/:id").post(deleteTransactionController);

// router.route('/updateTransaction/:id').put(updateTransactionController);

// export default router;

import express from 'express';
import { 
    addTransactionController, 
    deleteTransactionController, 
    getAllTransactionController, 
    updateTransactionController, 
    deleteMultipleTransactionsController, 
    getSingleTransactionController 
} from '../controllers/transactionController.js';
import { validateTransactionInput, validateIdParam } from '../middlewares/validationMiddleware.js';

const router = express.Router();

// Add a new transaction with validation
router.route("/addTransaction").post(validateTransactionInput, addTransactionController);

// Get all transactions
router.route("/getTransaction").get(getAllTransactionController);

// Get single transaction by ID
router.route("/getTransaction/:id").get(validateIdParam, getSingleTransactionController);

// Delete a single transaction
router.route("/deleteTransaction/:id").delete(validateIdParam, deleteTransactionController);

// Delete multiple transactions (multi-deletion)
router.route("/deleteMultipleTransactions").post(async (req, res) => {
  const { ids } = req.body;

  // Validate that the IDs array is provided and not empty
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'Please provide an array of transaction IDs.' });
  }

  try {
    // Perform multi-deletion based on the provided IDs
    const result = await Transaction.deleteMany({ _id: { $in: ids } });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No transactions found with the provided IDs.' });
    }
    res.status(200).json({ message: `${result.deletedCount} transactions deleted.` });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while deleting transactions.' });
  }
});

// Update a transaction
router.route('/updateTransaction/:id').put(validateIdParam, updateTransactionController);

export default router;
