import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ArrowLeft } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="flex items-center mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Cài Đặt
          </h1>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {/* Theme Settings */}
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Theme</h2>
            <p className="text-muted-foreground mb-4">
              Chọn Theme cho web.
            </p>
            <div className="flex items-center gap-4">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => setTheme('light')}
                className="flex items-center gap-2"
              >
                <Sun className="h-4 w-4" />
                Sáng
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => setTheme('dark')}
                className="flex items-center gap-2"
              >
                <Moon className="h-4 w-4" />
                Tối
              </Button>
            </div>
          </div>

          {/* Placeholder for Additional Settings */}
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <p className="text-muted-foreground mb-4">
              Quản lý các tag của bạn. (Sắp ra mắt)
            </p>
            <Button variant="outline" disabled>
              Chỉnh sửa tag
            </Button>
          </div>

          {/* Placeholder for More Settings */}
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <p className="text-muted-foreground mb-4">
              Điều chỉnh thông báo (Sắp ra mắt)
            </p>
            <Button variant="outline" disabled>
              Quản lý thông báo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;