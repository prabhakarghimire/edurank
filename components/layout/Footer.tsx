export default function Footer() {
    return (
        <footer className="border-t bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-blue-600">EduRank Nepal</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Nepal's most transparent and comprehensive school ranking platform. Helping parents make the right choice.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <li><a href="/search" className="hover:underline">Browse Schools</a></li>
                            <li><a href="/compare" className="hover:underline">Compare Institutions</a></li>
                            <li><a href="/rankings" className="hover:underline">Top Rankings</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">For Institutions</h4>
                        <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <li><a href="/institution/claim" className="hover:underline">Claim Profile</a></li>
                            <li><a href="/institution/login" className="hover:underline">Admin Login</a></li>
                            <li><a href="/advertise" className="hover:underline">Advertise with Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t dark:border-zinc-800 pt-8 text-center text-sm text-zinc-500">
                    <p>&copy; {new Date().getFullYear()} EduRank Nepal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
