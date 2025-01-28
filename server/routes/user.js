const express = require("express");
const db = require("../db/connection");
const router = express.Router();

//busca de todos os dados do usuário
router.post("/user-data", (req, res) => {
    const { email } = req.body;

    db.query("SELECT * FROM usuarios WHERE email_user = ?", [email], (err, result) => {
        if (err) return res.status(500).send("Erro no servidor");
        if (result.length === 0) return res.status(404).send({ msg: "Usuário não encontrado" });
        res.status(200).json(result[0]);
    });
});

module.exports = router;
