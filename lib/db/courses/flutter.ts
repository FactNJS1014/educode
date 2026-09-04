import type { SeedCourseData } from '../seed-data';

export const flutterCourseData: SeedCourseData = {
  course: {
    id: 'course-flutter',
    slug: 'flutter-framework',
    title: 'Flutter & Dart Cross-Platform Mobile Mastery',
    description: 'Build native iOS, Android, and Web apps with Flutter 3, Dart 3, Riverpod / BLoC State Management, Animations, and REST APIs.',
    technology: 'Flutter',
    category: 'Mobile Development',
    level: 'INTERMEDIATE',
    estimatedHours: 40,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  chapters: [
    {
      id: 'chap-flut-1',
      courseId: 'course-flutter',
      title: 'Dart 3 & Flutter Widget Tree',
      description: 'Dart 3 records, pattern matching, widget tree, StatelessWidget, and StatefulWidget.',
      order: 1,
      level: 'BASIC',
      lessons: [
        {
          id: 'les-flut-1',
          chapterId: 'chap-flut-1',
          slug: 'flutter-architecture-and-dart-3',
          title: 'Flutter Architecture, Skia / Impeller & Dart 3',
          description: 'Rendering pipeline (Widget, Element, RenderObject), Impeller engine, and Dart 3 modern features.',
          duration: 20,
          order: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Understand Flutter's three trees: Widget, Element, and RenderObject.

\`\`\`dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text('Welcome to Flutter on EduCode Academy!'),
        ),
      ),
    );
  }
}
\`\`\`
`,
        },
        {
          id: 'les-flut-2',
          chapterId: 'chap-flut-1',
          slug: 'stateless-vs-stateful-widgets',
          title: 'StatelessWidget vs StatefulWidget & setState Lifecycle',
          description: 'initState(), didChangeDependencies(), build(), and dispose() lifecycle methods.',
          duration: 20,
          order: 2,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Manage widget lifecycle cleanly and prevent setState on unmounted widgets.
`,
        },
        {
          id: 'les-flut-3',
          chapterId: 'chap-flut-1',
          slug: 'layout-widgets-row-column-stack',
          title: 'Core Layouts: Container, Row, Column, Stack & Flex',
          description: 'MainAxisAlignment, CrossAxisAlignment, Expanded, Flexible, and Positioned widgets.',
          duration: 25,
          order: 3,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Master complex responsive mobile screen layouts.
`,
        },
        {
          id: 'les-flut-4',
          chapterId: 'chap-flut-1',
          slug: 'scrollable-views-listview-and-gridview',
          title: 'Scrollable Views: ListView.builder & GridView.builder',
          description: 'Lazy-rendering infinite lists with item recycling and ScrollController.',
          duration: 20,
          order: 4,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Render thousands of list items with zero frame drops.
`,
        },
        {
          id: 'les-flut-5',
          chapterId: 'chap-flut-1',
          slug: 'forms-and-text-input-handling',
          title: 'Forms, TextFormField, FormState & GlobalKey Validation',
          description: 'TextEditingController, input formatters, validator functions, and focus nodes.',
          duration: 20,
          order: 5,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build robust, validated mobile forms with proper focus handling.
`,
        },
      ],
    },
    {
      id: 'chap-flut-2',
      courseId: 'course-flutter',
      title: 'Navigation, Themes & State Management',
      description: 'GoRouter, Material Design 3, Provider, and Flutter Riverpod.',
      order: 2,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-flut-6',
          chapterId: 'chap-flut-2',
          slug: 'declarative-routing-with-gorouter',
          title: 'Declarative Routing with GoRouter (Navigator 2.0)',
          description: 'GoRoute, path parameters, sub-routes, redirect guards for authentication.',
          duration: 25,
          order: 6,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Configure deep linking and authenticated route guards with GoRouter.
`,
        },
        {
          id: 'les-flut-7',
          chapterId: 'chap-flut-2',
          slug: 'material-design-3-and-theming',
          title: 'Material Design 3 Theming & Dark Mode',
          description: 'ThemeData, ColorScheme.fromSeed, dynamic color adaptation, and custom text themes.',
          duration: 20,
          order: 7,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Implement dynamic light/dark theming adhering to Material Design 3.
`,
        },
        {
          id: 'les-flut-8',
          chapterId: 'chap-flut-2',
          slug: 'riverpod-architecture-and-providers',
          title: 'State Management with Flutter Riverpod 2.0',
          description: 'Provider, StateProvider, NotifierProvider, ConsumerWidget, and ref.watch vs ref.read.',
          duration: 30,
          order: 8,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build compile-safe global state with Riverpod.
`,
        },
        {
          id: 'les-flut-9',
          chapterId: 'chap-flut-2',
          slug: 'asyncnotifier-and-future-providers',
          title: 'AsyncNotifier & AsyncValue for Network Requests',
          description: 'Handling loading, data, and error states gracefully with \`.when()\`.',
          duration: 25,
          order: 9,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Manage asynchronous API state without boilerplate spinners.
`,
        },
        {
          id: 'les-flut-10',
          chapterId: 'chap-flut-2',
          slug: 'bloc-pattern-and-cubit',
          title: 'Enterprise State Management with BLoC & Cubit',
          description: 'BlocBuilder, BlocListener, BlocConsumer, and immutable state events.',
          duration: 30,
          order: 10,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Implement predictable event-driven state architecture with flutter_bloc.
`,
        },
      ],
    },
    {
      id: 'chap-flut-3',
      courseId: 'course-flutter',
      title: 'Networking, Storage & Animations',
      description: 'Dio HTTP client, JSON serialization, Hive/Isar local storage, and Implicit/Explicit animations.',
      order: 3,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-flut-11',
          chapterId: 'chap-flut-3',
          slug: 'http-networking-with-dio',
          title: 'HTTP Networking with Dio & Interceptors',
          description: 'BaseOptions, request/response interceptors, automatic JWT token attachment, and retry logic.',
          duration: 25,
          order: 11,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build a resilient HTTP client layer with Dio.
`,
        },
        {
          id: 'les-flut-12',
          chapterId: 'chap-flut-3',
          slug: 'json-serialization-with-freezed',
          title: 'Type-Safe JSON with Freezed & json_serializable',
          description: '@freezed code generation, union types, copyWith for immutability.',
          duration: 25,
          order: 12,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Generate robust model classes with Freezed.
`,
        },
        {
          id: 'les-flut-13',
          chapterId: 'chap-flut-3',
          slug: 'local-persistence-with-hive-and-shared-preferences',
          title: 'Local Storage with Hive CE & SharedPreferences',
          description: 'TypeAdapters, ultra-fast NoSQL key-value storage, and offline caching.',
          duration: 25,
          order: 13,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Cache data locally for full offline usability.
`,
        },
        {
          id: 'les-flut-14',
          chapterId: 'chap-flut-3',
          slug: 'implicit-animations-animatedcontainer',
          title: 'Implicit Animations: AnimatedContainer, AnimatedOpacity',
          description: 'Curves, Duration, and tween animations triggered by state changes.',
          duration: 20,
          order: 14,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Add delightful micro-interactions using implicit animation widgets.
`,
        },
        {
          id: 'les-flut-15',
          chapterId: 'chap-flut-3',
          slug: 'explicit-animations-and-animationcontroller',
          title: 'Explicit Animations & AnimationController',
          description: 'SingleTickerProviderStateMixin, CurvedAnimation, Tween, and AnimatedBuilder.',
          duration: 25,
          order: 15,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Control complex multi-stage animation sequences.
`,
        },
      ],
    },
    {
      id: 'chap-flut-4',
      courseId: 'course-flutter',
      title: 'Native Features, Testing & Store Release',
      description: 'Camera, Push Notifications, Platform Channels, Unit/Widget Testing, and Fastlane release.',
      order: 4,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-flut-16',
          chapterId: 'chap-flut-4',
          slug: 'device-features-camera-and-location',
          title: 'Device Features: Camera & Geolocation Plugins',
          description: 'image_picker, geolocator, permission_handler, and platform permissions (AndroidManifest / Info.plist).',
          duration: 25,
          order: 16,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Access mobile hardware features and handle runtime permission requests.
`,
        },
        {
          id: 'les-flut-17',
          chapterId: 'chap-flut-4',
          slug: 'firebase-cloud-messaging-push-notifications',
          title: 'Push Notifications with Firebase Cloud Messaging (FCM)',
          description: 'FCM tokens, background message handlers, and local notifications display.',
          duration: 30,
          order: 17,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Receive and display background push notifications.
`,
        },
        {
          id: 'les-flut-18',
          chapterId: 'chap-flut-4',
          slug: 'platform-channels-and-native-code',
          title: 'Platform Channels: MethodChannel for Kotlin / Swift',
          description: 'Calling native Android and iOS APIs from Dart when no plugin exists.',
          duration: 30,
          order: 18,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Bridge Dart code with native Kotlin / Swift platform code.
`,
        },
        {
          id: 'les-flut-19',
          chapterId: 'chap-flut-4',
          slug: 'widget-and-golden-testing',
          title: 'Widget Testing & Golden File UI Regression Tests',
          description: 'testWidgets, tester.pumpAndSettle(), find.byType, and pixel-by-pixel Golden tests.',
          duration: 25,
          order: 19,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write automated widget test suites and verify pixel-perfect design.
`,
        },
        {
          id: 'les-flut-20',
          chapterId: 'chap-flut-4',
          slug: 'performance-profiling-and-flutter-devtools',
          title: 'Performance Profiling with Flutter DevTools',
          description: 'Inspecting frame rendering times, memory leaks, and optimizing build() methods.',
          duration: 20,
          order: 20,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Profile and ensure consistent 60/120 FPS performance.
`,
        },
        {
          id: 'les-flut-21',
          chapterId: 'chap-flut-4',
          slug: 'internationalization-and-localization',
          title: 'Internationalization (i18n) & Localization (l10n)',
          description: 'ARB files, flutter_localizations, and switching languages dynamically.',
          duration: 20,
          order: 21,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Localize Flutter apps for global audiences.
`,
        },
        {
          id: 'les-flut-22',
          chapterId: 'chap-flut-4',
          slug: 'publishing-to-app-store-and-google-play',
          title: 'Building Release APKs / App Bundles & iOS App Store Release',
          description: 'App signing, keystore generation, Xcode provisioning profiles, and Fastlane automation.',
          duration: 30,
          order: 22,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build, sign, and release production Flutter apps to Google Play and Apple App Store.
`,
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-flut-1',
      courseId: 'course-flutter',
      title: 'Full-Featured Cross-Platform E-Commerce Mobile App',
      description: 'Build a production Flutter application featuring Riverpod state management, Dio API integration, and offline caching.',
      difficulty: 'ADVANCED',
      estimatedHours: 15,
      techStack: ['Flutter 3', 'Dart 3', 'Riverpod', 'Dio', 'Hive'],
      steps: [
        {
          id: 'step-flut-1',
          projectId: 'proj-flut-1',
          title: '1. Riverpod & GoRouter Architecture',
          description: 'Setup routing, providers, and theme system.',
          order: 1,
          content: 'Setup Flutter project structure with clean feature folders.',
        },
      ],
    },
  ],
};
