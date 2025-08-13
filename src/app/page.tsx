import { redirect } from "next/navigation"

export default function Home() {
  // 在实际应用中，这里应该检查用户的登录状态
  // 如果未登录则跳转到登录页，已登录则跳转到仪表盘
  
  // 暂时直接跳转到登录页
  redirect("/login")
}
