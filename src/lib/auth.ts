// 简单的认证状态管理
export const auth = {
  // 检查是否已登录
  isAuthenticated: () => {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem('token')
  },

  // 登录
  login: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  },

  // 登出
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
  },

  // 获取 token
  getToken: () => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('token')
  }
}

// 模拟登录 API
export const mockLogin = async (email: string, password: string) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 简单的模拟验证
  if (email === 'admin@example.com' && password === '123456') {
    const token = 'mock-token-' + Date.now()
    return { success: true, token, user: { name: '管理员', email } }
  }
  
  throw new Error('邮箱或密码错误')
}