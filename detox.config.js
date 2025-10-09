/**
 * Detox configuration for Expo prebuilt iOS app
 */
module.exports = {
  testRunner: {
    $0: 'jest',
    args: {
      config: 'e2e/jest.config.js',
      _: ['e2e'],
    },
    jest: {
      setupTimeout: 120000,
      reportSpecs: true,
      reportWorkerAssign: true,
    },
  },
  apps: {
    ios: {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/civiceducationapp.app',
      // Use CocoaPods workspace after running `pod install`
      build: 'xcodebuild -workspace ios/civiceducationapp.xcworkspace -scheme civiceducationapp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
      device: {
        type: 'iPhone 15 Pro Max',
      },
    },
    android: {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      testBinaryPath: 'android/app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk',
      build: 'cd android && ./gradlew app:assembleDebug app:assembleAndroidTest -DtestBuildType=debug',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 15 Pro Max',
      },
    },
    androidEmulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_6_API_34',
      },
    },
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios',
    },
    'android.emu.debug': {
      device: 'androidEmulator',
      app: 'android',
    },
  },
};