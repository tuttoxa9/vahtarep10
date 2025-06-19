"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
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

// Популярные города для быстрого выбора
const POPULAR_CITIES = [
  "Москва",
  "Санкт-Петербург",
  "Московская область",
  "Калужская область",
  "Тула",
  "Рязань",
  "Калуга",
  "Пушкино",
  "Домодедово",
  "Щелково",
  "Минск",
  "Брест",
  "Гомель"
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

  const [isExpanded, setIsExpanded] = useState(false);

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
    <Card className="p-4 sm:p-6 bg-white border-border/30 shadow-lg sticky-sidebar">
      {/* Заголовок и результаты */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold">Фильтры</h3>
            {hasActiveFilters && (
              <Badge variant="secondary" className="text-xs lg:hidden">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground p-1 hidden sm:flex"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden flex items-center gap-1 text-muted-foreground hover:text-foreground p-1"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground">
          Найдено: <span className="font-medium text-foreground">{resultsCount}</span>
        </div>
      </div>

      {/* Фильтры контент - скрываемый на мобильных */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        {/* Поиск */}
        <div className="mb-4 sm:mb-6">
        <label className="text-sm font-medium text-foreground mb-2 block">
          Поиск
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Название, описание..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10 border-border/50 focus:border-primary"
          />
        </div>
        </div>

        {/* Зарплата */}
        <div className="mb-4 sm:mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Зарплата (₽)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="От"
            value={filters.salaryMin}
            onChange={(e) => updateFilter("salaryMin", e.target.value)}
            className="border-border/50 focus:border-primary text-sm"
          />
          <Input
            type="number"
            placeholder="До"
            value={filters.salaryMax}
            onChange={(e) => updateFilter("salaryMax", e.target.value)}
            className="border-border/50 focus:border-primary text-sm"
          />
        </div>
        </div>

        {/* Город/Регион */}
        <div className="mb-4 sm:mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Город/Регион
        </label>
        <Input
          placeholder="Введите город..."
          value={filters.location}
          onChange={(e) => updateFilter("location", e.target.value)}
          className="border-border/50 focus:border-primary mb-3"
        />

        {/* Популярные города */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground mb-2">Популярные:</p>
          <div className="flex flex-wrap gap-1">
            {POPULAR_CITIES.slice(0, 6).map((city) => (
              <button
                key={city}
                onClick={() => updateFilter("location", city)}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  filters.location === city
                    ? 'bg-primary text-white'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
        </div>

        {/* Тип занятости */}
        <div className="mb-4 sm:mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
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

        {/* Опыт работы */}
        <div className="mb-4 sm:mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
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

        {/* Сортировка */}
        <div className="mb-4">
        <label className="text-sm font-medium text-foreground mb-3 block">
          Сортировка
        </label>
        <Select
          value={filters.sortBy}
          onValueChange={(value) => updateFilter("sortBy", value)}
        >
          <SelectTrigger className="border-border/50 focus:border-primary">
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

        {/* Активные фильтры */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-border/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Активные фильтры:</span>
              <Badge variant="secondary" className="text-xs hidden sm:block">
                {getActiveFiltersCount()}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="w-full text-sm"
            >
              Очистить все
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
