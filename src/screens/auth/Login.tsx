import React, { useState } from "react";
import { Image, Linking, Pressable, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemeText } from "../../components/ui/ThemeText";
import { useAppStore } from "../../store/useAppStore";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller, SubmitHandler, Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginScreen() {
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const rememberMe = useAppStore((s) => s.rememberMe);
  const setRememberMe = useAppStore((s) => s.setRememberMe);
  const navigation = useNavigation();

  // Zod schema (supports email or phone login)
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
    // TODO: integrate API auth with `data`
    setAuthenticated(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-surface">
      <StatusBar style={"dark"} />

      {/* Top bar */}
      <View className="flex-row items-center justify-between px-4 pt-1">
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          className="h-10 w-10 items-center justify-center"
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={"#000000"}
          />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => Linking.openURL("mailto:support@example.com")}
        >
          <ThemeText variant="body" weight="medium" className="text-primary">
            Support
          </ThemeText>
        </Pressable>
      </View>

      {/* Content */}
      <View className="flex-1 px-5 mt-[34]">
        <View className="mt-2 items-center gap-[12]">
          <ThemeText variant="h3" weight="semibold" align="center" uppercase>
            Welcome back
          </ThemeText>
          <ThemeText variant="body" color="text-secondary" align="center">
            Please enter your registered email or phone with your password to
            log in.
          </ThemeText>
        </View>

        {/* Method toggle */}
        <View className="mt-[32] flex-row items-center justify-center gap-2 bg-neutral h-[37] rounded-full">
          <Pressable
            accessibilityRole="button"
            onPress={() =>
              setValue("loginMethod", "email", { shouldValidate: true })
            }
            className={`flex-1 rounded-full h-full items-center justify-center ${loginMethod === "email" ? "bg-primary" : ""}`}
            testID="login-toggle-email"
          >
            <ThemeText
              variant="body"
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
              variant="body"
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
        <View className="mt-6 gap-4">
          {/* Identifier */}
          <View>
            <ThemeText
              variant="body"
              weight="medium"
              color="onSurface"
              className="mb-2"
            >
              {loginMethod === "email" ? "Email" : "Phone number"}
            </ThemeText>
            {loginMethod === "email" ? (
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    value={value ?? ""}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="james@email.io"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    testID="login-email-input"
                    className={`h-[44] rounded-md border ${errorsAny.email ? "border-red-500" : "border-neutral-300 dark:border-neutral-700"} bg-white dark:bg-neutral-800 px-3 text-[16px] font-body`}
                  />
                )}
              />
            ) : (
              <Controller
                control={control}
                name="phone"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    value={value ?? ""}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="(555) 555-1234"
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    testID="login-phone-input"
                    className={`h-[44] rounded-md border ${errorsAny.phone ? "border-red-500" : "border-neutral-300 dark:border-neutral-700"} bg-white dark:bg-neutral-800 px-3 text-[16px] font-body`}
                  />
                )}
              />
            )}
            {loginMethod === "email" && errorsAny.email ? (
              <ThemeText
                variant="body"
                className="text-red-500 text-[13px] mt-1"
              >
                {String(errorsAny.email?.message)}
              </ThemeText>
            ) : null}
            {loginMethod === "phone" && errorsAny.phone ? (
              <ThemeText
                variant="body"
                className="text-red-500 text-[13px] mt-1"
              >
                {String(errorsAny.phone?.message)}
              </ThemeText>
            ) : null}
          </View>

          {/* Password */}
          <View>
            <ThemeText
              variant="body"
              weight="medium"
              color="onSurface"
              className="mb-2"
            >
              Password
            </ThemeText>
            <View className="relative">
              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    value={value ?? ""}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="••••••••"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    testID="login-password-input"
                    className={`h-11 rounded-lg border ${errors.password ? "border-red-500" : "border-neutral-300 dark:border-neutral-700"} bg-white dark:bg-neutral-800 px-3 pr-12 text-[16px] font-body`}
                  />
                )}
              />
              <Pressable
                onPress={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 items-center justify-center"
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color={"#000000"}
                />
              </Pressable>
              {errors.password ? (
                <ThemeText
                  variant="body"
                  className="text-red-500 text-[13px] mt-1"
                >
                  {String(errors.password?.message)}
                </ThemeText>
              ) : null}
            </View>
          </View>

          {/* Remember me */}
          <View className="flex-row items-center gap-3 mt-1">
            <Pressable
              onPress={() => setRememberMe(!rememberMe)}
              className="h-5 w-5 items-center justify-center rounded border"
              style={{
                borderColor: rememberMe
                  ? "#EF4444"
                  : "#D4D4D4",
                backgroundColor: rememberMe ? "#EF4444" : "transparent",
              }}
            >
              {rememberMe ? (
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              ) : null}
            </Pressable>
            <ThemeText variant="body" color="onSurface">
              Remember me
            </ThemeText>
          </View>

          {/* Submit button */}
          <Pressable
            accessibilityRole="button"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
            className={`mt-3 h-[44] rounded-lg items-center justify-center ${isValid ? "bg-black" : "bg-disabled"}`}
            testID="login-submit-button"
          >
            <ThemeText
              variant="button"
              weight="medium"
              className={
                isValid
                  ? "text-white dark:text-black"
                  : "text-white dark:text-neutral-300"
              }
            >
              Log In
            </ThemeText>
          </Pressable>

          {/* Forgot password */}
          <Pressable
            onPress={() => navigation.navigate("ForgotPassword" as never)}
            className="items-center mt-3"
          >
            <ThemeText variant="body" weight="medium" className="text-primary">
              Forgot password?
            </ThemeText>
          </Pressable>
        </View>
      </View>

      {/* Decorative corners (optional) */}
      <Image
        source={require("../../../assets/images/illustration-two.png")}
        resizeMode="contain"
        style={{
          position: "absolute",
          bottom: 0,
          height: 100,
          width: "100%",
        }}
      />
    </SafeAreaView>
  );
}
