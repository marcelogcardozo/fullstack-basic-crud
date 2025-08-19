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

Base URL: `https://seu-backend.railway.app/careers`

### Posts

#### Listar todos os posts
```http
GET /
```

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "username": "joao",
    "title": "Meu primeiro post",
    "content": "Conteúdo do post...",
    "created_datetime": "2025-01-19T10:30:00Z",
    "likes": ["maria", "pedro"],
    "likes_count": 2,
    "comments_count": 3,
    "comments": [
      {
        "id": 1,
        "username": "maria",
        "text": "Ótimo post!",
        "created_datetime": "2025-01-19T11:00:00Z"
      }
    ]
  }
]
```

#### Criar novo post
```http
POST /
Content-Type: application/json

{
  "username": "joao",
  "title": "Título do post",
  "content": "Conteúdo do post..."
}
```

**Resposta (201 Created):**
```json
{
  "id": 2,
  "username": "joao",
  "title": "Título do post",
  "content": "Conteúdo do post...",
  "created_datetime": "2025-01-19T12:00:00Z",
  "likes": [],
  "likes_count": 0,
  "comments_count": 0,
  "comments": []
}
```

#### Buscar post específico
```http
GET /{id}/
```

#### Atualizar post
```http
PATCH /{id}/
Content-Type: application/json

{
  "title": "Novo título",
  "content": "Novo conteúdo..."
}
```

#### Deletar post
```http
DELETE /{id}/
```

**Resposta (204 No Content)**

### Likes

#### Toggle like/unlike
```http
POST /{id}/like/
Content-Type: application/json

{
  "username": "maria"
}
```

**Resposta (200 OK):** Retorna o post atualizado

### Comentários

#### Adicionar comentário
```http
POST /{id}/comments/
Content-Type: application/json

{
  "username": "pedro",
  "text": "Excelente post!"
}
```

**Resposta (201 Created):**
```json
{
  "id": 2,
  "username": "pedro",
  "text": "Excelente post!",
  "created_datetime": "2025-01-19T13:00:00Z"
}
```

#### Deletar comentário
```http
DELETE /{id}/comments/{comment_id}/
```

**Resposta (204 No Content)**

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
Endpoint disponível em: `/admin/` (se habilitado)

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