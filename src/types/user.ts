export type UserType = {
    userID: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: true,
    },
    name: String,
    email: String,
    password: String,
    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date
    }
  };
  