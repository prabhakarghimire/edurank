'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, School, Search, ChevronDown, Globe, GraduationCap, Laptop, Scale } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const pathname = usePathname();

    // Close mobile menu/dropdowns when route changes
    useEffect(() => {
        setIsMenuOpen(false);
        setIsExploreOpen(false);
    }, [pathname]);

    const handleLogoClick = (e: React.MouseEvent) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-0 inset-x-0 h-16 bg-black border-b border-white/10 z-[100]">
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2 group">
                    <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-500 transition-colors">
                        <School className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        EduRank<span className="text-blue-500">.</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="/"
                        className={`text-sm font-medium transition-colors hover:text-white ${pathname === '/' ? 'text-white' : 'text-zinc-400'}`}
                    >
                        Home
                    </Link>

                    <Link
                        href="/how-it-works"
                        className={`text-sm font-medium transition-colors hover:text-white ${pathname === '/how-it-works' ? 'text-white' : 'text-zinc-400'}`}
                    >
                        How It Works
                    </Link>

                    <Link
                        href="/rankings"
                        className={`text-sm font-medium transition-colors hover:text-white ${pathname === '/rankings' ? 'text-white' : 'text-zinc-400'}`}
                    >
                        Rankings
                    </Link>

                    {/* Explore Dropdown */}
                    <div className="relative group">
                        <button
                            className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-white ${isExploreOpen ? 'text-white' : 'text-zinc-400'}`}
                            onClick={() => setIsExploreOpen(!isExploreOpen)}
                            onMouseEnter={() => setIsExploreOpen(true)}
                        >
                            Explore <ChevronDown className="h-4 w-4" />
                        </button>

                        {/* Dropdown Content */}
                        <div
                            className={`absolute top-full right-0 mt-2 w-72 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 origin-top-right ${isExploreOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
                            onMouseLeave={() => setIsExploreOpen(false)}
                        >
                            <div className="p-4">
                                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                                    What are you looking for?
                                </p>
                                <div className="space-y-1">
                                    <Link href="/search" className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/50 group transition-colors">
                                        <div className="bg-blue-500/10 p-2 rounded-md group-hover:bg-blue-500/20 text-blue-400">
                                            <School className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-zinc-200 group-hover:text-white">Schools & Colleges</div>
                                            <div className="text-xs text-zinc-500">Find the best education</div>
                                        </div>
                                    </Link>

                                    <Link href="/search?type=CONSULTANCY" className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/50 group transition-colors">
                                        <div className="bg-yellow-500/10 p-2 rounded-md group-hover:bg-yellow-500/20 text-yellow-500">
                                            <Globe className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-zinc-200 group-hover:text-white">Consultancies</div>
                                            <div className="text-xs text-zinc-500">Abroad studies & Visa</div>
                                        </div>
                                    </Link>

                                    <Link href="/search?type=TRAINING_CENTER" className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/50 group transition-colors">
                                        <div className="bg-purple-500/10 p-2 rounded-md group-hover:bg-purple-500/20 text-purple-400">
                                            <Laptop className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-zinc-200 group-hover:text-white">Training Centers</div>
                                            <div className="text-xs text-zinc-500">Skills & Certification</div>
                                        </div>
                                    </Link>

                                    <Link href="/compare" className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/50 group transition-colors">
                                        <div className="bg-green-500/10 p-2 rounded-md group-hover:bg-green-500/20 text-green-400">
                                            <Scale className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-zinc-200 group-hover:text-white">Compare Tool</div>
                                            <div className="text-xs text-zinc-500">Compare features side-by-side</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-4 w-px bg-zinc-800" />

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Link href="/institution/claim">
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                                For Institutions
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button size="sm" className="bg-white text-black hover:bg-zinc-200 font-semibold">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-zinc-400 hover:text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-black border-b border-zinc-800 p-4 space-y-4 shadow-xl animate-in slide-in-from-top-2">
                    <Link href="/" className="block text-sm font-medium text-zinc-400 hover:text-white">
                        Home
                    </Link>
                    <Link href="/rankings" className="block text-sm font-medium text-zinc-400 hover:text-white">
                        Rankings
                    </Link>

                    <div className="pt-2 pb-2 border-t border-zinc-800">
                        <p className="text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-3">
                            What are you looking for?
                        </p>
                        <div className="space-y-3 pl-2">
                            <Link href="/search" className="flex items-center gap-3 text-zinc-300 hover:text-white">
                                <School className="h-4 w-4" /> Schools & Colleges
                            </Link>
                            <Link href="/search?type=CONSULTANCY" className="flex items-center gap-3 text-zinc-300 hover:text-yellow-500">
                                <Globe className="h-4 w-4" /> Consultancies
                            </Link>
                            <Link href="/search?type=TRAINING_CENTER" className="flex items-center gap-3 text-zinc-300 hover:text-purple-400">
                                <Laptop className="h-4 w-4" /> Training Centers
                            </Link>
                            <Link href="/compare" className="flex items-center gap-3 text-zinc-300 hover:text-green-400">
                                <Scale className="h-4 w-4" /> Compare Tool
                            </Link>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
                        <Link href="/institution/claim">
                            <Button variant="outline" className="w-full justify-start border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900">
                                For Institutions
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button className="w-full bg-white text-black hover:bg-zinc-200">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
