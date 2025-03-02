const transactionSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    // ... other fields
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,  // Add required if the user is always required for transactions
    },
  });
  