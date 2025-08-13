"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff, Github, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const loginSchema = z.object({
  email: z.string().email("请输入有效的邮箱地址"),
  password: z.string().min(6, "密码至少6个字符"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    
    try {
      // 调用模拟登录 API
      const { mockLogin } = await import("@/lib/auth")
      const response = await mockLogin(data.email, data.password)
      
      // 保存 token
      const { auth } = await import("@/lib/auth")
      auth.login(response.token)
      
      console.log("登录成功:", response.user)
      
      // 登录成功后跳转到仪表盘
      router.push("/dashboard")
    } catch (error: any) {
      console.error("登录失败:", error.message)
      // 这里可以显示错误提示
      form.setError("email", { message: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`使用 ${provider} 登录`)
    // 这里可以实现社交登录逻辑
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo 和标题 */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white dark:bg-black rounded-sm"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Shadcn Admin
            </h1>
          </div>
        </div>

        {/* 登录卡片 */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center">Login</CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              Enter your email and password below to log into your account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* 邮箱字段 */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 密码字段 */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Password
                        </FormLabel>
                        <Link 
                          href="/forgot-password" 
                          className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="h-11 pr-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 登录按钮 */}
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200" 
                  disabled={isLoading}
                >
                  {isLoading ? "登录中..." : "Login"}
                </Button>
              </form>
            </Form>

            {/* 分隔线 */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            {/* 社交登录按钮 */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-11"
                onClick={() => handleSocialLogin("GitHub")}
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button
                variant="outline"
                className="h-11"
                onClick={() => handleSocialLogin("Facebook")}
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
            </div>

            {/* 服务条款 */}
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
              By clicking login, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                Privacy Policy
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        {/* 注册链接 */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link 
              href="/register" 
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}