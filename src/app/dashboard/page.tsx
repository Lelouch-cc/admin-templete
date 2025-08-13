import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

const stats = [
  {
    title: "总用户数",
    value: "2,429",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "活跃用户",
    value: "1,234",
    change: "+15.3%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "总订单",
    value: "789",
    change: "-2.1%",
    changeType: "negative" as const,
    icon: ShoppingCart,
  },
  {
    title: "总收入",
    value: "¥45,231",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: BarChart3,
  },
]

const recentActivity = [
  {
    user: "张三",
    action: "创建了新订单",
    time: "2分钟前",
    amount: "¥299.00",
  },
  {
    user: "李四",
    action: "更新了个人资料",
    time: "5分钟前",
  },
  {
    user: "王五",
    action: "完成了支付",
    time: "10分钟前",
    amount: "¥199.00",
  },
  {
    user: "赵六",
    action: "注册了新账户",
    time: "15分钟前",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">仪表盘</h1>
        <p className="text-muted-foreground">
          欢迎回来，这是您的管理后台概览。
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  {stat.changeType === "positive" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                  )}
                  <span
                    className={
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {stat.change}
                  </span>
                  <span>相比上月</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* 图表区域 */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>收入概览</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              图表组件将在此处显示
            </div>
          </CardContent>
        </Card>

        {/* 最近活动 */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
            <CardDescription>
              您的平台上的最新用户活动。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user} {activity.action}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                      {activity.amount && (
                        <p className="text-xs font-medium text-green-600">
                          {activity.amount}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}