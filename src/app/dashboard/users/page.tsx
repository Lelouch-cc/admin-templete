"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Plus, Search, UserPlus } from "lucide-react"

const users = [
  {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com",
    role: "管理员",
    status: "active",
    avatar: "",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "李四",
    email: "lisi@example.com",
    role: "用户",
    status: "active",
    avatar: "",
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    name: "王五",
    email: "wangwu@example.com",
    role: "用户",
    status: "inactive",
    avatar: "",
    createdAt: "2024-02-01",
  },
  {
    id: 4,
    name: "赵六",
    email: "zhaoliu@example.com",
    role: "编辑",
    status: "active",
    avatar: "",
    createdAt: "2024-02-10",
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleBadge = (role: string) => {
    const variants = {
      "管理员": "destructive" as const,
      "编辑": "secondary" as const,
      "用户": "outline" as const,
    }
    return variants[role as keyof typeof variants] || "outline"
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? "default" as const : "secondary" as const
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">用户管理</h1>
          <p className="text-muted-foreground">
            管理系统用户和权限设置。
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          添加用户
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>用户列表</CardTitle>
          <CardDescription>
            系统中所有用户的列表，可以进行搜索、编辑和管理。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 py-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索用户..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">头像</TableHead>
                  <TableHead>姓名</TableHead>
                  <TableHead>邮箱</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadge(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(user.status)}>
                        {user.status === "active" ? "活跃" : "禁用"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">打开菜单</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>操作</DropdownMenuLabel>
                          <DropdownMenuItem>查看详情</DropdownMenuItem>
                          <DropdownMenuItem>编辑用户</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>重置密码</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            删除用户
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              没有找到匹配的用户
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}