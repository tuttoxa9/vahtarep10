"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export interface FilterState {
  search: string;
  salaryMin: string;
  salaryMax: string;
  location: string;
  employmentType: string;
  experience: string;
  sortBy: string;
}

interface VacancyFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  resultsCount: number;
}

const SORT_OPTIONS = [
  { value: "date", label: "По дате" },
  { value: "salary", label: "По зарплате" },
  { value: "views", label: "По популярности" },
];

const EMPLOYMENT_TYPES = [
  { value: "all", label: "Все типы" },
  { value: "вахтовым методом", label: "Вахтовым методом" },
  { value: "полная занятость", label: "Полная занятость" },
  { value: "частичная занятость", label: "Частичная занятость" },
  { value: "сменная работа", label: "Сменная работа" },
];

const EXPERIENCE_LEVELS = [
  { value: "all", label: "Любой опыт" },
  { value: "без опыта", label: "Без опыта" },
  { value: "от 1 года", label: "От 1 года" },
  { value: "от 3 лет", label: "От 3 лет" },
  { value: "от 5 лет", label: "От 5 лет" },
];

export default function VacancyFilters({ onFiltersChange, resultsCount }: VacancyFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    salaryMin: "",
    salaryMax: "",
    location: "",
    employmentType: "all",
    experience: "all",
    sortBy: "date",
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      salaryMin: "",
      salaryMax: "",
      location: "",
      employmentType: "all",
      experience: "all",
      sortBy: "date",
    });
    setShowAdvanced(false);
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) =>
    key !== "sortBy" && value !== "" && value !== "all"
  );

  const getActiveFiltersCount = () => {
    return Object.entries(filters).filter(([key, value]) =>
      key !== "sortBy" && value !== "" && value !== "all"
    ).length;
  };

  return (
    <Card className="p-6 mb-8 bg-white/90 backdrop-blur-md border-border/30 shadow-medium">
      {/* Основная строка поиска */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Поиск по названию, описанию..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10 h-12 text-base border-border/50 focus:border-primary"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={showAdvanced ? "default" : "outline"}
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="h-12 px-4 border-border/50"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Фильтры
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="h-12 px-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-2" />
              Очистить
            </Button>
          )}
        </div>
      </div>

      {/* Расширенные фильтры */}
      {showAdvanced && (
        <div className="border-t border-border/30 pt-6 space-y-4">
          {/* Зарплата */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Зарплата от (₽)
              </label>
              <Input
                type="number"
                placeholder="От"
                value={filters.salaryMin}
                onChange={(e) => updateFilter("salaryMin", e.target.value)}
                className="border-border/50 focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Зарплата до (₽)
              </label>
              <Input
                type="number"
                placeholder="До"
                value={filters.salaryMax}
                onChange={(e) => updateFilter("salaryMax", e.target.value)}
                className="border-border/50 focus:border-primary"
              />
            </div>
          </div>

          {/* Локация */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Регион/Город
            </label>
            <Input
              placeholder="Введите город или регион..."
              value={filters.location}
              onChange={(e) => updateFilter("location", e.target.value)}
              className="border-border/50 focus:border-primary"
            />
          </div>

          {/* Тип занятости и опыт */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Тип занятости
              </label>
              <Select
                value={filters.employmentType}
                onValueChange={(value) => updateFilter("employmentType", value)}
              >
                <SelectTrigger className="border-border/50 focus:border-primary">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYMENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Опыт работы
              </label>
              <Select
                value={filters.experience}
                onValueChange={(value) => updateFilter("experience", value)}
              >
                <SelectTrigger className="border-border/50 focus:border-primary">
                  <SelectValue placeholder="Выберите опыт" />
                </SelectTrigger>
                <SelectContent>
                  {EXPERIENCE_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Сортировка и результаты */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 pt-4 border-t border-border/30">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Сортировать:</span>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => updateFilter("sortBy", value)}
          >
            <SelectTrigger className="w-auto min-w-[140px] border-border/50 focus:border-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground">
          Найдено вакансий: <span className="font-medium text-foreground">{resultsCount}</span>
        </div>
      </div>
    </Card>
  );
}
