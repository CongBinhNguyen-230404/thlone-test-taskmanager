import { useState } from "react";
import { Task } from "@/types/task";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import {
  Trash2,
  Edit2,
  Check,
  X,
  Calendar,
  Tag,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

export function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDescription, setEditDescription] = useState(task.description || "");

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(task.id, {
        text: editText.trim(),
        description: editDescription.trim() || undefined,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(task.text);
    setEditDescription(task.description || "");
    setIsEditing(false);
  };

  const priorityColors = {
    high: "bg-priority-high/10 text-priority-high border-priority-high/20",
    medium: "bg-priority-medium/10 text-priority-medium border-priority-medium/20",
    low: "bg-priority-low/10 text-priority-low border-priority-low/20",
  };

  const priorityBorder = {
    high: "border-l-4 border-l-priority-high",
    medium: "border-l-4 border-l-priority-medium",
    low: "border-l-4 border-l-priority-low",
  };

  return (
    <Card
      className={cn(
        "p-4 transition-all duration-300 hover:shadow-md animate-slide-up",
        priorityBorder[task.priority],
        task.completed && "opacity-60"
      )}
    >
      {isEditing ? (
        <div className="space-y-3">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            autoFocus
          />
          <Textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Mô Tả (Có thể thêm hoặc không)"
            rows={2}
            className="resize-none"
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm">
              <Check className="h-4 w-4 mr-1" />
              Lưu
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm">
              <X className="h-4 w-4 mr-1" />
              Hủy
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggle(task.id)}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  "font-medium text-base break-words",
                  task.completed && "line-through text-muted-foreground"
                )}
              >
                {task.text}
              </h3>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1 break-words">
                  {task.description}
                </p>
              )}
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(task.id)}
                className="h-8 w-8 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="outline" className={priorityColors[task.priority]}>
              <AlertCircle className="h-3 w-3 mr-1" />
              {task.priority}
            </Badge>

            {task.dueDate && (
              <Badge variant="outline">
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(task.dueDate), "MMM dd")}
              </Badge>
            )}

            {task.category && (
              <Badge variant="outline">
                <Tag className="h-3 w-3 mr-1" />
                {task.category}
              </Badge>
            )}

            {task.completedAt && (
              <span className="text-xs text-muted-foreground ml-auto">
                Đã Hoàn Thành {format(new Date(task.completedAt), "MMM dd, yyyy")}
              </span>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
