"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaceIcon, ImageIcon, SunIcon } from "@radix-ui/react-icons"

import { authClient } from "../../../lib/auth-client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

import {
    EnvelopeClosedIcon,
    LockClosedIcon,
    ReloadIcon,
    EyeOpenIcon,
    EyeClosedIcon,
    CheckIcon,
} from "@radix-ui/react-icons";

import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
    email: z.email("Digite um e-mail válido"),
    password: z.string().min(6, "A senha deve ter ao menos 6 caracteres"),
});

type FormValues = z.infer<typeof FormSchema>;

export default function SignInPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);
    const [serverError, setServerError] = React.useState<string | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: { email: "", password: "",  },
        mode: "onSubmit",
    });

    const onSubmit = async (values: FormValues) => {
        setSubmitting(true);
        setServerError(null);

        const { error } = await authClient.signIn.email(
            {
                email: values.email,
                password: values.password,
                callbackURL: "/dashboard",
    
            },
            {
                onError: (ctx) => setServerError(ctx.error.message),
            }
        );

        setSubmitting(false);
        if (!error) router.push("/dashboard");
    };

    return (
        <div className="min-h-dvh w-full flex items-center justify-center p-6">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Entrar</CardTitle>
                    <CardDescription>
                        Acesse sua conta para continuar.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                                    <EnvelopeClosedIcon className="h-4 w-4 opacity-60" />
                                                </span>
                                                <Input
                                                    placeholder="voce@exemplo.com"
                                                    type="email"
                                                    autoComplete="email"
                                                    className="pl-9"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                                    <LockClosedIcon className="h-4 w-4 opacity-60" />
                                                </span>
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    autoComplete="current-password"
                                                    className="pl-9 pr-10"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((s) => !s)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm hover:bg-muted"
                                                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                                >
                                                    {showPassword ? (
                                                        <EyeClosedIcon className="h-4 w-4" />
                                                    ) : (
                                                        <EyeOpenIcon className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                      
                            <div className="flex items-center justify-between">
                                <a
                                    href="/forgot-password"
                                    className="text-sm underline underline-offset-4 hover:opacity-80"
                                >
                                    Esqueci minha senha
                                </a>
                            </div>

                            {/* Server error */}
                            {serverError && (
                                <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                                    {serverError}
                                </div>
                            )}

                            {/* Submit */}
                            <Button type="submit" variant="outline" className="w-full" disabled={submitting}>
                                {submitting ? (
                                    <>
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Entrando...
                                    </>
                                ) : (
                                    <>
                                        <CheckIcon className="mr-2 h-4 w-4" />
                                        Entrar
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>

                    <Separator className="my-2" />

                    <div className="space-y-5">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            disabled
                            aria-disabled
                            title="Em breve"
                        >
                            <FaceIcon />
                            Entrar com Google (em breve)
                        </Button>


                    </div>
                </CardContent>

                <CardFooter className="flex-col gap-4">
                    <Separator />
                    <p className="text-sm text-muted-foreground">
                        Não tem conta?{" "}
                        <a
                            href="/sign-up"
                            className="font-medium underline underline-offset-4 hover:opacity-80"
                        >
                            Criar conta
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
