
import { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UserProfile = () => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-12 w-12 rounded-full p-0 hover:bg-gray-100/80 transition-all duration-200 shadow-sm border border-gray-200/50">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="h-11 w-11 rounded-full object-cover border-2 border-white shadow-sm"
            />
          ) : (
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-md border-2 border-white">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-semibold leading-none text-gray-900">{displayName}</p>
            <p className="text-xs leading-none text-gray-500">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem className="p-3 cursor-default">
          <User className="mr-3 h-4 w-4 text-blue-600" />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">Profile</span>
            <div className="text-xs text-gray-500 mt-1 space-y-1">
              <div>Name: {displayName}</div>
              <div>Email: {user.email}</div>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem 
          onClick={handleSignOut} 
          disabled={loading}
          className="p-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span className="font-medium">{loading ? 'Signing out...' : 'Sign out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
