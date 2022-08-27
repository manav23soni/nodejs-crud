const createOrLoginUserSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    email: {
      description: "Email",
      type: ["string"],
      format: "email",
    },
    firstName: {
      description: "First Nme",
      type: ["string"],
    },
    lastName: {
      description: "Last Name",
      type: ["string"],
    },
    phoneNumber: {
      description: "Phone Number",
      type: ["string"],
    },
  },
  required: ["firstName", "lastName", "email", "phoneNumber"],
};

module.exports = {
  createOrLoginUserSchema,
};
