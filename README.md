# Fullstack Basic CRUD

Sistema completo de CRUD (Create, Read, Update, Delete) para posts com frontend React e backend Django REST API, configurado como microsserviços no Railway.

## 🌐 URLs para Teste
- **Frontend:** https://codeleap-basic-crud-test.up.railway.app/main
- **Backend:** https://codeleap-basic-crud-backend.up.railway.app/

## 🏗️ Arquitetura

```
fullstack-basic-crud/
├── frontend/          # React SPA
├── backend/          # Django REST API
└── README.md         # Este arquivo
```

### Tecnologias

**Frontend:**
- React 18
- Axios para requisições HTTP
- CSS personalizado
- Deploy estático no Railway

**Backend:**
- Django 5.2.5 + Django REST Framework
- Gunicorn como servidor WSGI
- Deploy como microsserviço no Railway

## 🚀 Funcionalidades

- ✅ **CRUD completo** de posts
- ✅ **Sistema de likes** por usuário
- ✅ **Sistema de comentários** aninhados
- ✅ **Interface responsiva** e intuitiva
- ✅ **API REST** padronizada
- ✅ **Deploy separado** frontend/backend
- ✅ **CORS habilitado** para comunicação entre serviços

## 📱 Demonstração

### Interface do Usuário
- **Dashboard** com listagem de posts
- **Formulário** para criar/editar posts
- **Sistema de likes** interativo
- **Comentários** em tempo real
- **Modais** para edição e exclusão

### API Endpoints
- `GET /careers/` - Listar posts
- `POST /careers/` - Criar post
- `PATCH /careers/{id}/` - Editar post
- `DELETE /careers/{id}/` - Deletar post
- `POST /careers/{id}/like/` - Toggle like
- `POST /careers/{id}/comments/` - Adicionar comentário
- `DELETE /careers/{id}/comments/{comment_id}/` - Deletar comentário

## 🛠️ Desenvolvimento Local

### Pré-requisitos
- Node.js 18+ (para frontend)
- Python 3.11+ (para backend)
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/fullstack-basic-crud.git
cd fullstack-basic-crud
```

### 2. Configurar Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend rodando em: `http://localhost:8000`

### 3. Configurar Frontend
```bash
cd frontend
npm install
npm start
```

Frontend rodando em: `http://localhost:3000`

### 4. Variáveis de Ambiente

**Backend (.env):**
```env
SECRET_KEY=sua-chave-secreta
DEBUG=true
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:8000/careers
```

## 🚀 Deploy no Railway

Este projeto está configurado para deploy automático como **dois microsserviços separados** no Railway.

### 🔧 Configuração Backend

1. **Conectar repositório** no Railway (pasta `backend/`)
2. **Configurar variáveis:**
   ```env
   SECRET_KEY=sua-chave-secreta-forte
   RAILWAY_ENVIRONMENT_NAME=production
   ```
3. **Banco PostgreSQL** - Provisionado automaticamente
4. **Deploy automático** - Via `railway.toml`

### 🎨 Configuração Frontend

1. **Conectar repositório** no Railway (pasta `frontend/`)
2. **Configurar variáveis:**
   ```env
   REACT_APP_API_URL=https://seu-backend.railway.app/careers
   ```
3. **Deploy automático** - Build + serve estático

### 📋 Ordem de Deploy

1. **Deploy backend primeiro** para obter URL
2. **Configurar** `REACT_APP_API_URL` no frontend
3. **Deploy frontend** com URL do backend configurada

## 🏛️ Estrutura do Projeto

```
fullstack-basic-crud/
│
├── backend/                    # Django REST API
│   ├── config/                # Configurações Django
│   │   ├── settings.py        # Settings otimizadas para Railway
│   │   ├── urls.py           # URLs principais
│   │   └── wsgi.py           # WSGI application
│   ├── posts/                 # App principal da API
│   │   ├── models.py         # Models (Post, Comment)
│   │   ├── views.py          # API views
│   │   ├── serializers.py    # DRF serializers
│   │   └── urls.py           # URLs da API
│   ├── railway.toml          # Configuração Railway
│   ├── requirements.txt      # Dependências Python
│   ├── .env.example         # Exemplo de variáveis
│   └── README.md            # Documentação da API
│
├── frontend/                   # React SPA
│   ├── public/               # Arquivos públicos
│   ├── src/                  # Código React
│   │   ├── components/       # Componentes React
│   │   ├── services/         # Configuração da API
│   │   └── App.js           # Componente principal
│   ├── railway.toml         # Configuração Railway
│   ├── package.json         # Dependências Node.js
│   └── .env.example        # Exemplo de variáveis
│
└── README.md                  # Documentação principal (este arquivo)
```

## 🔒 Segurança

- ✅ **Secrets** via variáveis de ambiente
- ✅ **CORS** configurado adequadamente
- ✅ **DEBUG** desabilitado em produção
- ✅ **Validações** de entrada na API
- ✅ **Tratamento de erros** padronizado

## 📊 Monitoramento

### Logs Estruturados
```
INFO 2025-01-19 10:30:00 [django.request] "GET /careers/ HTTP/1.1" 200
INFO 2025-01-19 10:31:15 [posts.views] Post created: id=123
```

### Métricas Railway
- CPU e memória em tempo real
- Requests por minuto
- Logs centralizados
- Restart automático em falhas

## 🔄 CI/CD

**Deploy Automático:**
- Push para `main` → Deploy automático
- Rollback em caso de falha
- Zero downtime deployment

**Ambientes:**
- **Desenvolvimento:** `localhost`
- **Produção:** `railway.app`

## 🤝 Contribuição

### Workflow
1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Faça suas alterações
4. Teste localmente frontend e backend
5. Commit: `git commit -m 'feat: adicionar nova feature'`
6. Push: `git push origin feature/nova-feature`
7. Abra um Pull Request

### Padrões de Commit
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes

## 📝 Roadmap

### ✅ Concluído
- [x] CRUD básico de posts
- [x] Sistema de likes
- [x] Sistema de comentários
- [x] Deploy Railway
- [x] Documentação completa

### 🔄 Em Desenvolvimento
- [ ] Autenticação de usuários
- [ ] Upload de imagens
- [ ] Busca e filtros
- [ ] Paginação

### 🐛 Bugs Conhecidos
- [ ] **Sistema de menções**: Não é possível mencionar usuários com nomes compostos (mais de uma palavra)
  - Problema: O sistema de detecção de @ só funciona com usernames sem espaços
  - Impacto: Usuários com nomes como "João Silva" não podem ser mencionados corretamente
  - Localização: `frontend/src/components/MentionInput.js`

### 🚀 Futuro
- [ ] Notificações em tempo real
- [ ] Sistema de tags
- [ ] API versioning
- [ ] Testes automatizados

## 📞 Suporte

### Problemas Comuns

**Frontend não conecta com backend:**
```bash
# Verificar se REACT_APP_API_URL está correto
echo $REACT_APP_API_URL
```

**Erro CORS:**
```bash
# Backend deve estar rodando e acessível
curl -I https://seu-backend.railway.app/careers/
```

**Deploy falha:**
```bash
# Verificar logs no Railway dashboard
railway logs
```

### Links Úteis
- [Documentação Backend](./backend/README.md)
- [Documentação Frontend](./frontend/README.md)
- [Railway Documentation](https://docs.railway.app)
- [Django REST Framework](https://www.django-rest-framework.org)
- [React Documentation](https://react.dev)
