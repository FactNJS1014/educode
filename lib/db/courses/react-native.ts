import type { SeedCourseData } from '../seed-data';

export const reactNativeCourseData: SeedCourseData = {
  course: {
    id: 'course-react-native',
    slug: 'react-native-framework',
    title: 'React Native & Expo Universal App Architecture',
    description: 'Build native iOS and Android apps with React Native, Expo Router, TypeScript, NativeWind, Zustand, and EAS Build.',
    technology: 'React Native',
    category: 'Mobile Development',
    level: 'INTERMEDIATE',
    estimatedHours: 40,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  chapters: [
    {
      id: 'chap-rn-1',
      courseId: 'course-react-native',
      title: 'React Native & Expo Core',
      description: 'Expo SDK, React Native architecture (Fabric / TurboModules), core primitive components, and Flexbox.',
      order: 1,
      level: 'BASIC',
      lessons: [
        {
          id: 'les-rn-1',
          chapterId: 'chap-rn-1',
          slug: 'expo-sdk-and-react-native-new-architecture',
          title: 'Expo SDK 51+ & React Native New Architecture (Fabric)',
          description: 'create-expo-app, Expo Go, C++ JSI bridge replacement (TurboModules & Fabric renderer).',
          duration: 20,
          order: 1,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Master the new architecture of React Native powered by the JavaScript Interface (JSI).

\`\`\`tsx
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to React Native on EduCode Academy!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' },
  title: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
});
\`\`\`
`,
        },
        {
          id: 'les-rn-2',
          chapterId: 'chap-rn-1',
          slug: 'core-primitives-view-text-image',
          title: 'Core Components: View, Text, Image & SafeAreaView',
          description: 'Native host component mapping (UIView / android.view), SafeAreaProvider, and Image caching.',
          duration: 15,
          order: 2,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Use core primitives to assemble mobile UI screens.
`,
        },
        {
          id: 'les-rn-3',
          chapterId: 'chap-rn-1',
          slug: 'flexbox-and-responsive-styling',
          title: 'Mobile Flexbox Layout & NativeWind (Tailwind CSS)',
          description: 'flexDirection: column default, justifyContent, alignItems, and styling with NativeWind v4.',
          duration: 20,
          order: 3,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Style React Native applications with Tailwind CSS using NativeWind.
`,
        },
        {
          id: 'les-rn-4',
          chapterId: 'chap-rn-1',
          slug: 'touchables-and-pressable',
          title: 'User Interactions: Pressable & Haptic Feedback',
          description: 'Pressable states ({ pressed }), hitSlop touch expansion, and expo-haptics vibration.',
          duration: 15,
          order: 4,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Create responsive, tactile touch targets with \`Pressable\` and haptics.
`,
        },
        {
          id: 'les-rn-5',
          chapterId: 'chap-rn-1',
          slug: 'scrollview-and-flatlist-optimization',
          title: 'List Rendering: FlatList, SectionList & FlashList',
          description: 'VirtualizedList recycling, getItemLayout, initialNumToRender, and Shopify FlashList.',
          duration: 25,
          order: 5,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Render smooth 60 FPS scrolling lists with memory virtualization.
`,
        },
      ],
    },
    {
      id: 'chap-rn-2',
      courseId: 'course-react-native',
      title: 'Expo Router & Navigation',
      description: 'File-based Expo Router v3, Tabs, Stack, modals, and deep links.',
      order: 2,
      level: 'INTERMEDIATE',
      lessons: [
        {
          id: 'les-rn-6',
          chapterId: 'chap-rn-2',
          slug: 'expo-router-file-based-navigation',
          title: 'Expo Router: File-Based Routing & Stack Layouts',
          description: 'app/_layout.tsx, <Stack>, <Stack.Screen>, and push/replace navigation with useRouter().',
          duration: 25,
          order: 6,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build type-safe native stack navigation with Expo Router.
`,
        },
        {
          id: 'les-rn-7',
          chapterId: 'chap-rn-2',
          slug: 'bottom-tabs-and-drawer-navigation',
          title: 'Bottom Tabs & Drawer Navigation',
          description: '<Tabs>, custom tab bar icons (lucide-react-native), badge counts, and Drawer gestures.',
          duration: 25,
          order: 7,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Structure mobile applications with persistent bottom tab bars.
`,
        },
        {
          id: 'les-rn-8',
          chapterId: 'chap-rn-2',
          slug: 'dynamic-routes-and-query-parameters',
          title: 'Dynamic Routes (app/[id].tsx) & useLocalSearchParams',
          description: 'Extracting route parameters, passing complex state, and header title customization.',
          duration: 20,
          order: 8,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Handle dynamic detail views with \`useLocalSearchParams\`.
`,
        },
        {
          id: 'les-rn-9',
          chapterId: 'chap-rn-2',
          slug: 'modal-presentation-and-native-sheets',
          title: 'Native Modals, FormSheets & Action Sheets',
          description: 'presentation: "modal", iOS sheet grabbers, and bottom sheet popups (@gorhom/bottom-sheet).',
          duration: 20,
          order: 9,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Present native bottom sheets and modal dialogs.
`,
        },
        {
          id: 'les-rn-10',
          chapterId: 'chap-rn-2',
          slug: 'deep-linking-and-universal-links',
          title: 'Universal Links & Deep Linking Scheme',
          description: 'Configuring custom URL schemes (myapp://), linking config, and handling inbound URLs.',
          duration: 25,
          order: 10,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Open app screens directly from external links and emails.
`,
        },
      ],
    },
    {
      id: 'chap-rn-3',
      courseId: 'course-react-native',
      title: 'State, Storage & Reanimated',
      description: 'Zustand, MMKV storage, TanStack Query, React Native Reanimated, and Gestures.',
      order: 3,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-rn-11',
          chapterId: 'chap-rn-3',
          slug: 'high-speed-storage-with-react-native-mmkv',
          title: 'Ultra-Fast Storage with MMKV & Zustand',
          description: 'Synchronous C++ direct memory storage (30x faster than AsyncStorage) with Zustand persistence.',
          duration: 25,
          order: 11,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Store user auth tokens and cached preferences synchronously with MMKV.
`,
        },
        {
          id: 'les-rn-12',
          chapterId: 'chap-rn-3',
          slug: 'tanstack-query-in-react-native',
          title: 'Server State & Offline Caching with TanStack Query',
          description: 'FocusManager and onlineManager integration for mobile app background refresh.',
          duration: 25,
          order: 12,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Synchronize remote REST APIs with offline cache support.
`,
        },
        {
          id: 'les-rn-13',
          chapterId: 'chap-rn-3',
          slug: 'react-native-reanimated-animations',
          title: '60+ FPS Animations with React Native Reanimated 3',
          description: 'useSharedValue, useAnimatedStyle, withSpring, withTiming, running on the UI thread.',
          duration: 30,
          order: 13,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Create buttery-smooth native animations without JavaScript thread overhead.
`,
        },
        {
          id: 'les-rn-14',
          chapterId: 'chap-rn-3',
          slug: 'gesture-handler-pan-and-pinch',
          title: 'Gesture Handling: react-native-gesture-handler',
          description: 'Gesture.Pan(), Gesture.Pinch(), Gesture.Race(), and swipe-to-dismiss cards.',
          duration: 30,
          order: 14,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build interactive gesture-driven mobile UI components.
`,
        },
        {
          id: 'les-rn-15',
          chapterId: 'chap-rn-3',
          slug: 'keyboard-avoiding-and-focus',
          title: 'Keyboard Handling & KeyboardAvoidingView',
          description: 'react-native-keyboard-controller, adjusting scroll views when the virtual keyboard appears.',
          duration: 20,
          order: 15,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Prevent keyboard occlusion over input fields.
`,
        },
      ],
    },
    {
      id: 'chap-rn-4',
      courseId: 'course-react-native',
      title: 'Native Device APIs, Testing & EAS',
      description: 'Camera, Notifications, Biometrics, Jest Native, and Expo Application Services (EAS).',
      order: 4,
      level: 'ADVANCED',
      lessons: [
        {
          id: 'les-rn-16',
          chapterId: 'chap-rn-4',
          slug: 'expo-camera-and-image-picker',
          title: 'Expo Camera & Photo Library Access',
          description: 'expo-camera, expo-image-picker, capturing high-res photos, and cropping.',
          duration: 25,
          order: 16,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Capture and process images natively on iOS and Android.
`,
        },
        {
          id: 'les-rn-17',
          chapterId: 'chap-rn-4',
          slug: 'biometric-authentication-faceid-touchid',
          title: 'Biometric Authentication: FaceID & Fingerprint (expo-local-authentication)',
          description: 'Checking hardware support, prompting FaceID / Fingerprint prompts.',
          duration: 20,
          order: 17,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Protect sensitive app screens with biometric authentication.
`,
        },
        {
          id: 'les-rn-18',
          chapterId: 'chap-rn-4',
          slug: 'push-notifications-with-expo-notifications',
          title: 'Push Notifications with expo-notifications & FCM/APNs',
          description: 'Getting push tokens, scheduling local notifications, and handling background notification taps.',
          duration: 30,
          order: 18,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Send and handle rich push notifications.
`,
        },
        {
          id: 'les-rn-19',
          chapterId: 'chap-rn-4',
          slug: 'native-modules-and-expo-config-plugins',
          title: 'Expo Config Plugins & Custom Native Modules',
          description: 'app.config.ts, writing Expo config plugins to customize AndroidManifest and Info.plist.',
          duration: 30,
          order: 19,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Extend native build configurations without ejecting from managed workflow.
`,
        },
        {
          id: 'les-rn-20',
          chapterId: 'chap-rn-4',
          slug: 'testing-with-jest-and-rntl',
          title: 'Automated Testing with React Native Testing Library (RNTL)',
          description: 'render, fireEvent, waitFor, mocking native modules, and snapshot tests.',
          duration: 25,
          order: 20,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Write robust unit and component tests for React Native.
`,
        },
        {
          id: 'les-rn-21',
          chapterId: 'chap-rn-4',
          slug: 'eas-build-cloud-compilation',
          title: 'Cloud Builds with Expo Application Services (EAS Build)',
          description: 'eas.json, configuring development, preview, and production build profiles for iOS IPA & Android AAB.',
          duration: 30,
          order: 21,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Build iOS and Android native binaries in the cloud without local Xcode/Android Studio.
`,
        },
        {
          id: 'les-rn-22',
          chapterId: 'chap-rn-4',
          slug: 'over-the-air-updates-with-eas-update',
          title: 'Over-The-Air (OTA) Updates with EAS Update & Store Release',
          description: 'Publishing instant bug fixes directly to user devices without App Store review delays.',
          duration: 25,
          order: 22,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: `## 🎯 Learning Objectives
- Deploy instant OTA hotfixes and publish to App Store / Google Play with EAS Submit.
`,
        },
      ],
    },
  ],
  projects: [
    {
      id: 'proj-rn-1',
      courseId: 'course-react-native',
      title: 'Universal Fitness & Workout Tracking Mobile App',
      description: 'Build a production React Native / Expo application with Reanimated animations, MMKV offline persistence, and biometric security.',
      difficulty: 'ADVANCED',
      estimatedHours: 15,
      techStack: ['React Native', 'Expo SDK 51', 'Expo Router', 'NativeWind', 'Zustand', 'Reanimated'],
      steps: [
        {
          id: 'step-rn-1',
          projectId: 'proj-rn-1',
          title: '1. Expo Router & NativeWind Setup',
          description: 'Setup tab routes and Tailwind styling configuration.',
          order: 1,
          content: 'Initialize Expo app with TypeScript and modern folder structure.',
        },
      ],
    },
  ],
};
