import React, { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "@/components/ui/AppBar";
import StepFooter from "./StepFooter";
import StepProgress from "./StepProgress";
import { ThemeText } from "@/components/ui/ThemeText";

type StepLayoutProps = {
  headerTitle: string;
  subtitle?: string;
  children: ReactNode;
  continueDisabled?: boolean;
  onContinue: () => void;
  onSkip?: () => void;
  currentStep: number; // 1-based
  totalSteps: number;
  footerVariant?: "inline" | "sticky";
  footerTopAccessory?: ReactNode;
};

export default function StepLayout({
  headerTitle,
  subtitle,
  children,
  continueDisabled,
  onContinue,
  onSkip,
  currentStep,
  totalSteps,
  footerVariant = "inline",
  footerTopAccessory,
}: StepLayoutProps) {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }} className="bg-surface">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <AppBar
          showBorder={false}
          backgroundColor="bg-surface"
          title="Create profile"
        />
        <StepProgress current={currentStep} total={totalSteps} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-1 px-screen pt-sectionLg">
            <ThemeText variant="h3" weight="bold" align="center">
              {headerTitle}
            </ThemeText>
            {subtitle && subtitle?.length >= 1 && (
              <ThemeText
                variant="body"
                align="center"
                color="text-secondary"
                className="mt-item"
              >
                {subtitle}
              </ThemeText>
            )}
            <View className="mt-sectionLg">{children}</View>
            {footerVariant === "inline" ? (
              <StepFooter
                continueDisabled={continueDisabled}
                onContinue={onContinue}
                onSkip={onSkip}
                variant="inline"
              />
            ) : null}
          </View>
        </ScrollView>
        {footerVariant === "sticky" ? (
          <>
            {footerTopAccessory}
            <StepFooter
              continueDisabled={continueDisabled}
              onContinue={onContinue}
              onSkip={onSkip}
              variant="sticky"
            />
          </>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
