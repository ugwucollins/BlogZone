export const VailationSignUp = (
  email: string | any,
  firstName: string | any,
  lastName: string | any,
  setformerr: object | any,
  password: string | any
) => {
  let errors = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  };
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;

  if (firstName === "") {
    const message = "please enter Your firstName";
    errors.firstName = message;
  } else if (lastName === "") {
    const message = "please enter Your lastName";
    errors.lastName = message;
  } else if (email === "") {
    const message = "please enter Your email";
    errors.email = message;
  } else if (!emailRegex.test(email)) {
    const message = "inVailed Email";
    errors.email = message;
  } else if (password === "") {
    const message = "please enter Your Password";
    errors.password = message;
  } else if (password.length <= 5) {
    const message = "Your Password must be more than 5 characters";
    errors.password = message;
  } else {
    const message = "";
    return [
      (errors.email = message),
      (errors.firstName = message),
      (errors.lastName = message),
      (errors.password = message),
      true,
    ];
  }

  setformerr({ ...errors });
};

export const VailationLogin = (
  email: string | any,
  setformerr: object | any,
  password: string | any
) => {
  let errors = {
    email: "",
    password: "",
  };
  if (email === "") {
    const message = "please enter Your email";
    errors.email = message;
  } else if (password === "") {
    const message = "please enter Your Password";
    errors.password = message;
  }
  //  else if (password.length <= 5) {
  //   const message = "Your Password must be more than 5 characters";
  //   errors.password = message;
  // }
  else {
    const message = "";
    return [(errors.email = message), (errors.password = message), true];
  }

  setformerr({ ...errors });
};
