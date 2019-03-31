const _required = "This is required field";
const _noKey = "";

const _extend = (
  overrideObj = {
    string: {},
    number: {},
    boolean: {},
    any: {},
    alternatives: {}
  }
) => ({
  ...overrideObj,

  string: {
    min: "At least {{limit}} chars",
    max: "Max {{limit}} chars",
    required: _required,
    email: "Enter valid email",
    ...overrideObj.string
  },
  number: {
    base: "Must be a number",
    positive: "Must be positive",
    ...overrideObj.number
  },
  email: {
    ...overrideObj.email
  },
  boolean: {
    ...overrideObj.boolean
  },
  any: {
    empty: _required,
    required: _required,
    ...overrideObj.any
  },
  alternatives: {
    base: "Must be a number",
    child: {
      string: {
        min: "At least {{limit}} chars",
        max: "Max {{limit}} chars",
        ...overrideObj.string
      }
    }
  },
  key: _noKey
});

export default {
  username: _extend(),
  password: _extend(),
  info: _extend(),
  phone: _extend(),
  drLicense: _extend()
};
