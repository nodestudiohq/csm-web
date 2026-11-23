// components/theme-toggle.tsx
'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Icons swap with CSS only (the `dark` class is set before hydration), so no theme state is read during render.
function Icons() {
    return (
        <>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </>
    );
}

const buttonProps = {
    variant: 'ghost' as const,
    size: 'icon' as const,
    'aria-label': 'Change colour theme',
    className: 'cm-fg cm-hover-surface-2',
};

export function ThemeToggle() {
    const { setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    // Server render and first client render are the same plain button.
    // Radix generates ids for the dropdown, and those can differ between server and client,
    // which is what causes the hydration error. Mounting the menu after hydration avoids it.
    if (!mounted) {
        return (
            <Button {...buttonProps} type="button">
                <Icons />
            </Button>
        );
    }

    return (
        <DropdownMenu>
            {/* Base UI: pass the Button through `render`, not `asChild` */}
            <DropdownMenuTrigger render={<Button {...buttonProps} />}>
                <Icons />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
