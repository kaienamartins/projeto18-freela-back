import { userSchema, loginSchema } from "../schemas/users.schema.js";

export async function signUpMiddleware(req, res, next) {
  const { name, email, profilePic, biography, password, confirmPassword } = req.body;

  try {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(422).json({ message: errors });
    }

    if (name === "" || name === undefined || name === null) {
      return res.status(422).json({ message: "O nome é obrigatório!" });
    } else if (email === "" || email === undefined || email === null) {
      return res.status(422).json({ message: "O email é obrigatório!" });
    } else if (password === "" || password === undefined || password === null) {
      return res.status(422).json({ message: "A senha é obrigatória!" });
    } else if (
      confirmPassword === "" ||
      confirmPassword === undefined ||
      confirmPassword === null
    ) {
      return res.status(422).json({ message: "A confirmação de senha é obrigatória!" });
    } else if (profilePic === "" || profilePic === undefined || profilePic === null) {
      return res.status(422).json({ message: "A imagem de perfil é obrigatória!" });
    } else if (biography === "" || biography === undefined || biography === null) {
      return res.status(422).json({ message: "A biografia é obrigatória!" });
    }

    const minPass = 6;
    if (password.length < minPass) {
      return res.status(422).json({ message: "A senha deve ter no mínimo 6 caracteres!" });
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email)) {
      return res.status(422).json({ message: "Forneça um email válido!" });
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ message: "As senhas não coincidem!" });
    }

    if (profilePic) {
      const profilePicReg = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
      if (!profilePicReg.test(profilePic)) {
        return res.status(422).json({ message: "Forneça uma URL de imagem válida!" });
      }
    }

    if (biography.length > 200) {
      return res.status(422).json({ message: "A biografia deve ter no máximo 200 caracteres!" });
    }

    res.locals.userData = { name, email, password, profilePic, biography };
    next();
  } catch (err) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function signInMiddleware(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: "Preencha todos os campos!" });
  }

  try {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(422).json({ message: errors });
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email)) {
      return res.status(422).json({ message: "Forneça um email válido!" });
    }

    req.locals = {
      loginData: { email, password },
    };

    next();
  } catch (err) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}
