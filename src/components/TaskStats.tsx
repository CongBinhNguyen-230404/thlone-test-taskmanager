import { Task } from "@/types/task";
import { Card } from "./ui/card";
import { CheckCircle2, Circle, Clock, TrendingUp } from "lucide-react";

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const highPriorityTasks = tasks.filter((t) => t.priority === "high" && !t.completed).length;

  const stats = [
    {
      label: "Tổng số lượng Tasks",
      value: totalTasks,
      icon: Circle,
      color: "text-foreground",
    },
    {
      label: "Đang Làm",
      value: activeTasks,
      icon: Clock,
      color: "text-primary",
    },
    {
      label: "Đã Hoàn Thành",
      value: completedTasks,
      icon: CheckCircle2,
      color: "text-success",
    },
    {
      label: "Tỉ Lệ Hoàn Thành",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "text-accent",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="p-4 hover:shadow-lg transition-all duration-300 animate-scale-in border-border/50"
        >
          <div className="flex items-center justify-between mb-2">
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
            {stat.label === "Completion Rate" && highPriorityTasks > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-priority-high/10 text-priority-high font-medium">
                {highPriorityTasks} high priority
              </span>
            )}
          </div>
          <div className="text-2xl font-bold mb-1">{stat.value}</div>
          <div className="text-xs text-muted-foreground">{stat.label}</div>
        </Card>
      ))}
    </div>
  );
}
