"use client";

import Link from "next/link";
import { formatSalary } from "@/lib/utils";
import type { FirestoreVacancy } from "@/types";

interface VacancyCardProps {
  vacancy: FirestoreVacancy;
  index?: number;
}

export default function VacancyCard({ vacancy, index = 0 }: VacancyCardProps) {
  const {
    id,
    title,
    company,
    location,
    salary,
    experience,
    employment_type,
    paymentPeriodDays,
  } = vacancy;

  return (
    <div
      className="card-depth rounded-xl p-3 border border-border/30 bg-white/90 backdrop-blur-md shadow-[0_2px_8px_rgba(60,60,120,0.10),0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <Link
        href={`/vacancies/${id}`}
        className="flex flex-col h-full hover:no-underline"
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-foreground line-clamp-2 mb-1 drop-shadow-sm">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm font-medium mb-2">
              {company}
            </p>
          </div>
          <div className={`rounded-full px-3 py-1 font-semibold text-sm shrink-0 ml-2 shadow-sm border ${
            employment_type && (employment_type.toLowerCase().includes('вахтовым методом') || employment_type.toLowerCase().includes('вахтовый метод'))
              ? 'bg-red-500/10 text-red-600 border-red-500/20'
              : 'bg-accent/10 text-accent border-accent/20'
          }`}>
            {employment_type}
          </div>
        </div>

        <div className="space-y-1.5 flex-1 mb-2">
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground mr-2 font-medium">Локация:</span>
            <span className="text-foreground/80">{location}</span>
          </div>

          <div className="flex items-center text-sm">
            <span className="text-muted-foreground mr-2 font-medium">Опыт:</span>
            <span className="text-foreground/80">{experience}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto pt-2 border-t border-border/30">
          <div className="flex flex-col">
            <div className="text-xl font-bold text-primary drop-shadow-sm">
              {formatSalary(salary)}
            </div>
            {paymentPeriodDays && (
              <div className="text-xs text-muted-foreground mt-0.5">
                За {paymentPeriodDays} {paymentPeriodDays === 1 ? 'день' : paymentPeriodDays <= 4 ? 'дня' : 'дней'}
              </div>
            )}
          </div>
          <div className="btn-depth rounded-lg bg-primary hover:bg-primary/90 text-white px-3 py-1.5 text-xs font-medium transition-all shadow-lg shadow-primary/20">
            Подробнее
          </div>
        </div>
      </Link>
    </div>
  );
}
