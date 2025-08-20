# Posts API - Backend Microservice

API REST para gerenciamento de posts com comentários e likes, configurada como microsserviço no Railway.

## 🚀 Tecnologias

- **Django 5.2.5** - Framework web
- **Django REST Framework** - API REST
- **PostgreSQL** - Banco de dados (produção)
- **SQLite** - Banco de dados (desenvolvimento)
- **Gunicorn** - Servidor WSGI
- **Railway** - Deploy e hospedagem

## 📋 Funcionalidades

- ✅ CRUD completo de posts
- ✅ Sistema de likes por usuário
- ✅ Sistema de comentários
- ✅ API REST padronizada
- ✅ CORS habilitado para todos os domínios
- ✅ Configuração automática para Railway

## 🔗 Endpoints da API

Base URL: `https://seu-backend.railway.app`

### Health Check

#### Verificar status da API
```bash
curl -X GET http://localhost:8000/
```

**Resposta (200 OK):**
```json
{
  "active": true,
  "data_verificacao": "2025-08-20"
}
```

### Posts - Base URL: `/careers/`

#### Listar todos os posts
```bash
curl -X GET http://localhost:8000/careers/
```

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "username": "maria_silva",
    "created_datetime": "2025-08-20T10:30:00Z",
    "title": "Como melhorar a produtividade no trabalho",
    "content": "Compartilho aqui algumas estratégias que têm funcionado muito bem para mim...",
    "likes": ["joao_santos", "ana_costa"],
    "likes_count": 2,
    "comments_count": 3,
    "comments": [
      {
        "id": 1,
        "username": "joao_santos",
        "text": "Muito bom o post! Obrigado por compartilhar.",
        "created_datetime": "2025-08-20T11:00:00Z"
      }
    ]
  }
]
```

#### Criar novo post
```bash
curl -X POST http://localhost:8000/careers/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "pedro_oliveira",
    "title": "Dicas de programação para iniciantes",
    "content": "Para quem está começando a programar, é importante focar nos fundamentos..."
  }'
```

**Resposta (201 Created):**
```json
{
  "id": 2,
  "username": "pedro_oliveira",
  "created_datetime": "2025-08-20T14:15:00Z",
  "title": "Dicas de programação para iniciantes",
  "content": "Para quem está começando a programar, é importante focar nos fundamentos...",
  "likes": [],
  "likes_count": 0,
  "comments_count": 0,
  "comments": []
}
```

#### Buscar post específico
```bash
curl -X GET http://localhost:8000/careers/1/
```

#### Atualizar post
```bash
curl -X PATCH http://localhost:8000/careers/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Como melhorar MUITO a produtividade no trabalho",
    "content": "Compartilho aqui algumas estratégias ATUALIZADAS que têm funcionado..."
  }'
```

#### Deletar post
```bash
curl -X DELETE http://localhost:8000/careers/1/
```

**Resposta (204 No Content)**

### Likes

#### Toggle like/unlike
```bash
curl -X POST http://localhost:8000/careers/1/like/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "carlos_mendes"
  }'
```

**Resposta (200 OK):** Retorna o post atualizado com likes atualizados

### Comentários

#### Adicionar comentário
```bash
curl -X POST http://localhost:8000/careers/1/comments/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "sofia_martins",
    "text": "Excelente conteúdo, vou aplicar essas dicas!"
  }'
```

**Resposta (201 Created):**
```json
{
  "id": 4,
  "username": "sofia_martins",
  "text": "Excelente conteúdo, vou aplicar essas dicas!",
  "created_datetime": "2025-08-20T15:45:00Z"
}
```

#### Deletar comentário
```bash
curl -X DELETE http://localhost:8000/careers/1/comments/4/
```

**Resposta (204 No Content)**

## 📋 Códigos de Status HTTP

- **200 OK**: Requisição bem-sucedida
- **201 Created**: Recurso criado com sucesso
- **204 No Content**: Recurso deletado com sucesso
- **400 Bad Request**: Dados inválidos enviados
- **404 Not Found**: Recurso não encontrado

## 📊 Estrutura dos Dados

### Post
```json
{
  "id": "number",
  "username": "string",
  "created_datetime": "datetime",
  "title": "string",
  "content": "string",
  "likes": ["array of usernames"],
  "likes_count": "number",
  "comments_count": "number",
  "comments": ["array of comment objects"]
}
```

### Comment
```json
{
  "id": "number",
  "username": "string",
  "text": "string",
  "created_datetime": "datetime"
}
```

## 🔧 Configuração Local

### Pré-requisitos
- Python 3.11+
- pip

### Instalação
```bash
cd backend
pip install -r requirements.txt
```

### Variáveis de Ambiente
Copie `.env.example` para `.env` e configure:

```env
SECRET_KEY=sua-chave-secreta
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3  # ou PostgreSQL
```

### Executar Localmente
```bash
python manage.py migrate
python manage.py runserver
```

API disponível em: `http://localhost:8000/careers/`

## 🚀 Deploy no Railway

### Configuração Automática
O projeto está configurado para deploy automático no Railway com:

- **Detecção de ambiente** automática
- **Configurações de produção** otimizadas
- **Pool de conexões** de banco de dados
- **4 workers Gunicorn** para performance
- **Logs estruturados** para microsserviços

### Variáveis Necessárias no Railway

```env
SECRET_KEY=sua-chave-secreta-forte
DATABASE_URL=postgresql://...  # Provisionado automaticamente
```

### Deploy
1. Conecte o repositório no Railway
2. Configure as variáveis de ambiente
3. Deploy automático será executado

## 📦 Estrutura do Projeto

```
backend/
├── config/          # Configurações Django
│   ├── settings.py  # Settings otimizadas para microsserviço
│   ├── urls.py      # URLs principais
│   └── wsgi.py      # WSGI application
├── posts/           # App principal
│   ├── models.py    # Models (Post, Comment)
│   ├── views.py     # API views
│   ├── serializers.py # DRF serializers
│   └── urls.py      # URLs da API
├── railway.toml     # Configuração Railway
├── requirements.txt # Dependências
└── .env.example     # Exemplo de variáveis
```

## 🛡️ Segurança

- ✅ CORS configurado para aceitar todos os domínios
- ✅ DEBUG desabilitado em produção
- ✅ Secret key via variável de ambiente
- ✅ Validações de entrada nos serializers
- ✅ Tratamento de erros padronizado

## 📊 Monitoramento

### Logs
O sistema gera logs estruturados:
```
INFO 2025-01-19 10:30:00 [django.request] "GET /careers/ HTTP/1.1" 200
```

### Health Check
Endpoint disponível em: `/` - Verifica se a API está ativa

## 🔄 Versionamento

**Versão atual:** 1.0.0  
**API Version:** v1

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adicionar nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Changelog

### v1.0.0 (2025-01-19)
- ✅ API REST completa
- ✅ Sistema de posts, likes e comentários
- ✅ Configuração para Railway
- ✅ Microsserviço otimizado