"use client";

import { Bell, Menu, Search, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface HeaderProps {
	onMenuClick: () => void;
	sidebarCollapsed: boolean;
	onSidebarToggle: () => void;
}

export function Header({ onMenuClick, onSidebarToggle }: HeaderProps) {
	return (
		<header className='sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='flex h-16 items-center justify-between px-4 lg:px-6'>
				{/* 左侧区域 - 菜单按钮和搜索框 */}
				<div className='flex items-center gap-4'>
					{/* 移动端菜单按钮 */}
					<Button
						variant='ghost'
						size='icon'
						className='lg:hidden'
						onClick={onMenuClick}
					>
						<Menu className='h-5 w-5' />
					</Button>

					{/* 桌面端侧边栏切换按钮 */}
					<Button
						variant='ghost'
						size='icon'
						className='hidden lg:flex'
						onClick={onSidebarToggle}
					>
						<Menu className='h-5 w-5' />
					</Button>

					{/* 搜索框 */}
					<div className='relative w-full max-w-sm'>
						<Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
						<Input
							placeholder='搜索...'
							className='pl-9'
						/>
					</div>
				</div>

				{/* 右侧区域 - 通知、用户菜单、主题切换 */}
				<div className='flex items-center gap-2'>
					{/* 主题切换 - 最右边 */}
					<ThemeToggle />

					{/* 通知按钮 */}
					<Button
						variant='ghost'
						size='icon'
						className='relative'
					>
						<Bell className='h-5 w-5' />
						<Badge
							variant='destructive'
							className='absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs'
						>
							3
						</Badge>
					</Button>

					{/* 用户菜单 */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								className='relative h-9 w-9 rounded-full'
							>
								<Avatar className='h-9 w-9'>
									<AvatarImage
										src='/avatars/01.png'
										alt='@admin'
									/>
									<AvatarFallback>管理员</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-56'
							align='end'
							forceMount
						>
							<DropdownMenuLabel className='font-normal'>
								<div className='flex flex-col space-y-1'>
									<p className='text-sm font-medium leading-none'>管理员</p>
									<p className='text-xs leading-none text-muted-foreground'>admin@example.com</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<User className='mr-2 h-4 w-4' />
								<span>个人资料</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings className='mr-2 h-4 w-4' />
								<span>设置</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<LogOut className='mr-2 h-4 w-4' />
								<span>退出登录</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
