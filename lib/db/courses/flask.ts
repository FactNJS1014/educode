import type { SeedCourseData } from '../seed-data';

export const flaskCourseData: SeedCourseData = {
  course: {
    id: 'course-flask',
    slug: 'flask-framework',
    title: 'Flask Microframework & Python Web APIs',
    description: 'Master Flask routing, Blueprints, SQLAlchemy ORM, Marshmallow serialization, JWT Authentication, and Celery tasks.',
    technology: 'Flask',
    category: 'Web Development',
    level: 'INTERMEDIATE',
    estimatedHours: 25,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  chapters: [
    {
      id: 'chap-flask-1',
      courseId: 'course-flask',
      title: 'Flask Core & Blueprints',
      description: 'Flask app factory, routing, request/response cycle, Jinja2, and blueprints.',
      order: 1,
      level: 'BASIC',
      lessons: [
        {
          id: 'les-flask-1',
          chapterId: 'chap-flask-1',
          slug: 'flask-app-factory-and-architecture',
          title: 'Flask App Factory Pattern & WSGI Lifecycle',
          description: 'create_app() factory, Flask configuration objects, and WSGI environment.',
          duration: 15,
          order: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Master the application factory pattern for clean Flask application instantiation.

\`\`\`python
from flask import Flask

def create_app():
    app = Flask(__name__)
    
    @app.route('/')
    def index():
        return {"message": "Welcome to Flask on EduCode Academy!"}
        
    return app
\`\`\`
`,
        },
        {
          id: 'les-flask-2',
          chapterId: 'chap-flask-1',
          slug: 'routing-url-converters-and-http-methods',
          title: 'Routing, URL Converters (<int:id>) & HTTP Verbs',
          description: '@app.route with methods=["GET", "POST"], string, int, float, path converters.',
          duration: 15,
          order: 2,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Define parameterized endpoints with typed URL converters.
`,
        },
        {
          id: 'les-flask-3',
          chapterId: 'chap-flask-1',
          slug: 'request-and-response-objects',
          title: 'Request Object, JSON Payloads & jsonify Responses',
          description: 'request.args, request.get_json(), request.headers, and make_response.',
          duration: 20,
          order: 3,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Parse JSON payloads and return customized HTTP response codes.
`,
        },
        {
          id: 'les-flask-4',
          chapterId: 'chap-flask-1',
          slug: 'modular-blueprints-architecture',
          title: 'Modular Blueprints & Route Organization',
          description: 'Blueprint registration with url_prefix, separating auth, api, and admin routes.',
          duration: 20,
          order: 4,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Organize large Flask codebases into decoupled Blueprints.
`,
        },
        {
          id: 'les-flask-5',
          chapterId: 'chap-flask-1',
          slug: 'jinja2-templating-and-filters',
          title: 'Jinja2 Templating, Template Inheritance & Filters',
          description: '{% extends %}, {% block %}, custom Jinja filters, and url_for() helper.',
          duration: 20,
          order: 5,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Render dynamic server-side HTML layouts with Jinja2.
`,
        },
      ],
    },
    {
      id: 'chap-flask-2',
      courseId: 'course-flask',
      title: 'Database & Flask-SQLAlchemy',
      description: 'SQLAlchemy ORM models, migrations with Flask-Migrate, relationships, and queries.',
      order: 2,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-flask-6',
          chapterId: 'chap-flask-2',
          slug: 'flask-sqlalchemy-configuration-and-models',
          title: 'Flask-SQLAlchemy Setup & Model Declarations',
          description: 'db.Model, Column types (Integer, String, DateTime), primary keys, and constraints.',
          duration: 25,
          order: 6,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Declare relational database models using Flask-SQLAlchemy.
`,
        },
        {
          id: 'les-flask-7',
          chapterId: 'chap-flask-2',
          slug: 'database-migrations-with-flask-migrate',
          title: 'Database Schema Migrations with Flask-Migrate (Alembic)',
          description: 'flask db init, flask db migrate, flask db upgrade, and schema rollbacks.',
          duration: 20,
          order: 7,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Track and apply database migrations safely.
`,
        },
        {
          id: 'les-flask-8',
          chapterId: 'chap-flask-2',
          slug: 'sqlalchemy-relationships-1-to-many',
          title: 'Model Relationships: One-to-Many & db.relationship()',
          description: 'ForeignKey, backref/back_populates, and cascade deletes.',
          duration: 25,
          order: 8,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Model parent-child relationships like Courses to Lessons.
`,
        },
        {
          id: 'les-flask-9',
          chapterId: 'chap-flask-2',
          slug: 'many-to-many-associations',
          title: 'Many-to-Many Relationships & Association Tables',
          description: 'db.Table helper, secondary table linking, and querying many-to-many relationships.',
          duration: 25,
          order: 9,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Manage enrollments and user-tag associations.
`,
        },
        {
          id: 'les-flask-10',
          chapterId: 'chap-flask-2',
          slug: 'querying-filtering-and-pagination',
          title: 'Querying, Filtering, Sorting & Pagination (.paginate())',
          description: 'db.select(), filter_by(), order_by(), and Flask-SQLAlchemy pagination objects.',
          duration: 25,
          order: 10,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Paginate large query results efficiently.
`,
        },
      ],
    },
    {
      id: 'chap-flask-3',
      courseId: 'course-flask',
      title: 'Validation, Serialization & Auth',
      description: 'Marshmallow schemas, Flask-JWT-Extended, password hashing, and error handlers.',
      order: 3,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-flask-11',
          chapterId: 'chap-flask-3',
          slug: 'marshmallow-schema-validation',
          title: 'Serialization & Validation with Flask-Marshmallow',
          description: 'Schema definition, load() validation, dump() serialization, and custom field validators.',
          duration: 25,
          order: 11,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Validate incoming API payloads and format JSON outputs with Marshmallow.
`,
        },
        {
          id: 'les-flask-12',
          chapterId: 'chap-flask-3',
          slug: 'jwt-authentication-with-flask-jwt-extended',
          title: 'JWT Authentication with Flask-JWT-Extended',
          description: 'create_access_token, @jwt_required(), get_jwt_identity(), and refresh token flows.',
          duration: 25,
          order: 12,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Secure REST endpoints with signed JWT tokens.
`,
        },
        {
          id: 'les-flask-13',
          chapterId: 'chap-flask-3',
          slug: 'password-hashing-with-werkzeug',
          title: 'Password Hashing: generate_password_hash & check_password_hash',
          description: 'Salt generation, scrypt/pbkdf2 hashing, and user credential verification.',
          duration: 20,
          order: 13,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Store passwords securely in PostgreSQL.
`,
        },
        {
          id: 'les-flask-14',
          chapterId: 'chap-flask-3',
          slug: 'custom-error-handlers-and-abort',
          title: 'Global Error Handling (@app.errorhandler) & abort()',
          description: 'Custom JSON error format, HTTPException handling, and 404/500 catch-alls.',
          duration: 20,
          order: 14,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Standardize API error responses across the entire application.
`,
        },
        {
          id: 'les-flask-15',
          chapterId: 'chap-flask-3',
          slug: 'cors-and-security-headers',
          title: 'CORS Configuration (Flask-CORS) & Security Headers (Talisman)',
          description: 'Configuring allowed origins, headers, and HTTPS enforcement with Flask-Talisman.',
          duration: 20,
          order: 15,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Prevent cross-origin request issues and harden headers.
`,
        },
      ],
    },
    {
      id: 'chap-flask-4',
      courseId: 'course-flask',
      title: 'Background Tasks, Testing & Production',
      description: 'Celery, Redis, Pytest, Gunicorn, and Docker deployment.',
      order: 4,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-flask-16',
          chapterId: 'chap-flask-4',
          slug: 'background-tasks-with-celery-and-redis',
          title: 'Asynchronous Tasks with Celery & Redis',
          description: 'Task decorators, delay() dispatch, task status inspection, and worker execution.',
          duration: 30,
          order: 16,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Run long-running jobs (emails, report generation) in the background.
`,
        },
        {
          id: 'les-flask-17',
          chapterId: 'chap-flask-4',
          slug: 'file-uploads-and-cloud-storage',
          title: 'Secure File Uploads & S3 Bucket Integration (boto3)',
          description: 'secure_filename, checking file extensions, and streaming uploads to AWS S3.',
          duration: 25,
          order: 17,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Upload user attachments securely to cloud object storage.
`,
        },
        {
          id: 'les-flask-18',
          chapterId: 'chap-flask-4',
          slug: 'caching-with-flask-caching',
          title: 'Response & Function Caching with Flask-Caching',
          description: 'Cache types (Redis, Simple), @cache.cached(), and cache invalidation.',
          duration: 20,
          order: 18,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Cache heavy database endpoints in Redis.
`,
        },
        {
          id: 'les-flask-19',
          chapterId: 'chap-flask-4',
          slug: 'automated-testing-with-pytest',
          title: 'Automated API Testing with Pytest & Test Client',
          description: 'pytest fixtures (app, client, db_session), mocking external APIs, and asserting JSON keys.',
          duration: 25,
          order: 19,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write robust integration tests with Pytest and the Flask test client.
`,
        },
        {
          id: 'les-flask-20',
          chapterId: 'chap-flask-4',
          slug: 'logging-and-application-monitoring',
          title: 'Structured Logging & Sentry Monitoring',
          description: 'Python logging module, rotating file handlers, and Sentry error tracking.',
          duration: 20,
          order: 20,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Monitor live errors and track request performance.
`,
        },
        {
          id: 'les-flask-21',
          chapterId: 'chap-flask-4',
          slug: 'production-wsgi-with-gunicorn',
          title: 'Production WSGI Deployment with Gunicorn',
          description: 'Gunicorn worker types (sync, gevent), worker concurrency calculation, and bind sockets.',
          duration: 25,
          order: 21,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Run Flask behind Gunicorn WSGI server in production.
`,
        },
        {
          id: 'les-flask-22',
          chapterId: 'chap-flask-4',
          slug: 'dockerfile-and-container-deployment',
          title: 'Production Docker Containerization & Multi-Stage Builds',
          description: 'Alpine Python Dockerfile, non-root user security, and docker-compose orchestration.',
          duration: 25,
          order: 22,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Deploy Flask microservices into production containers.
`,
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-flask-1',
      courseId: 'course-flask',
      title: 'Microservices REST API with SQLAlchemy & JWT',
      description: 'Build a production Flask REST service with PostgreSQL, Flask-Migrate, JWT authentication, and Pytest.',
      difficulty: 'INTERMEDIATE',
      estimatedHours: 10,
      techStack: ['Python 3.12', 'Flask', 'SQLAlchemy', 'PostgreSQL', 'Pytest'],
      steps: [
        {
          id: 'step-flask-1',
          projectId: 'proj-flask-1',
          title: '1. App Factory & Database Setup',
          description: 'Configure create_app() and SQLAlchemy instance.',
          order: 1,
          content: 'Setup virtual environment and requirements.txt.',
        },
      ],
    },
  ],
};
