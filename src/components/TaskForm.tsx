import { useState } from "react";
import { Task, Priority } from "@/types/task";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Plus, Calendar as CalendarIcon, Tag, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskFormProps {
  onAddTask: (task: Omit<Task, "id" | "createdAt">) => void;
  categories: string[];
  onAddCategory: (category: string) => void;
}

export function TaskForm({ onAddTask, categories, onAddCategory }: TaskFormProps) {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState<Date>();
  const [category, setCategory] = useState<string>("");
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setCategory(newCategory.trim());
    }

    onAddTask({
      text: text.trim(),
      description: description.trim() || undefined,
      completed: false,
      priority,
      dueDate: dueDate ? format(dueDate, "yyyy-MM-dd") : undefined,
      category: category || undefined,
    });

    setText("");
    setDescription("");
    setPriority("medium");
    setDueDate(undefined);
    setCategory("");
    setNewCategory("");
    setShowNewCategory(false);
  };

  const handleAddNewCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setCategory(newCategory.trim());
      setNewCategory("");
      setShowNewCategory(false);
    }
  };

  return (
    <Card className="p-6 mb-6 border-border/50 shadow-md animate-slide-down">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Tiêu Đề Tác Vụ"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-lg font-medium"
            autoFocus
          />
        </div>

        <div>
          <Textarea
            placeholder="Mô Tả (Có thể thêm hoặc không)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-priority-high" />
                  Ưu Tiên Cao
                </span>
              </SelectItem>
              <SelectItem value="medium">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-priority-medium" />
                  Ưu Tiên Thường
                </span>
              </SelectItem>
              <SelectItem value="low">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-priority-low" />
                  Ưu Tiên Thấp
                </span>
              </SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !dueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, "MMM dd, yyyy") : "Ngày Tới Hạn  "}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
            </PopoverContent>
          </Popover>

          {!showNewCategory ? (
            <Select value={category || "none"} onValueChange={(val) => setCategory(val === "none" ? "" : val)}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Không có danh mục</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowNewCategory(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Danh Mục Mới
                </Button>
              </SelectContent>
            </Select>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="New category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddNewCategory();
                  }
                }}
              />
              <Button type="button" size="icon" onClick={handleAddNewCategory}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={!text.trim()}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm Tác Vụ
        </Button>
      </form>
    </Card>
  );
}
