'use client';

import Link from 'next/link';
import { Menu, Search, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="border-b bg-black border-zinc-900 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-white">
                    <GraduationCap className="h-8 w-8" />
                    <span>EduRank Nepal</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                    <Link href="/" className="hover:text-white transition-colors">
                        Home
                    </Link>
                    <Link href="/search?type=PRESCHOOL" className="hover:text-white transition-colors">
                        Preschools
                    </Link>
                    <Link href="/search?type=SCHOOL" className="hover:text-white transition-colors">
                        Schools
                    </Link>
                    <Link href="/search?type=COLLEGE" className="hover:text-white transition-colors">
                        Colleges
                    </Link>
                    <Link href="/search?type=TECHNICAL_SCHOOL" className="hover:text-white transition-colors">
                        Technical
                    </Link>
                    <Link href="/search?type=CONSULTANCY" className="hover:text-yellow-500 transition-colors font-semibold">
                        Consultancy
                    </Link>
                    <Link href="/search?type=TRAINING_CENTER" className="hover:text-white transition-colors">
                        Training
                    </Link>
                    <Link href="/compare" className="hover:text-white transition-colors">
                        Compare
                    </Link>
                    <div className="flex items-center gap-2 ml-4">
                        <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white mr-4">
                            Sign In
                        </Link>
                        <Link href="/institution/claim">
                            <Button className="bg-white text-black hover:bg-zinc-200">Institution Sign Up</Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-zinc-600 dark:text-zinc-400"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t dark:border-zinc-800 p-4 space-y-4 bg-white dark:bg-zinc-950">
                    <Link href="/" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white">
                        Home
                    </Link>
                    <Link href="/search?type=PRESCHOOL" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white">
                        Preschools
                    </Link>
                    <Link href="/search?type=SCHOOL" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white">
                        Schools
                    </Link>
                    <Link href="/search?type=COLLEGE" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white">
                        Colleges
                    </Link>
                    <Link href="/search?type=TECHNICAL_SCHOOL" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white">
                        Technical
                    </Link>
                    <Link href="/search?type=CONSULTANCY" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-yellow-600 dark:hover:text-yellow-400">
                        Consultancy
                    </Link>
                    <Link href="/compare" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white">
                        Compare
                    </Link>
                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
                        <Link href="/institution/dashboard">
                            <Button variant="brand" className="w-full justify-start">Institution Dashboard (Demo)</Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
