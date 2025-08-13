"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ShoppingCart, Package, Settings, BarChart3, FileText, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface SidebarProps {
	open: boolean;
	collapsed: boolean;
	onOpenChange: (open: boolean) => void;
	onCollapsedChange: (collapsed: boolean) => void;
}

const navigation = [
	{
		name: "仪表盘",
		href: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		name: "用户管理",
		href: "/dashboard/users",
		icon: Users,
	},
	{
		name: "订单管理",
		href: "/dashboard/orders",
		icon: ShoppingCart,
	},
	{
		name: "产品管理",
		href: "/dashboard/products",
		icon: Package,
	},
	{
		name: "数据统计",
		href: "/dashboard/analytics",
		icon: BarChart3,
	},
	{
		name: "文档管理",
		href: "/dashboard/documents",
		icon: FileText,
	},
	{
		name: "权限管理",
		href: "/dashboard/permissions",
		icon: Shield,
	},
	{
		name: "系统设置",
		href: "/dashboard/settings",
		icon: Settings,
	},
];

function SidebarContent({ collapsed }: { collapsed: boolean; onCollapsedChange: (collapsed: boolean) => void }) {
	const pathname = usePathname();

	return (
		<div className='flex h-full flex-col'>
			{/* Logo 区域 */}
			<div className='flex h-16 items-center justify-between border-b px-4'>
				<div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
					<div className='flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground'>
						<LayoutDashboard className='h-4 w-4' />
					</div>
					{!collapsed && <span className='text-lg font-semibold'>管理后台</span>}
				</div>
			</div>

			{/* 导航菜单 */}
			<ScrollArea className='flex-1 px-3'>
				<div className='space-y-2 py-4'>
					{navigation.map((item) => {
						const isActive = pathname === item.href;
						const Icon = item.icon;

						return (
							<Link
								key={item.name}
								href={item.href}
							>
								<Button
									variant={isActive ? "secondary" : "ghost"}
									className={cn("w-full justify-start gap-2", collapsed && "justify-center px-2", isActive && "bg-secondary")}
								>
									<Icon className='h-4 w-4 flex-shrink-0' />
									{!collapsed && <span>{item.name}</span>}
								</Button>
							</Link>
						);
					})}
				</div>
			</ScrollArea>

			<Separator />

			{/* 底部信息 */}
			<div className='p-4'>
				<div className={cn("text-xs text-muted-foreground", collapsed && "text-center")}>{collapsed ? "v1.0" : "Admin Template v1.0"}</div>
			</div>
		</div>
	);
}

export function Sidebar({ open, collapsed, onOpenChange, onCollapsedChange }: SidebarProps) {
	return (
		<>
			{/* 桌面端侧边栏 */}
			<div
				className={cn(
					"fixed inset-y-0 left-0 z-50 hidden border-r bg-background transition-all duration-300 lg:block",
					collapsed ? "w-16" : "w-64"
				)}
			>
				<SidebarContent
					collapsed={collapsed}
					onCollapsedChange={onCollapsedChange}
				/>
			</div>

			{/* 移动端侧边栏 */}
			<Sheet
				open={open}
				onOpenChange={onOpenChange}
			>
				<SheetContent
					side='left'
					className='w-64 p-0 lg:hidden'
				>
					<SidebarContent
						collapsed={false}
						onCollapsedChange={() => {}}
					/>
				</SheetContent>
			</Sheet>
		</>
	);
}
