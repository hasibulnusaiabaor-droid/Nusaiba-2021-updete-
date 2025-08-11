import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Phone, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { database } from '@/lib/database';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
}

export default function LoginForm({ onSwitchToRegister, onForgotPassword }: LoginFormProps) {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  
  const { login, isLoading, error, loginWithUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.emailOrPhone, formData.password);
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const profile = {
        name: provider === 'google' ? 'Google User' : provider === 'facebook' ? 'Facebook User' : 'Apple User',
        email: provider === 'google' ? 'user@gmail.com' : provider === 'facebook' ? 'user@facebook.com' : 'user@apple.com',
        profilePicture:
          provider === 'google'
            ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            : provider === 'facebook'
            ? 'https://images.unsplash.com/photo-1494790108755-2616b332c6a8?w=150&h=150&fit=crop&crop=face'
            : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        username: provider === 'google' ? 'google_user' : provider === 'facebook' ? 'fb_user' : 'apple_user',
      };
      const user = await database.socialSignInOrRegister({ ...profile, provider });
      loginWithUser(user);
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      alert(`${provider} login is currently unavailable. Please try email login.`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <p className="text-gray-500">Sign in to continue to Nusaiba</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Social Login */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSocialLogin('google')}
          >
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('facebook')}
            >
              <div className="w-4 h-4 mr-2 bg-blue-600 rounded"></div>
              Facebook
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('apple')}
            >
              <div className="w-4 h-4 mr-2 bg-black rounded"></div>
              Apple
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Login Method Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <Button
            type="button"
            variant={loginMethod === 'email' ? 'default' : 'ghost'}
            className="flex-1 h-8"
            onClick={() => setLoginMethod('email')}
          >
            <Mail className="h-4 w-4 mr-1" />
            Email
          </Button>
          <Button
            type="button"
            variant={loginMethod === 'phone' ? 'default' : 'ghost'}
            className="flex-1 h-8"
            onClick={() => setLoginMethod('phone')}
          >
            <Phone className="h-4 w-4 mr-1" />
            Phone
          </Button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emailOrPhone">
              {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
            </Label>
            <Input
              id="emailOrPhone"
              type={loginMethod === 'email' ? 'email' : 'tel'}
              placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
              value={formData.emailOrPhone}
              onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 text-center">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="text-center">
          <Button 
            type="button"
            variant="link" 
            className="text-sm text-purple-600 hover:text-purple-700"
            onClick={onForgotPassword}
          >
            Forgot your password?
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Button variant="link" onClick={onSwitchToRegister} className="text-purple-600 p-0">
            Sign up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}