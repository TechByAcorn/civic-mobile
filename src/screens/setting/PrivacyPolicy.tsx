import React from 'react';
import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppBar from '../../components/ui/AppBar';
import { ThemeText } from '../../components/ui/ThemeText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PrivacyPolicyScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <StatusBar style="dark" />
      <AppBar title="Privacy Policy" />
      
      <ScrollView className="flex-1 px-4 py-6">
        <ThemeText variant="h2" className="mb-4">
          Privacy Policy
        </ThemeText>
        
        <ThemeText variant="body" className="mb-4">
          Last updated: [Date]
        </ThemeText>
        
        <ThemeText variant="subtitle" className="mb-3">
          Information We Collect
        </ThemeText>
        <ThemeText variant="body" className="mb-4">
          We collect information you provide directly to us, such as when you create an account, 
          use our services, or contact us for support. This may include your name, email address, 
          and other personal information.
        </ThemeText>
        
        <ThemeText variant="subtitle" className="mb-3">
          How We Use Your Information
        </ThemeText>
        <ThemeText variant="body" className="mb-4">
          We use the information we collect to provide, maintain, and improve our services, 
          process transactions, send you technical notices and support messages, and communicate 
          with you about products, services, and promotional offers.
        </ThemeText>
        
        <ThemeText variant="subtitle" className="mb-3">
          Information Sharing
        </ThemeText>
        <ThemeText variant="body" className="mb-4">
          We do not sell, trade, or otherwise transfer your personal information to third parties 
          without your consent, except as described in this privacy policy or as required by law.
        </ThemeText>
        
        <ThemeText variant="subtitle" className="mb-3">
          Data Security
        </ThemeText>
        <ThemeText variant="body" className="mb-4">
          We implement appropriate security measures to protect your personal information against 
          unauthorized access, alteration, disclosure, or destruction. However, no method of 
          transmission over the internet is 100% secure.
        </ThemeText>
        
        <ThemeText variant="subtitle" className="mb-3">
          Your Rights
        </ThemeText>
        <ThemeText variant="body" className="mb-4">
          You have the right to access, update, or delete your personal information. You may also 
          opt out of certain communications from us. To exercise these rights, please contact us 
          using the information provided below.
        </ThemeText>
        
        <ThemeText variant="subtitle" className="mb-3">
          Changes to This Policy
        </ThemeText>
        <ThemeText variant="body" className="mb-4">
          We may update this privacy policy from time to time. We will notify you of any changes 
          by posting the new privacy policy on this page and updating the "Last updated" date.
        </ThemeText>
        
        <ThemeText variant="subtitle" className="mb-3">
          Contact Us
        </ThemeText>
        <ThemeText variant="body" className="mb-6">
          If you have any questions about this privacy policy, please contact us at:
          {'\n\n'}
          Email: privacy@civiceducation.app
          {'\n'}
          Address: [Your Company Address]
        </ThemeText>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;