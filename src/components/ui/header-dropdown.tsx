"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/functions';
import { LucideIcon } from 'lucide-react';

interface HeaderDropdownItemProps {
  href: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
}

interface HeaderDropdownProps {
  label: string;
  items: HeaderDropdownItemProps[];
  className?: string;
}

export function HeaderDropdown({
  label,
  items,
  className,
}: HeaderDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "text-gray-300 hover:text-white hover:bg-red-950/20 flex items-center gap-1",
            className
          )}
        >
          {label}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="center" 
        className="w-56 bg-black/90 border-red-500/30 text-white"
      >
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-red-500/20" />
        {items.map((item, index) => (
          <DropdownMenuItem 
            key={index} 
            asChild
            className="cursor-pointer hover:bg-red-950/40 focus:bg-red-950/40"
          >
            <Link href={item.href} className="flex items-center gap-2 w-full">
              {item.icon && <item.icon className="h-4 w-4 text-red-400" />}
              <div className="flex flex-col">
                <span>{item.label}</span>
                {item.description && (
                  <span className="text-xs text-gray-400">{item.description}</span>
                )}
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
