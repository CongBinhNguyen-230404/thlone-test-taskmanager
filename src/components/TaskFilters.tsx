import { TaskFilters as TaskFiltersType, TaskStatus, Priority } from "@/types/task";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "./ui/badge";

interface TaskFiltersProps {
  filters: TaskFiltersType;
  categories: string[];
  onFilterChange: (filters: TaskFiltersType) => void;
}

export function TaskFilters({ filters, categories, onFilterChange }: TaskFiltersProps) {
  const hasActiveFilters =
    filters.status !== "all" || filters.priority || filters.category || filters.searchQuery;

  const clearFilters = () => {
    onFilterChange({
      status: "all",
      searchQuery: "",
      priority: undefined,
      category: undefined,
    });
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm tác vụ..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={filters.status}
            onValueChange={(value) =>
              onFilterChange({ ...filters, status: value as TaskStatus })
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toàn bộ Tác Vụ</SelectItem>
              <SelectItem value="active">Đang Làm</SelectItem>
              <SelectItem value="completed">Đã Hoàn Thành</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="outline" size="icon" onClick={clearFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={filters.priority === undefined ? "secondary" : "outline"}
          size="sm"
          onClick={() => onFilterChange({ ...filters, priority: undefined })}
          className="h-8"
        >
          Toàn Bộ Ưu Tiên
        </Button>
        <Button
          variant={filters.priority === "high" ? "default" : "outline"}
          size="sm"
          onClick={() =>
            onFilterChange({
              ...filters,
              priority: filters.priority === "high" ? undefined : "high",
            })
          }
          className="h-8"
        >
          Cao
        </Button>
        <Button
          variant={filters.priority === "medium" ? "default" : "outline"}
          size="sm"
          onClick={() =>
            onFilterChange({
              ...filters,
              priority: filters.priority === "medium" ? undefined : "medium",
            })
          }
          className="h-8"
        >
          Thường
        </Button>
        <Button
          variant={filters.priority === "low" ? "default" : "outline"}
          size="sm"
          onClick={() =>
            onFilterChange({
              ...filters,
              priority: filters.priority === "low" ? undefined : "low",
            })
          }
          className="h-8"
        >
          Thấp
        </Button>

        {categories.length > 0 && (
          <>
            <div className="w-px h-8 bg-border" />
            <Button
              variant={filters.category === undefined ? "secondary" : "outline"}
              size="sm"
              onClick={() => onFilterChange({ ...filters, category: undefined })}
              className="h-8"
            >
              Toàn Bộ Danh Mục
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={filters.category === category ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    category: filters.category === category ? undefined : category,
                  })
                }
                className="h-8"
              >
                {category}
              </Button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
