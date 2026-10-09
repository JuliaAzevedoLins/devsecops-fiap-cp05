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

## Testes de sabotagem

As sabotagens ficam em branches separadas, para a `main` continuar verde:

| Branch | Sabotagem | Barreira esperada |
|---|---|---|
| `sabotagem/segredo` | `config.js` com chave AWS **falsa** | Gitleaks barra |
| `sabotagem/eval` | `calc.js` com `eval()` em entrada do usuário | Semgrep barra |

> ⚠️ Conteúdo exclusivamente educacional. Nenhuma credencial deste repositório é real.
