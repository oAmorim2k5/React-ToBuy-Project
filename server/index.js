const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const bcryp = require ("bcrypt")
const saltRounds = 10;

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
            bcryp.hash(password, saltRounds, (err, hash) => {
                db.query("INSERT INTO usuarios (email_user, pass_user) VALUES (?, ?)", [email, hash], (err, result) => {
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
                    });
                    res.send({ msg: "Cadastrado com sucesso" });
                });
            })
        } else {
            res.send({ msg: "Usuário já cadastrado" });
        }
    });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuarios WHERE email_user = ?", [email], (err, result) => {
        if(err) {
            res.send(err);
        };
        if (result.length > 0) {
            bcryp.compare(password, result[0].pass_user, (err, result) => {
                if(result){
                    res.send({msg: "Usuário logado com sucesso"});
                } else {
                    res.send("Email ou Senha incorreto!")
                };
            });
        } else {
            res.send({msg: "Email não cadastrado"});
        };
    });
});

app.post("/update-username", (req, res) => {
    const email = req.body.email;
    const setUsername = req.body.username;
  
    db.query("SELECT id_user FROM tobuy.usuarios WHERE email_user = ?", [email], (err, result) => {
        if (err) {
            console.error("Erro ao buscar id:", err);
            return res.status(500).send("Erro ao buscar usuário.");
        }

        // Verifica se o usuário foi encontrado
        if (result.length === 0) {
            return res.status(404).send("Usuário não encontrado.");
        }

        // Se encontrado, obtém o id_user
        const id = result[0].id_user;

        // Atualiza o nome de usuário
        db.query("UPDATE tobuy.usuarios SET name_user = ? WHERE id_user = ?", [setUsername, id], (err, result) => {
            if (err) {
                console.error("Erro ao atualizar username:", err);
                return res.status(500).send("Erro ao atualizar nome de usuário.");
            }
            res.send({ msg: "Nome de usuário atualizado com sucesso!", username: setUsername });
        });
    });
});
app.listen(8800, () => {
    console.log(`Rodando na porta: 8800`);
});
