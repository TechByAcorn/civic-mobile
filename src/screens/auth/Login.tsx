import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Linking, Platform, Pressable, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemeText } from "../../components/ui/ThemeText";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../components/ui/AppBar";
import ThemeInput from "../../components/ui/ThemeInput";
import ThemeButton from "../../components/ui/ThemeButton";
import { DropdownArrowIcon, PasswordEyeIcon, RememberMeFilledIcon, RememberMeIcon } from "@/components/ui/Icon";

import { z } from "zod";
import { useForm, Controller, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "../../store/useAppStore";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { AuthStackParamList } from "@/@types/navigation";

export default function LoginScreen() {
  // const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const rememberMe = useAppStore((s) => s.rememberMe);
  const setRememberMe = useAppStore((s) => s.setRememberMe);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const loginSchema = z.discriminatedUnion("loginMethod", [
    z.object({
      loginMethod: z.literal("email"),
      email: z.string().email("Please enter a valid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    }),
    z.object({
      loginMethod: z.literal("phone"),
      phone: z
        .string()
        .min(1)
        .refine((val) => val.replace(/\D/g, "").length >= 10, {
          message: "Please enter a valid phone number",
        }),
      password: z.string().min(6, "Password must be at least 6 characters"),
    }),
  ]);

  type LoginFormValues = z.infer<typeof loginSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) as unknown as Resolver<LoginFormValues>,
    mode: "onChange",
    defaultValues: {
      loginMethod: "email",
      email: "",
      password: "",
    } as LoginFormValues,
  });

  const errorsAny = errors as any;

  const loginMethod = watch("loginMethod");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    navigation.navigate("ProfileCreation");
    // setAuthenticated(true);
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }} className="bg-surface">
      <StatusBar style={"dark"} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <AppBar
          showBorder={false}
          backgroundColor="bg-surface"
          rightComponent={
            <Pressable
              accessibilityRole="button"
              onPress={() => Linking.openURL("mailto:support@example.com")}
            >
              <ThemeText variant="body" weight="medium" className="text-primary">
                Support
              </ThemeText>
            </Pressable>
          }
        />

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
          keyboardDismissMode="on-drag"
        >
          <View className="flex-1 px-screen">
            <View className="mt-2 items-center gap-item">
              <ThemeText variant="h3" weight="semibold" align="center" uppercase>
                Welcome back
              </ThemeText>
              <ThemeText variant="body" color="text-secondary" align="center">
                Please enter your registered email or phone with your password to
                log in.
              </ThemeText>
            </View>

            {/* Method toggle */}
            <View className="mt-8 flex-row items-center justify-center gap-2 bg-neutral h-[37] rounded-full">
              <Pressable
                accessibilityRole="button"
                onPress={() =>
                  setValue("loginMethod", "email", { shouldValidate: true })
                }
                className={`flex-1 rounded-full h-full items-center justify-center ${loginMethod === "email" ? "bg-primary" : ""}`}
                testID="login-toggle-email"
              >
                <ThemeText
                  variant="label"
                  weight="medium"
                  className={
                    loginMethod === "email" ? "text-white dark:text-black" : "bg-neutral"
                  }
                >
                  Email
                </ThemeText>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() =>
                  setValue("loginMethod", "phone", { shouldValidate: true })
                }
                className={`flex-1 h-full rounded-full items-center justify-center ${loginMethod === "phone" ? "bg-primary" : ""}`}
                testID="login-toggle-phone"
              >
                <ThemeText
                  variant="label"
                  weight="medium"
                  className={
                    loginMethod === "phone" ? "text-white" : ""
                  }
                >
                  Phone Number
                </ThemeText>
              </Pressable>
            </View>

            {/* Form */}
            <View className="mt-8 gap-6">
              {/* Identifier */}
              <View>
                {loginMethod === "email" ? (
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <ThemeInput
                        label="Email"
                        value={value ?? ""}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        testID="login-email-input"
                        errorText={errorsAny.email ? String(errorsAny.email?.message) : undefined}
                      />
                    )}
                  />
                ) : (
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <ThemeInput
                        label="Phone number"
                        value={value ?? ""}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        testID="login-phone-input"
                        errorText={errorsAny.phone ? String(errorsAny.phone?.message) : undefined}
                        leftPaddingClassName='pl-[60px]'
                        leftComponent={
                          <View className="flex-row items-center px-medium">
                            <ThemeText variant="body">US</ThemeText>
                            <DropdownArrowIcon />
                          </View>
                        }
                      />
                    )}
                  />
                )}
              </View>

              {/* Password */}
              <View>
                <View className="relative">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <ThemeInput
                        label="Password"
                        value={value ?? ""}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        testID="login-password-input"
                        errorText={errors.password ? String(errors.password?.message) : undefined}
                        rightComponent={
                          <Pressable
                            accessibilityRole="button"
                            onPress={() => setShowPassword((v) => !v)}
                            testID="toggle-password-visibility"
                          >
                            <PasswordEyeIcon />
                          </Pressable>
                        }
                      />
                    )}
                  />
                </View>
              </View>

              {/* Remember me */}
              <View className="flex-row items-center gap-3 mt-1">
                <Pressable
                  onPress={() => setRememberMe(!rememberMe)}
                  className="h-5 w-5 items-center justify-center rounded border"
                >
                  {rememberMe ? (
                    <RememberMeFilledIcon />
                  ) : <RememberMeIcon />}
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setRememberMe(!rememberMe)}
                  testID="toggle-rememberme-text"
                >
                  <ThemeText variant="body" color="onSurface">
                    Remember me
                  </ThemeText>
                </Pressable>
              </View>

              <ThemeButton
                label="Log In"
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid}
                testID="login-submit-button"
                className="mt-3"
              />

              <Pressable
                onPress={() => navigation.navigate("ForgotPassword")}
                className="items-center"
              >
                <ThemeText variant="body" weight="medium" className="text-primary">
                  Forgot password?
                </ThemeText>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <Image
          source={require("../../../assets/images/illustration-two.png")}
          style={{
            position: "absolute",
            bottom: 0,
            height: 100,
            width: "100%",
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
