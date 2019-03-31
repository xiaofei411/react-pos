import Joi from "joi";
import MESSAGES from "./messages";

export const rules = {
  username: Joi.string()
    .min(2)
    .max(30)
    .required()
    .options({
      language: MESSAGES.username
    }),

  password: Joi.string()
    .min(5)
    .max(30)
    .required()
    .options({
      language: MESSAGES.password
    }),

  info: Joi.string()
    .min(0)
    .max(4000)
    .options({
      language: MESSAGES.info
    }),

  email: Joi.string()
    .required()
    .email()
    .options({
      language: MESSAGES.username
    }),

  phoneNum: Joi.alternatives()
    .when(Joi.number(), {
      then: Joi.string()
        .min(9)
        .max(15)
    })
    .required()
    .options({
      language: MESSAGES.phone
    })
};

export const signIn = Joi.object().keys({
  username: rules.username,
  password: rules.password
});

export const searchUser = Joi.object().keys({
  term: Joi.required()
});

export const internetTimeCalc = Joi.object().keys({
  amount: Joi.number()
    .required()
    .positive()
    .max(100)
});

export const redeemCalc = Joi.object().keys({
  amount: Joi.number()
    .required()
    .positive()
});

export const paymentCredits = Joi.object().keys({
  amount: Joi.number()
    .required()
    .positive()
    .less(51)
});

export const createUser = Joi.object().keys({
  email: Joi.string()
    .email()
    .options({
      language: MESSAGES.username
    }),
  password: rules.password,
  phoneNum: Joi.alternatives()
    .when(Joi.number(), {
      then: Joi.string()
        .min(9)
        .max(15)
    })
    .options({
      language: MESSAGES.phone
    }),
  firstName: Joi.string(),
  lastName: Joi.string(),
  driverLicense: Joi.number()
    .options({
      language: MESSAGES.drLicense
    }),
});

export const editUser = Joi.object().keys({
  email: Joi.string()
    .email()
    .allow("")
    .options({
      language: MESSAGES.username
    }),
  password: Joi.string()
    .min(5)
    .allow("")
    .options({
      language: MESSAGES.phone
    }),
  phoneNum: Joi.number()
    .allow("")
    .options({
      language: MESSAGES.phone
    }),
  firstName: Joi.string().allow(""),
  lastName: Joi.string().allow(""),
  driverLicense: Joi.alternatives()
    .when(Joi.number(), {
      then: Joi.string()
        .min(0)
    })
    .allow("")
    .options({
      language: MESSAGES.drLicense
    }),
});

export const editCashier = Joi.object().keys({
  cachierName: Joi.string()
    .min(2)
    .max(30)
    .options({
      language: MESSAGES.username
    }),
  password: Joi.string()
    .max(30)
    .allow(""),
  info: Joi.string()
    .min(0)
    .max(4000)
    .options({
      language: MESSAGES.info
    })
});

export const createCashier = Joi.object().keys({
  cachierName: Joi.string()
    .min(2)
    .max(30)
    .required()
    .options({
      language: MESSAGES.username
    }),
  username: rules.username,
  password: rules.password
});
