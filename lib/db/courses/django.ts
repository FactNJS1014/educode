import type { SeedCourseData } from '../seed-data';

export const djangoCourseData: SeedCourseData = {
  course: {
    id: 'course-django',
    slug: 'django-framework',
    title: 'Django 5 Enterprise Web Architecture',
    description: 'Master Django MVT, ORM, Django REST Framework (DRF), Authentication, Admin customization, Celery, and Channels.',
    technology: 'Django',
    category: 'Web Development',
    level: 'INTERMEDIATE',
    estimatedHours: 40,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  chapters: [
    {
      id: 'chap-dj-1',
      courseId: 'course-django',
      title: 'Django 5 MVT Architecture & Project Setup',
      description: 'django-admin, apps architecture, settings.py, urls.py, views, and templates.',
      order: 1,
      level: 'BASIC',
      lessons: [
        {
          id: 'les-dj-1',
          chapterId: 'chap-dj-1',
          slug: 'django-architecture-and-mvt',
          title: 'Django 5 Architecture & Model-View-Template (MVT)',
          description: 'django-admin startproject, manage.py startapp, settings configuration, and ASGI/WSGI.',
          duration: 20,
          order: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Master Django's batteries-included MVT design pattern.

\`\`\`python
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to Django 5 on EduCode Academy!")
\`\`\`
`,
        },
        {
          id: 'les-dj-2',
          chapterId: 'chap-dj-1',
          slug: 'url-dispatcher-and-path-converters',
          title: 'URL Dispatcher, Path Converters & Namespaces',
          description: 'path(), re_path(), include(), app_name namespaces, and reverse() URL resolution.',
          duration: 15,
          order: 2,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Organize modular URL configurations across apps.
`,
        },
        {
          id: 'les-dj-3',
          chapterId: 'chap-dj-1',
          slug: 'function-based-vs-class-based-views',
          title: 'Function-Based Views (FBV) vs Class-Based Views (CBV)',
          description: 'TemplateView, ListView, DetailView, CreateView, UpdateView, and DeleteView.',
          duration: 20,
          order: 3,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Leverage generic Class-Based Views to eliminate CRUD boilerplate.
`,
        },
        {
          id: 'les-dj-4',
          chapterId: 'chap-dj-1',
          slug: 'django-templates-and-template-tags',
          title: 'Django Template Language (DTL) & Custom Tags',
          description: 'Template inheritance, template filters (|date), custom template tags, and staticfiles.',
          duration: 20,
          order: 4,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Render dynamic server templates with DTL inheritance.
`,
        },
        {
          id: 'les-dj-5',
          chapterId: 'chap-dj-1',
          slug: 'django-middleware-pipeline',
          title: 'Django Middleware Pipeline & Custom Middleware',
          description: '__call__, process_view, process_exception, and request/response hooks.',
          duration: 20,
          order: 5,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Intercept incoming HTTP requests with custom middleware.
`,
        },
      ],
    },
    {
      id: 'chap-dj-2',
      courseId: 'course-django',
      title: 'Django ORM & Database Mastery',
      description: 'Models, migrations, querysets, F/Q expressions, and relationships.',
      order: 2,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-dj-6',
          chapterId: 'chap-dj-2',
          slug: 'django-models-and-field-types',
          title: 'Django Models, Field Types & Meta Options',
          description: 'CharField, IntegerField, BooleanField, DateTimeField, db_index, and unique_together.',
          duration: 25,
          order: 6,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Model application schemas with Django's powerful ORM.
`,
        },
        {
          id: 'les-dj-7',
          chapterId: 'chap-dj-2',
          slug: 'migrations-makemigrations-and-migrate',
          title: 'Migrations Workflow: makemigrations, migrate & squash',
          description: 'Tracking schema changes, custom data migrations with RunPython, and rolling back.',
          duration: 20,
          order: 7,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Manage versioned database migrations and write custom data seeders.
`,
        },
        {
          id: 'les-dj-8',
          chapterId: 'chap-dj-2',
          slug: 'orm-relationships-foreignkey-and-m2m',
          title: 'Relationships: ForeignKey, ManyToManyField & OneToOneField',
          description: 'on_delete=CASCADE/PROTECT, related_name, through models for pivot tables.',
          duration: 25,
          order: 8,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Design relational structures and traverse relationships cleanly.
`,
        },
        {
          id: 'les-dj-9',
          chapterId: 'chap-dj-2',
          slug: 'queryset-optimization-select-related-prefetch',
          title: 'QuerySet Optimization: select_related & prefetch_related',
          description: 'Eliminating N+1 queries, SQL JOINs vs separate queries with Python caching.',
          duration: 30,
          order: 9,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Optimize database performance and query counts.
`,
        },
        {
          id: 'les-dj-10',
          chapterId: 'chap-dj-2',
          slug: 'advanced-queries-q-and-f-expressions',
          title: 'Advanced Queries: Q Objects, F Expressions & Aggregation',
          description: 'Complex OR queries with Q, atomic in-database updates with F(), and Count/Sum annotations.',
          duration: 25,
          order: 10,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Execute atomic field increments and complex queries using \`F()\` and \`Q()\`.
`,
        },
      ],
    },
    {
      id: 'chap-dj-3',
      courseId: 'course-django',
      title: 'Django REST Framework (DRF)',
      description: 'Serializers, ViewSets, Routers, JWT Authentication, and Permissions.',
      order: 3,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-dj-11',
          chapterId: 'chap-dj-3',
          slug: 'drf-serializers-and-modelserializers',
          title: 'DRF Serializers & ModelSerializers',
          description: 'Serializing QuerySets to JSON, deserialization validation, and SerializerMethodField.',
          duration: 25,
          order: 11,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Transform complex ORM models into clean JSON schemas with DRF.
`,
        },
        {
          id: 'les-dj-12',
          chapterId: 'chap-dj-3',
          slug: 'api-views-and-viewsets',
          title: 'APIView, GenericAPIView, ModelViewSet & Routers',
          description: 'DefaultRouter, @action decorator for custom endpoints, and RESTful routing.',
          duration: 25,
          order: 12,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build full CRUD REST APIs in seconds with \`ModelViewSet\`.
`,
        },
        {
          id: 'les-dj-13',
          chapterId: 'chap-dj-3',
          slug: 'drf-authentication-and-simplejwt',
          title: 'DRF Authentication: JWT with djangorestframework-simplejwt',
          description: 'TokenObtainPairView, TokenRefreshView, and JWT token rotation.',
          duration: 25,
          order: 13,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Implement JWT authentication with refresh token rotation.
`,
        },
        {
          id: 'les-dj-14',
          chapterId: 'chap-dj-3',
          slug: 'permissions-and-throttling',
          title: 'Permissions (IsAuthenticated, IsAdminUser) & Throttling',
          description: 'Custom permission classes (BasePermission.has_object_permission), ScopedRateThrottle.',
          duration: 25,
          order: 14,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Enforce object-level permission policies on API resources.
`,
        },
        {
          id: 'les-dj-15',
          chapterId: 'chap-dj-3',
          slug: 'drf-filtering-searching-and-pagination',
          title: 'Filtering (django-filter), SearchFilter & OrderingFilter',
          description: 'PageNumberPagination, LimitOffsetPagination, and search across multiple model fields.',
          duration: 20,
          order: 15,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Add instant search and filter capabilities to API endpoints.
`,
        },
      ],
    },
    {
      id: 'chap-dj-4',
      courseId: 'course-django',
      title: 'Admin, Celery, Real-Time & Production',
      description: 'Admin customization, Celery async tasks, Channels WebSockets, Pytest, and Docker.',
      order: 4,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-dj-16',
          chapterId: 'chap-dj-4',
          slug: 'django-admin-customization',
          title: 'Customizing the Django Admin Interface',
          description: 'ModelAdmin, list_display, list_filter, search_fields, inline formsets, and custom admin actions.',
          duration: 25,
          order: 16,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Turn the Django admin into a powerful internal backoffice tool.
`,
        },
        {
          id: 'les-dj-17',
          chapterId: 'chap-dj-4',
          slug: 'custom-user-model-and-signals',
          title: 'Custom User Model (AbstractUser) & Django Signals',
          description: 'AUTH_USER_MODEL configuration, post_save signals, and decoupling notifications.',
          duration: 25,
          order: 17,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Implement email-based custom user models and event triggers.
`,
        },
        {
          id: 'les-dj-18',
          chapterId: 'chap-dj-4',
          slug: 'async-tasks-with-celery-and-redis',
          title: 'Asynchronous Tasks & Scheduling with Celery + Redis',
          description: 'Celery worker setup, celery beat cron scheduler, and task status tracking.',
          duration: 30,
          order: 18,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Run heavy background tasks asynchronously with Celery.
`,
        },
        {
          id: 'les-dj-19',
          chapterId: 'chap-dj-4',
          slug: 'real-time-websockets-with-django-channels',
          title: 'Real-Time WebSockets with Django Channels & ASGI',
          description: 'AsyncWebsocketConsumer, Channel layers with Redis, and live broadcast events.',
          duration: 30,
          order: 19,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build real-time chat and notifications with Django Channels.
`,
        },
        {
          id: 'les-dj-20',
          chapterId: 'chap-dj-4',
          slug: 'caching-and-redis-in-django',
          title: 'Multi-Tier Caching: Redis, Per-View Cache & Low-Level API',
          description: 'django-redis backend, cache_page decorator, and atomic cache locking.',
          duration: 25,
          order: 20,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Boost Django throughput with Redis caching.
`,
        },
        {
          id: 'les-dj-21',
          chapterId: 'chap-dj-4',
          slug: 'automated-testing-with-pytest-django',
          title: 'Automated Testing with pytest-django & Factory Boy',
          description: '@pytest.mark.django_db, APIClient testing, mocking third-party APIs, and code coverage.',
          duration: 25,
          order: 21,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write fast, maintainable test suites with pytest-django.
`,
        },
        {
          id: 'les-dj-22',
          chapterId: 'chap-dj-4',
          slug: 'production-deployment-gunicorn-and-docker',
          title: 'Production Deployment: Gunicorn, Whitenoise & Docker',
          description: 'Gunicorn WSGI, Whitenoise static file serving, PostgreSQL connection tuning, and Docker.',
          duration: 30,
          order: 22,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Package and deploy Django applications into secure production containers.
`,
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-dj-1',
      courseId: 'course-django',
      title: 'Enterprise Learning Management System (LMS) API',
      description: 'Build a production Django REST Framework API with PostgreSQL, Celery async notifications, and custom admin dashboard.',
      difficulty: 'ADVANCED',
      estimatedHours: 15,
      techStack: ['Python 3.12', 'Django 5', 'DRF', 'PostgreSQL', 'Celery', 'Redis'],
      steps: [
        {
          id: 'step-dj-1',
          projectId: 'proj-dj-1',
          title: '1. Custom User Model & App Hierarchy',
          description: 'Configure AbstractUser and initial model relationships.',
          order: 1,
          content: 'Setup Django 5 project structure.',
        },
      ],
    },
  ],
};
