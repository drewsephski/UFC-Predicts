"use client";

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { useSignIn, useSignUp } from "@clerk/nextjs";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeftIcon, MailIcon } from "lucide-react";
import Icons from "../global/icons";
import { FADE_IN_VARIANTS } from "@/constants";
import { toast } from "sonner";
import LoadingIcon from "../ui/loading-icon";
import type { OAuthStrategy } from "@clerk/types";
import type { motion } from "framer-motion";


const SignUpForm = () => {

    const router = useRouter();

    const params = useSearchParams();

    const from = params.get("from");

    const { signIn } = useSignIn();

    const { isLoaded, signUp, setActive } = useSignUp();

    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [isEmailOpen, setIsEmailOpen] = useState<boolean>(true);
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
    const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);
    const [isCodeLoading, setIsCodeLoading] = useState<boolean>(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
    const [isAppleLoading, setIsAppleLoading] = useState<boolean>(false);

    const handleOAuth = async (strategy: OAuthStrategy) => {
        if (strategy === "oauth_google") {
            setIsGoogleLoading(true);
        } else {
            setIsAppleLoading(true);
        }

        try {
            await signIn?.authenticateWithRedirect({
                strategy,
                redirectUrl: "/auth/signup/sso-callback",
                redirectUrlComplete: "/auth/callback",
            });

            toast.loading(`Redirecting to ${strategy === "oauth_google" ? "Google" : "Apple"}...`);
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isLoaded) return;

        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        setIsEmailLoading(true);

        try {

            await signUp.create({
                emailAddress: email,
            });

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            setIsCodeSent(true);

            toast.success("We have sent a code to your email address");
        } catch (error: unknown) {
            const clerkError = error as { errors?: Array<{ code?: string }> };
            
            switch (clerkError.errors?.[0]?.code) {
                case "form_identifier_exists":
                    toast.error("This email is already registered. Please sign in.");
                    router.push("/auth/signin?from=signup");
                    break;
                case "form_password_pwned":
                    toast.error("The password is too common. Please choose a stronger password.");
                    break;
                case "form_param_format_invalid":
                    toast.error("Invalid email address. Please enter a valid email address.");
                    break;
                case "form_password_length_too_short":
                    toast.error("Password is too short. Please choose a longer password.");
                    break;
                default:
                    toast.error("An error occurred. Please try again");
                    break;
            }
        } finally {
            setIsEmailLoading(false);
        }
    };

    const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isLoaded) return;

        if (!code) {
            toast.error("Please enter the code");
            return;
        }

        setIsCodeLoading(true);

        try {
            const completeSignup = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignup.status === "complete") {
                await setActive({ session: completeSignup.createdSessionId });
                router.push("/auth/callback");
            } else {
                console.error(JSON.stringify(completeSignup, null, 2));
                toast.error("Invalid verification code. Please try again.");
            }
        } catch (error) {
            console.error("Error:", JSON.stringify(error, null, 2));
            toast.error("An error occurred. Please try again");
        } finally {
            setIsCodeLoading(false);
        }
    };

    useEffect(() => {
        if (from) {
            setIsEmailOpen(false);
        }
    }, [from]);


    return (
        <div className="flex flex-col text-center w-full">
            <div
                className="motion-div"
                data-variants={FADE_IN_VARIANTS}
                data-animate="visible"
                data-initial="hidden"
            >
                <div className="flex justify-center">
                    <Link href="/">
                        {Icons.icon?.({ className: "w-8 h-8" })}
                    </Link>
                </div>
                <h1 className="text-2xl text-center mt-4">
                    {isEmailOpen
                        ? "Create your account"
                        : isCodeSent ? "Check your email"
                            : "Enter your email"}
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                    {isEmailOpen
                        ? "Create an account to start using luro"
                        : isCodeSent
                            ? "Please check your inbox for verification code"
                            : "Enter your email address to get started"}
                </p>
            </div>
            {isEmailOpen ? (
                <div>
                    <div
                        className="motion-div flex flex-col gap-4 py-8"
                        data-variants={FADE_IN_VARIANTS}
                        data-animate="visible"
                        data-initial="hidden"
                    >
                        <div className="w-full">
                            <Button
                                size="lg"
                                type="button"
                                variant="tertiary"
                                disabled={isGoogleLoading || isAppleLoading}
                                onClick={() => handleOAuth("oauth_google")}
                                className="w-full"
                            >
                                {isGoogleLoading ? 
                                  <LoadingIcon size="sm" className="w-4 h-4 absolute left-4" /> : 
                                  Icons.google?.({ className: "w-4 h-4 absolute left-4" })}
                                Continue with Google
                            </Button>
                        </div>
                        <div className="w-full">
                            <Button
                                size="lg"
                                type="button"
                                variant="tertiary"
                                disabled={isGoogleLoading || isAppleLoading}
                                onClick={() => handleOAuth("oauth_apple")}
                                className="w-full"
                            >
                                {isAppleLoading ? 
                                  <LoadingIcon size="sm" className="w-4 h-4 absolute left-4" /> : 
                                  Icons.apple?.({ className: "w-4 h-4 absolute left-4" })}
                                Continue with Apple
                            </Button>
                        </div>
                        <div className="w-full">
                            <Button
                                size="lg"
                                type="button"
                                variant="tertiary"
                                disabled={isGoogleLoading || isAppleLoading}
                                onClick={() => setIsEmailOpen(false)}
                                className="w-full"
                            >
                                <MailIcon className="w-4 h-4 absolute left-4" />
                                Continue with email
                            </Button>
                        </div>
                        <div className="pt-12 text-muted-foreground text-sm">
                            <span>Already have an account?</span> <Link href="/auth/signin" className="text-foreground">Login</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {isCodeSent ? (
                        <div>
                            <form
                                className="motion-form py-8 w-full flex flex-col gap-4"
                                data-variants={FADE_IN_VARIANTS}
                                data-animate="visible"
                                data-initial="hidden"
                                onSubmit={handleVerifyCode}
                            >
                                <div className="w-full">
                                    <Input
                                        autoFocus={true}
                                        name="code"
                                        type="code"
                                        value={code}
                                        disabled={isCodeLoading}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="Enter the verification code"
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-full">
                                    <Button
                                        type="submit"
                                        disabled={isCodeLoading}
                                        className="w-full"
                                    >
                                        {isCodeLoading ? <LoadingIcon size="sm" className="mr-2" /> : "Verify code"}
                                    </Button>
                                </div>
                                <div className="w-full flex items-center gap-2">
                                    <Button
                                        asChild
                                        type="button"
                                        disabled={isCodeLoading}
                                        variant="tertiary"
                                        className="w-full"
                                    >
                                        <Link href="https://mail.google.com" target="_blank">
                                            Open gmail
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        type="button"
                                        disabled={isCodeLoading}
                                        variant="tertiary"
                                        className="w-full"
                                    >
                                        <Link href="https://outlook.live.com" target="_blank">
                                            Open outlook
                                        </Link>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <form
                                className="motion-form py-8 w-full flex flex-col gap-4"
                                data-variants={FADE_IN_VARIANTS}
                                data-animate="visible"
                                data-initial="hidden"
                                onSubmit={handleEmail}
                            >
                                <div className="w-full">
                                    <Input
                                        autoFocus
                                        name="email"
                                        type="email"
                                        value={email}
                                        disabled={isEmailLoading}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-full">
                                    <Button
                                        type="submit"
                                        disabled={isEmailLoading}
                                        className="w-full"
                                    >
                                        {isEmailLoading ? <LoadingIcon size="sm" className="mr-2" /> : "Continue"}
                                    </Button>
                                </div>
                                <div className="w-full">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        disabled={isEmailLoading}
                                        onClick={() => setIsEmailOpen(true)}
                                        className="w-full"
                                    >
                                        <ArrowLeftIcon className="w-3.5 h-3.5 mr-2" />
                                        Back
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
};

export default SignUpForm
