import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPassword from './ForgotPassword';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 bg-transparent border-0">
        {mode === 'login' && (
          <LoginForm 
            onSwitchToRegister={() => setMode('register')}
            onForgotPassword={() => setMode('forgot')}
          />
        )}
        {mode === 'register' && (
          <RegisterForm onSwitchToLogin={() => setMode('login')} />
        )}
        {mode === 'forgot' && (
          <ForgotPassword onBack={() => setMode('login')} />
        )}
      </DialogContent>
    </Dialog>
  );
}