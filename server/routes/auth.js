const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/connection");
const router = express.Router();

const saltRounds = 10;

//Autenticação de registro
router.post("/register", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM usuarios WHERE email_user = ?", [email], (err, result) => {
        if (err) return res.status(500).send("Erro no servidor");
        if (result.length > 0) return res.status(400).send({ msg: "Usuário já cadastrado" });

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) return res.status(500).send("Erro ao processar senha");
            db.query("INSERT INTO usuarios (email_user, pass_user) VALUES (?, ?)", [email, hash], (err, result) => {
                if (err) return res.status(500).send("Erro ao salvar usuário");
                const userId = result.insertId;
                db.query("UPDATE usuarios SET name_user = ? WHERE id_user = ?", [`user_${userId}`, userId]);
                res.status(201).send({ msg: "Usuário cadastrado com sucesso" });
            });
        });
    });
});

//Atualização de nome de usuário ao cadastrar conta
router.post("/update-username", (req, res) => {
    const { email, username } = req.body;

    db.query("SELECT id_user FROM usuarios WHERE email_user = ?", [email], (err, result) => {
        if (err) return res.status(500).send("Erro no servidor");
        if (result.length === 0) return res.status(404).send({ msg: "Usuário não encontrado" });

        const userId = result[0].id_user;
        db.query("UPDATE usuarios SET name_user = ? WHERE id_user = ?", [username, userId], (err) => {
            if (err) return res.status(500).send("Erro ao atualizar nome de usuário");
            res.status(200).send({ msg: "Nome de usuário atualizado com sucesso" });
        });
    });
});

//Autenticação de login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM usuarios WHERE email_user = ?", [email], (err, result) => {
        if (err) return res.status(500).send("Erro no servidor");
        if (result.length === 0) return res.status(404).send({ msg: "Usuário não encontrado" });

        bcrypt.compare(password, result[0].pass_user, (err, match) => {
            if (err) return res.status(500).send("Erro ao verificar senha");
            if (!match) return res.status(401).send({ msg: "Senha incorreta" });
            res.status(200).send({ msg: "Login realizado com sucesso" });
        });
    });
});

//Verificando se email pode ser usado para cadastro
router.post("/email-isreleased", (req, res) => {
  const { email } = req.body;

  db.query(
    "SELECT email_user FROM usuarios WHERE email_user = ?",
    [email],
    (err, result) => {
      if (err) {
        console.error("Erro ao consultar o banco de dados:", err);
        return res.status(500).send({ msg: "Erro no servidor" });
      }

      if (result.length === 0) {
        return res.status(200).send({ msg: "Email liberado" }); 
      } else {
        return res.status(409).send({ msg: "Email já cadastrado" });
      }
    }
  );
});

module.exports = router;
