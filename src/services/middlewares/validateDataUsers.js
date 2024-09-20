export const validateUserRegisterData = (req, res, next) => {
  const { first_name, last_name, date, tel, email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^+&*-])[A-Za-z\d!@#$%^&*]{8,}$/;

  if (!first_name || !last_name || !date || !tel || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }
  if (typeof first_name !== "string" || first_name.trim() === "") {
    return res.status(400).json({ error: "El nombre es invalido." });
  }
  if (typeof last_name !== "string" || last_name.trim() === "") {
    return res.status(400).json({ error: "El apellido es invalido." });
  }
  if (typeof date !== "string" || date.trim() === "") {
    return res.status(400).json({ error: "El apellido es invalido." });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Ingrese un email valido." });
  }

  next();
};
