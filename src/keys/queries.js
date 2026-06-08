export const taskQueryKeys = {
  getAll: () => ["tasks"],
  getOneById: (taskId) => ["tasks", taskId],
  getByStatus: (status) => ["tasks", { status }],
}
