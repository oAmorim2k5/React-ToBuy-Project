const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    hostname: "localhost",
    user: "root",
    password: "!008976Vvt",
    database: "tobuy",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM tobuy.usuarios WHERE email_user = ?", [email], (err, result) => {
        if (err) {
            console.error("Erro ao consultar o banco de dados:", err);
            return res.status(500).send(err);
        }
        if (result.length == 0) {
            db.query("INSERT INTO usuarios (email_user, pass_user) VALUES (?, ?)", [email, password], (err, result) => {
                if (err) {
                    console.error("Erro ao inserir dados no banco:", err);
                    return res.status(500).send(err);
                }
                
                const newUserId = result.insertId;
                const newNameUser = `user_${newUserId}`;

                db.query("UPDATE usuarios SET name_user = ? WHERE id_user = ?", [newNameUser, newUserId], (err, result) => {
                    if (err) {
                        console.error("Erro ao atualizar name_user:", err);
                        return res.status(500).send(err);
                    }
                    console.log("name_user atualizado para:", newNameUser);
                });

                res.send({ msg: "Cadastrado com sucesso" });
            });
        } else {
            res.send({ msg: "Usuário já cadastrado" });
        }
    });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuarios WHERE email_user AND pass_user = ?", [email, password], (err, result) => {
        if(err) {
            res.send(err);
        }
        if (result.length > 0) {
            res.send({msg: "Usuário logado com sucesso"});
        } else {
            res.send({msg: "Conta não encontrada"});
        }
    });
});

app.listen(8800, () => {
    console.log(`Rodando na porta: 8800`);
});
