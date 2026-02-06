'use client';

import { Institution } from '@/lib/data';
import { IndianRupee, Info } from 'lucide-react';

interface FeeStructureProps {
    institution: Institution;
}

export default function FeeStructure({ institution }: FeeStructureProps) {
    if (!institution.feeDetails) {
        return (
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-6 text-center">
                <IndianRupee className="h-8 w-8 text-zinc-600 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-zinc-300">Detailed Fee Breakdown Unavailable</h3>
                <p className="text-zinc-500 text-sm mt-1">
                    Contact the institution directly for a precise fee structure.
                    Approximate annual fee: <span className="text-blue-400 font-bold">NPR {institution.fees.toLocaleString()}</span>
                </p>
            </div>
        );
    }

    const { admission, monthly, annual, others } = institution.feeDetails;
    const totalEstimated = admission + (monthly * 12) + others;

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-zinc-50 dark:bg-zinc-800/50 px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <IndianRupee className="h-5 w-5 text-blue-500" />
                    Fee Structure
                </h3>
                <span className="text-xs text-zinc-500 bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded">
                    Academic Year 2024/25
                </span>
            </div>

            <div className="p-0">
                <table className="w-full text-sm">
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                            <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">Admission Fee (One-time)</td>
                            <td className="px-6 py-4 text-right font-medium">NPR {admission.toLocaleString()}</td>
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                            <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">Monthly Tuition</td>
                            <td className="px-6 py-4 text-right">
                                <span className="font-medium">NPR {monthly.toLocaleString()}</span>
                                <span className="text-xs text-zinc-500 block">x 12 months</span>
                            </td>
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                            <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                Annual/Term Fees
                                <span className="block text-xs text-zinc-500">Exams, Library, Lab</span>
                            </td>
                            <td className="px-6 py-4 text-right font-medium">NPR {others.toLocaleString()}</td>
                        </tr>
                        <tr className="bg-blue-50/50 dark:bg-blue-900/10">
                            <td className="px-6 py-4 font-bold text-blue-900 dark:text-blue-100">Total Estimated (Yearly)</td>
                            <td className="px-6 py-4 text-right font-bold text-blue-600 dark:text-blue-400 text-lg">
                                NPR {totalEstimated.toLocaleString()}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900 px-6 py-3 border-t border-zinc-200 dark:border-zinc-800 flex items-start gap-2 text-xs text-zinc-500">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <p>
                    Fees are subject to change. This is an estimate based on last year's data.
                    Additional costs for transport, books, and uniforms are not included.
                </p>
            </div>
        </div>
    );
}
