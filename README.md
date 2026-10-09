# devsecops-fiap-cp05

- **Aluna:** JULIA AZEVEDO LINS
- **RM:** 98690
- **Turma:** 4ESPY

CP05 de DevSecOps e Cloud Computing (FIAP): **o pipeline DevSecOps completo**.

## Estrutura

- `site/`: site estático (HTML + CSS).
- `Dockerfile`: empacota o site em `nginx-unprivileged` (sem root, porta 8080).
- `.github/workflows/security.yml`: pipeline **Security Pipeline** com 3 jobs:
  - **gitleaks**: secret scanning com a `gitleaks-action` (fixada por SHA).
  - **semgrep**: SAST com o ruleset `p/default` (`semgrep ci`); falha se houver achado bloqueante.
  - **trivy**: faz o build da imagem e falha se houver CVE **CRITICAL** com correção disponível. Só roda se as duas primeiras barreiras passarem.

## Rodando o site

```bash
docker build -t arcanjosa-site .
docker run -p 8080:8080 arcanjosa-site
```

## Testes de sabotagem (evidências)

As sabotagens ficam em branches separadas, para a `main` continuar verde:

| Branch | Sabotagem | Resultado | Execução |
|---|---|---|---|
| `main` (1º push) | `actions/checkout@v4` com tag mutável | ❌ Semgrep barrou (`github-actions-mutable-action-tag`); corrigido fixando o SHA | [run #1](https://github.com/JuliaAzevedoLins/devsecops-fiap-cp05/actions/runs/38001834604) |
| `main` | Pipeline corrigido | ✅ gitleaks, semgrep e trivy passaram (`Total: 0 (CRITICAL: 0)`) | [run #2](https://github.com/JuliaAzevedoLins/devsecops-fiap-cp05/actions/runs/38001905300) |
| `sabotagem/segredo` | `config.js` com chave AWS **falsa** | ❌ Gitleaks barrou (`aws-access-token` em `config.js:1`); o Semgrep também apontou | [run #3](https://github.com/JuliaAzevedoLins/devsecops-fiap-cp05/actions/runs/38002000059) |
| `sabotagem/eval` | `calc.js` com `eval(req.query.expr)` | ❌ Semgrep barrou (`eval-detected`, `code-string-concat` + XSS e CSRF) | [run #4](https://github.com/JuliaAzevedoLins/devsecops-fiap-cp05/actions/runs/38002005195) |
| `sabotagem/imagem` | Imagem base `nginx:1.16-alpine` (2020) | ❌ Trivy barrou: `CVE-2021-36159` e `CVE-2020-15999` (CRITICAL) | [run #5](https://github.com/JuliaAzevedoLins/devsecops-fiap-cp05/actions/runs/38002087020) |

> ⚠️ Conteúdo exclusivamente educacional. Nenhuma credencial deste repositório é real.
