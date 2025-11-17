import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import { Task, TaskFilters as TaskFiltersType } from "@/types/task";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TaskForm } from "@/components/TaskForm";
import { TaskItem } from "@/components/TaskItem";
import { TaskFilters } from "@/components/TaskFilters";
import { TaskStats } from "@/components/TaskStats";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, ChevronLeft, ChevronRight, Moon, Sun, Settings } from "lucide-react"; // Added Settings icon
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate(); // Added for navigation
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [categories, setCategories] = useLocalStorage<string[]>("categories", [
    "Công Việc",
    "Cá Nhân",
    "Mua Sắm",
  ]);
  const [filters, setFilters] = useState<TaskFiltersType>({
    status: "all",
    searchQuery: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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

  const handleAddTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    toast.success("Thêm Task thành công!", {
      description: taskData.text,
      icon: <CheckCircle2 className="h-4 w-4" />,
    });
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : undefined,
            }
          : task
      )
    );
    const task = tasks.find((t) => t.id === id);
    if (task) {
      toast.success(
        task.completed ? "Task đang làm việc." : "Task đã hoàn thành!",
        {
          description: task.text,
        }
      );
    }
  };

  const handleDeleteTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    setTasks(tasks.filter((task) => task.id !== id));
    if (task) {
      toast.success("Task đã xóa", {
        description: task.text,
      });
    }
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)));
    toast.success("Task đã cập nhật");
  };

  const handleAddCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Status filter
      if (filters.status === "active" && task.completed) return false;
      if (filters.status === "completed" && !task.completed) return false;

      // Priority filter
      if (filters.priority && task.priority !== filters.priority) return false;

      // Category filter
      if (filters.category && task.category !== filters.category) return false;

      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          task.text.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query) ||
          task.category?.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [tasks, filters]);

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClearCompleted = () => {
    const completedCount = tasks.filter((t) => t.completed).length;
    setTasks(tasks.filter((task) => !task.completed));
    toast.success(`Đã xóa ${completedCount} task ${completedCount !== 1 ? "s" : ""} đã hoàn thành`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/settings')}
            className="flex-shrink-0"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <div className="text-center flex-1">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Task Manager
              </h1>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="ml-4"
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-muted-foreground text-lg">
              Quản lý tác vụ của bạn dễ dàng hơn và đẹp mắt hơn
            </p>
          </div>
        </div>

        {/* Stats */}
        <TaskStats tasks={tasks} />

        {/* Task Form */}
        <TaskForm
          onAddTask={handleAddTask}
          categories={categories}
          onAddCategory={handleAddCategory}
        />

        {/* Filters */}
        <TaskFilters
          filters={filters}
          categories={categories}
          onFilterChange={setFilters}
        />

        {/* Task List */}
        <div className="space-y-3">
          {paginatedTasks.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Không tìm thấy tác vụ</h3>
              <p className="text-muted-foreground">
                {filters.status === "completed"
                  ? "Chưa có tác vụ hoàn thành. Tiếp tục hoàn thành mục tiêu của bạn!"
                  : filters.searchQuery
                  ? "Thử thay đổi bộ lọc hoặc nhập lại tiêu đề tác vụ"
                  : "Hãy thử thêm tác vụ đầu tiên của bạn"}
              </p>
            </div>
          ) : (
            <>
              {paginatedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  onUpdate={handleUpdateTask}
                />
              ))}

              {tasks.some((t) => t.completed) && (
                <div className="pt-4 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={handleClearCompleted}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    Xóa Task đã hoàn thành
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Trước
            </Button>
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  onClick={() => handlePageChange(page)}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              Sau
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>💡 Mẹo: Sử dụng bàn phím để thao tác nhanh hơn</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
