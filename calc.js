// CODIGO PROPOSITALMENTE VULNERAVEL - sabotagem 2 do CP05 (deve ser apontado pelo Semgrep)
const express = require("express");
const app = express();

// Code Injection: eval() executa qualquer JavaScript enviado pelo usuario
// Ex.: /calc?expr=require('child_process').execSync('cat /etc/passwd')
app.get("/calc", (req, res) => {
  const resultado = eval(req.query.expr);
  res.send(String(resultado));
});

app.listen(3000);
