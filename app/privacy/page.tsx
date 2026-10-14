export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#070a0f] text-white p-6 font-sans flex flex-col justify-between">
      <div>
        <header className="flex items-center gap-3 pb-6 mb-6 border-b border-gray-800/60">
          <a 
            href="/"
            className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold cursor-pointer"
          >
            TT
          </a>
          <a 
            href="/"
            className="text-xl font-bold tracking-tight cursor-pointer hover:text-cyan-400 transition-colors"
          >
            TT Connections
          </a>
        </header>

        <main className="max-w-4xl mx-auto bg-[#10141d] p-8 md:p-10 rounded-2xl border border-gray-800/80 shadow-2xl my-4">
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
            Privacy Policy for TT Connections
          </h1>
          <p className="text-xs text-gray-400 mb-6">Last updated: 11 October 2026</p>

          <p className="text-xs text-gray-300 leading-relaxed mb-6">
            This Privacy Policy explains how <span className="font-bold text-white">&quot;TT Connections&quot;</span> (the &quot;Service&quot;) collects, uses, and protects your data when you use this application.
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="text-sm font-bold text-white mb-2">1. Data We Store</h2>
              <ul className="list-disc list-inside text-xs text-gray-300 space-y-2 leading-relaxed pl-1">
                <li>
                  <span className="font-bold text-gray-200">Posting account data:</span> TikTok account ID, username, and basic profile data needed to display posting history and status.
                </li>
                <li>
                  <span className="font-bold text-gray-200">Posting history:</span> Captions, statuses, and posting timestamps are stored in the database to display history inside <span className="font-bold text-gray-200">TT Connections</span>.
                </li>
                <li>
                  <span className="font-bold text-gray-200">Uploaded files:</span> Files you upload are stored temporarily on the server only for processing and delivery to TikTok via API. We do not sell them or share them with unrelated third parties.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-sm font-bold text-white mb-2">2. How We Use Data</h2>
              <p className="text-xs text-gray-300 mb-2">Data collected by <span className="font-bold text-gray-200">TT Connections</span> is used only to:</p>
              <ul className="list-disc list-inside text-xs text-gray-300 space-y-2 leading-relaxed pl-1">
                <li>Display your dashboard and posting history in <span className="font-bold text-gray-200">TT Connections</span>;</li>
                <li>Process and send your content to TikTok through official APIs you authorize;</li>
                <li>Monitor content upload success/failure status.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-sm font-bold text-white mb-2">3. Security</h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                We apply reasonable technical controls to protect your data from unauthorized access, including access restrictions to required systems only. API credentials and access tokens used for TikTok are stored server-side and are not shared with other parties without your consent, unless required by law.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-white mb-2">4. Third-Party Data Sharing</h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                We do not sell your personal data. Data is shared only with service providers necessary to operate <span className="font-bold text-gray-200">TT Connections</span> (for example, hosting/server providers) and with TikTok through API calls when you request content publishing.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-white mb-2">5. Your Rights</h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                If you no longer want to use <span className="font-bold text-gray-200">TT Connections</span>, you may stop using the Service and request deletion of stored data (where technically and legally possible) through the contact channel available in the app or related site.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-white mb-2">6. Privacy Policy Changes</h2>
              <p className="text-xs text-gray-300 leading-relaxed mb-8">
                This Privacy Policy may be updated from time to time. The latest version will always be available on this page, and the &quot;Last updated&quot; date above will reflect the latest revision date.
              </p>
            </section>

            <a 
  href="/"
  className="inline-flex border border-gray-800 bg-[#070a0f] hover:bg-gray-800 text-gray-300 text-xs px-4 py-2 rounded-lg items-center gap-2 transition-colors font-medium"
>
  ← Back to Dashboard
</a>
          </div>
        </main>
      </div>

      <footer className="mt-16 border-t border-gray-800/60 pt-6 flex justify-between items-center text-xs text-gray-500">
        <p>© 2026 TT Connections. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-300">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
