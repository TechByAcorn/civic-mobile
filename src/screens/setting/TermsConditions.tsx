import React from 'react';
import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppBar from '../../components/ui/AppBar';
import { ThemeText } from '../../components/ui/ThemeText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TermsConditionsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <StatusBar style="dark" />
      <AppBar title="Terms & Conditions" />
      
      <ScrollView className="flex-1 px-4 py-6">
        <ThemeText variant="h2" className="mb-4">
          Terms & Conditions
        </ThemeText>
        
        <ThemeText variant="body" className="mb-4">
          Last updated: [Date]
        </ThemeText>
        
        <ThemeText variant="subtitle" className="mb-3">
          1. Acceptance of Terms
        </ThemeText>
        <ThemeText variant="body" className="mb-4">
          By accessing and using this civic education application, you accept and agree to be bound by the terms and provision of this agreement.
        </ThemeText>
        
        <ThemeText variant="subtitle" className="mb-3">
          2. Use License
        </ThemeText>
        <ThemeText variant="body" className="mb-4">
          Permission is granted to temporarily download one copy of the materials on this application for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
        </ThemeText>
        
        <ThemeText variant="subtitle" className="mb-3">
          3. Disclaimer
        </ThemeText>
        <ThemeText variant="body" className="mb-4">
          The materials on this application are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </ThemeText>
        
        <ThemeText variant="subtitle" className="mb-3">
          4. Limitations
        </ThemeText>
        <ThemeText variant="body" className="mb-4">
          In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this application.
        </ThemeText>
        
        <ThemeText variant="subtitle" className="mb-3">
          5. Accuracy of Materials
        </ThemeText>
        <ThemeText variant="body" className="mb-4">
          The materials appearing on this application could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its application are accurate, complete, or current.
        </ThemeText>
        
        <ThemeText variant="subtitle" className="mb-3">
          6. Links
        </ThemeText>
        <ThemeText variant="body" className="mb-4">
          We have not reviewed all of the sites linked to our application and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site.
        </ThemeText>
        
        <ThemeText variant="subtitle" className="mb-3">
          7. Modifications
        </ThemeText>
        <ThemeText variant="body" className="mb-6">
          We may revise these terms of service for its application at any time without notice. By using this application, you are agreeing to be bound by the then current version of these terms of service.
        </ThemeText>
      </ScrollView>
    </View>
  );
};

export default TermsConditionsScreen;