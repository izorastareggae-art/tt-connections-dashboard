export default function TermsPage() {
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
            Terms of Service for TT Connections
          </h1>
          <p className="text-xs text-gray-400 mb-6">Last updated: 11 October 2026</p>

          <p className="text-xs text-gray-300 leading-relaxed mb-6">
            By using <span className="font-bold text-white">&quot;TT Connections&quot;</span> (the &quot;Service&quot;), you agree to be bound by these Terms of Service and the <a href="/privacy" className="text-cyan-400 hover:underline font-bold">TT Connections Privacy Policy</a>.
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="text-sm font-bold text-white mb-2">1. Service Description</h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                <span className="font-bold text-gray-200">TT Connections</span> is a web application that allows you to monitor TikTok accounts and upload or schedule content to TikTok accounts you have authorized via official TikTok APIs.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-white mb-2">2. Relationship with TikTok</h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                <span className="font-bold text-gray-200">TT Connections</span> is a third-party application and is not affiliated with, sponsored by, or officially endorsed by TikTok Pte. Ltd. or its affiliates. References to &quot;TikTok&quot; are used only to describe platform integrations through available APIs.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-white mb-2">3. User Responsibilities</h2>
              <p className="text-xs text-gray-300 mb-2">You agree to:</p>
              <ul className="list-disc list-inside text-xs text-gray-300 space-y-2 leading-relaxed pl-1">
                <li>Post only content you have rights and permission to use;</li>
                <li>Comply with TikTok&apos;s <span className="font-bold text-gray-200">Terms of Service</span> and <span className="font-bold text-gray-200">Community Guidelines</span>;</li>
                <li>Not use the Service for spam, illegal activities, or violations of others&apos; rights;</li>
                <li>Keep your account credentials and granted access secure.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-sm font-bold text-white mb-2">4. TikTok API Usage</h2>
              <p className="text-xs text-gray-300 mb-2">
                This Service depends on TikTok APIs for publishing and account-related data. We do not control and are not responsible for:
              </p>
              <ul className="list-disc list-inside text-xs text-gray-300 space-y-2 leading-relaxed pl-1">
                <li>Technical changes in TikTok APIs;</li>
                <li>API rate limits or service disruptions;</li>
                <li>Restrictions, suspension, or termination of your TikTok account by TikTok.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-sm font-bold text-white mb-2">5. Limitation of Liability</h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                To the maximum extent permitted by applicable law, we are not liable for direct or indirect losses, data loss, or other damages arising from the use of, or inability to use, <span className="font-bold text-gray-200">TT Connections</span>.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-white mb-2">6. Changes to Terms</h2>
              <p className="text-xs text-gray-300 leading-relaxed mb-8">
                We may update these Terms from time to time. The latest version will always be available on this page, and the &quot;Last updated&quot; date above will be revised accordingly. By continuing to use <span className="font-bold text-gray-200">TT Connections</span> after changes, you agree to the updated Terms.
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
