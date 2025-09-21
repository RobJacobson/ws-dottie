// Test utilities and mock data for WSF API tests

// Helper function to log unexpected errors
export const logUnexpectedError = (error: unknown) => {
  const errorInfo = {
    type: error instanceof Error ? error.constructor.name : "Unknown",
    message: error instanceof Error ? error.message : "No message",
  };
  console.log("Unexpected error type:", errorInfo.type);
  console.log("Error message:", errorInfo.message);
};
