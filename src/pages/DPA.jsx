// File: src/pages/DPA.tsx
// Route: /dpa
// FINAL VERSION — Version 1.0 | May 12, 2026
// Public auto-acceptance page + formal version on request

import React from 'react';

export default function DPA() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-emerald-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Data Processing Agreement</h1>
          <p className="mt-2 text-emerald-100 text-sm">
            Last Updated: May 12, 2026 · Effective Date: May 12, 2026 · Version 1.0
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* INSTANT DOWNLOAD CTA */}
        <div className="bg-emerald-50 border-2 border-emerald-700 p-6 rounded-lg mb-6 shadow-md">
          <h2 className="text-xl font-bold text-emerald-900 mb-2">📄 Download DPA PDF</h2>
          <p className="text-gray-800 text-sm leading-relaxed mb-4">
            Instant download for review, internal records, or sharing with your legal team.
          </p>
          <a 
            href="/RemindMeIndiaDPAFormal.pdf"
            download="RemindMeIndia_DPA.pdf"
            className="inline-block bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition shadow-sm"
          >
            ⬇️ Download DPA PDF
          </a>
          <p className="text-gray-600 text-xs mt-3 italic">
            For most users, downloading is enough — DPA is auto-accepted via subscription. See below for countersigned signature flow.
          </p>
        </div>

        {/* AUTO-ACCEPTANCE BANNER */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-lg mb-8 shadow-md">
          <h2 className="text-lg font-bold text-amber-900 mb-2">⚡ Auto-Acceptance Notice</h2>
          <p className="text-gray-800 text-sm leading-relaxed">
            This Data Processing Agreement is <strong>automatically accepted</strong> when you subscribe to any 
            RemindMe India B2B plan and complete payment via our Terms of Service. <strong>No separate signature is required</strong> for standard plans.
          </p>
          <p className="text-gray-800 text-sm mt-3 leading-relaxed">
            <strong>Need a formal countersigned PDF?</strong> Download above, sign, and email back to{' '}
            <a href="mailto:hello.remindmeindia@gmail.com" className="text-emerald-700 underline">hello.remindmeindia@gmail.com</a>{' '}
            (subject "DPA COUNTERSIGN REQUEST"). We will countersign and return within 48 hours.
          </p>
        </div>

        {/* HINGLISH SUMMARY */}
        <div className="bg-emerald-50 border-2 border-emerald-700 rounded-lg p-6 mb-8 shadow-md">
          <h2 className="text-xl font-bold text-emerald-900 mb-3">📋 Ek Nazar Mein (At a Glance)</h2>
          <ul className="space-y-2 text-gray-800">
            <li>⚖️ <strong>Aap = Data Fiduciary</strong> (member ka data aapka, consent aapne liya)</li>
            <li>🔧 <strong>RemindMe India = Data Processor</strong> (sirf reminder bhejne ke liye process karte hain)</li>
            <li>🔒 <strong>Member data masked</strong> — RemindMe founder bhi nahi dekh sakta individual phones</li>
            <li>🚨 Data breach <strong>72 hours mein notify</strong> — DPDP Act mandate</li>
            <li>🗑️ Subscription end? <strong>30 din mein member data delete</strong> + Certificate of Destruction</li>
            <li>📋 Sub-processors disclosed (Meta, Supabase, OpenAI, Razorpay) — sab DPDP-compliant</li>
            <li>⚡ <strong>Auto-accept via ToS</strong> — alag se sign karne ki zaroorat nahi (formal version on request)</li>
          </ul>
        </div>

        <div className="prose prose-emerald max-w-none">

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">1. Parties to This Agreement</h2>

            <h3 className="text-lg font-bold text-emerald-800 mb-2">1.1 Data Fiduciary (Controller) — "Business"</h3>
            <p className="text-gray-700">
              The Business is the entity that has subscribed to a RemindMe India B2B plan via Razorpay payment. 
              Identification of the Business is captured at the time of payment via:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>Business name (as entered during checkout or onboarding)</li>
              <li>Owner WhatsApp number (verified via payment record)</li>
              <li>Business type, city, and GSTIN if provided</li>
              <li>Razorpay payment ID (proof of subscription)</li>
            </ul>

            <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-4">1.2 Data Processor — "Service Provider"</h3>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-emerald-700">
              <p className="text-gray-700"><strong>Legal Name:</strong> RemindMe India (Sole Proprietorship)</p>
              <p className="text-gray-700"><strong>MSME Registration:</strong> Udyam Registered, NIC Code 62011</p>
              <p className="text-gray-700"><strong>Owner &amp; Grievance Officer:</strong> Ayush Malviya</p>
              <p className="text-gray-700 mt-2"><strong>Registered Address:</strong></p>
              <p className="text-gray-700 ml-4">
                Room No. S94, JC Bose Hostel,<br />
                SGSITS College, 23 Park Road,<br />
                Indore - 452003, Madhya Pradesh, India
              </p>
              <div className="border-t border-gray-300 mt-3 pt-3">
                <p className="text-gray-700"><strong>📧 Legal Email:</strong> hello.remindmeindia@gmail.com</p>
                <p className="text-gray-700"><strong>💬 Owner WhatsApp (Legal):</strong> +91 74705 78178</p>
                <p className="text-gray-700"><strong>💬 Service WhatsApp (Bot):</strong> +91 62699 15175</p>
                <p className="text-gray-700"><strong>🌐 Website:</strong> https://remindmeindia.site</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">2. Recitals</h2>
            <p className="text-gray-700"><strong>WHEREAS</strong> the Business operates a service-based enterprise that maintains a customer/member database;</p>
            <p className="text-gray-700 mt-2"><strong>WHEREAS</strong> the Service Provider operates an automated WhatsApp-based reminder service for businesses;</p>
            <p className="text-gray-700 mt-2"><strong>WHEREAS</strong> the Business desires to use the Service Provider's platform to send automated reminders to its members;</p>
            <p className="text-gray-700 mt-2"><strong>WHEREAS</strong> both parties wish to comply with the Digital Personal Data Protection Act, 2023 ("DPDP Act"), and other applicable Indian laws regarding the processing of personal data;</p>
            <p className="text-gray-700 mt-2"><strong>NOW THEREFORE</strong>, the parties agree as follows:</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">3. Subject Matter and Duration</h2>
            <p className="text-gray-700">
              <strong>3.1 Subject Matter:</strong> WhatsApp-based automated reminder service for the Business's members, 
              including subscription renewal reminders, appointment notifications, and broadcast messages.
            </p>
            <p className="text-gray-700 mt-3">
              <strong>3.2 Duration:</strong> This Agreement is effective from the date of payment (Effective Date) 
              and remains in force during the term of the Business's active subscription. It survives termination 
              for purposes related to data deletion, audit cooperation, and confidentiality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">4. Nature and Purpose of Processing</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-emerald-900 text-white">
                  <tr>
                    <th className="p-2 text-left text-sm">Aspect</th>
                    <th className="p-2 text-left text-sm">Details</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-gray-300">
                    <td className="p-2 font-semibold text-gray-700">Nature</td>
                    <td className="p-2 text-gray-700">Storage, processing, and transmission of member personal data via WhatsApp</td>
                  </tr>
                  <tr className="border-t border-gray-300 bg-gray-50">
                    <td className="p-2 font-semibold text-gray-700">Purpose</td>
                    <td className="p-2 text-gray-700">Automated reminders (renewal, appointment, broadcast) on behalf of Business</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="p-2 font-semibold text-gray-700">Data Subjects</td>
                    <td className="p-2 text-gray-700">Members/customers of the Business</td>
                  </tr>
                  <tr className="border-t border-gray-300 bg-gray-50">
                    <td className="p-2 font-semibold text-gray-700">Personal Data</td>
                    <td className="p-2 text-gray-700">Name, WhatsApp number, subscription expiry date, opt-in status</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="p-2 font-semibold text-gray-700">Sensitive Data</td>
                    <td className="p-2 text-gray-700">NONE collected or processed</td>
                  </tr>
                  <tr className="border-t border-gray-300 bg-gray-50">
                    <td className="p-2 font-semibold text-gray-700">Frequency</td>
                    <td className="p-2 text-gray-700">Continuous, automated processing during subscription period</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">5. Obligations of the Business (Data Fiduciary)</h2>
            <p className="text-gray-700 mb-2">The Business shall:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><strong>(a)</strong> Obtain valid, informed, specific, and explicit consent from each member before adding their data.</li>
              <li><strong>(b)</strong> Maintain proof of consent (written, digital, or recorded) for at least 3 years.</li>
              <li><strong>(c)</strong> Provide accurate, up-to-date member data.</li>
              <li><strong>(d)</strong> Honor member rights under DPDP Act (access, correction, erasure, consent withdrawal).</li>
              <li><strong>(e)</strong> Be solely responsible for the lawfulness of data collected from members.</li>
              <li><strong>(f)</strong> Promptly notify the Service Provider of any member's opt-out, deletion, or correction request.</li>
              <li><strong>(g)</strong> Not upload sensitive personal data (health records, financial details beyond subscription fees, biometric data, etc.).</li>
              <li><strong>(h)</strong> Comply with all applicable Indian laws including TRAI commercial communication regulations.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">6. Obligations of the Service Provider (Data Processor)</h2>
            <p className="text-gray-700 mb-2">The Service Provider shall:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><strong>(a)</strong> Process member data only on documented instructions from the Business.</li>
              <li><strong>(b)</strong> Ensure authorized personnel are bound by confidentiality.</li>
              <li><strong>(c)</strong> Implement appropriate technical and organisational measures (Section 7).</li>
              <li><strong>(d)</strong> Not engage sub-processors without disclosure (current list in Section 8).</li>
              <li><strong>(e)</strong> Assist the Business in responding to member rights requests within 7 days.</li>
              <li><strong>(f)</strong> Notify the Business of any data breach within <strong>72 hours</strong> of discovery.</li>
              <li><strong>(g)</strong> Delete or return all member data within 30 days of termination, on request.</li>
              <li><strong>(h)</strong> Make available all information necessary to demonstrate compliance.</li>
              <li><strong>(i)</strong> Maintain the privacy-first architecture described in our <a href="/privacy" className="text-emerald-700 underline">Privacy Policy</a> Section 4.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">7. Technical &amp; Organisational Security Measures</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-emerald-900 text-white">
                  <tr>
                    <th className="p-2 text-left text-sm">Measure</th>
                    <th className="p-2 text-left text-sm">Implementation</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-gray-300">
                    <td className="p-2 font-semibold text-gray-700">Encryption in Transit</td>
                    <td className="p-2 text-gray-700">TLS 1.2+ for all API calls and message delivery</td>
                  </tr>
                  <tr className="border-t border-gray-300 bg-gray-50">
                    <td className="p-2 font-semibold text-gray-700">Encryption at Rest</td>
                    <td className="p-2 text-gray-700">AES-256 encryption on Supabase PostgreSQL (Mumbai region)</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="p-2 font-semibold text-gray-700">Member Phone Masking</td>
                    <td className="p-2 text-gray-700">Hashed/masked in admin views; founder cannot see plaintext</td>
                  </tr>
                  <tr className="border-t border-gray-300 bg-gray-50">
                    <td className="p-2 font-semibold text-gray-700">Access Control</td>
                    <td className="p-2 text-gray-700">Role-based access; MFA enforced on admin accounts</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="p-2 font-semibold text-gray-700">Audit Logging</td>
                    <td className="p-2 text-gray-700">All admin actions logged with timestamps and user ID</td>
                  </tr>
                  <tr className="border-t border-gray-300 bg-gray-50">
                    <td className="p-2 font-semibold text-gray-700">Backup</td>
                    <td className="p-2 text-gray-700">Encrypted daily backups, 90-day retention</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="p-2 font-semibold text-gray-700">Incident Response</td>
                    <td className="p-2 text-gray-700">72-hour breach notification, documented escalation</td>
                  </tr>
                  <tr className="border-t border-gray-300 bg-gray-50">
                    <td className="p-2 font-semibold text-gray-700">Data Minimisation</td>
                    <td className="p-2 text-gray-700">Only essential fields collected; voice/image data not stored</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">8. Sub-Processors (Schedule A)</h2>
            <p className="text-gray-700 mb-3">The Business consents to the Service Provider's use of the following sub-processors:</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-emerald-900 text-white">
                  <tr>
                    <th className="p-2 text-left text-xs">Sub-Processor</th>
                    <th className="p-2 text-left text-xs">Purpose</th>
                    <th className="p-2 text-left text-xs">Data Shared</th>
                    <th className="p-2 text-left text-xs">Location</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-t border-gray-300">
                    <td className="p-2 text-gray-700">Meta Platforms (WhatsApp)</td>
                    <td className="p-2 text-gray-700">Message delivery</td>
                    <td className="p-2 text-gray-700">Phone, message content</td>
                    <td className="p-2 text-gray-700">India / USA</td>
                  </tr>
                  <tr className="border-t border-gray-300 bg-gray-50">
                    <td className="p-2 text-gray-700">Supabase Inc.</td>
                    <td className="p-2 text-gray-700">Database hosting</td>
                    <td className="p-2 text-gray-700">All account data (encrypted)</td>
                    <td className="p-2 text-gray-700">Mumbai, India (ap-south-1)</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="p-2 text-gray-700">Render Inc.</td>
                    <td className="p-2 text-gray-700">Application hosting</td>
                    <td className="p-2 text-gray-700">Backend processing (transient)</td>
                    <td className="p-2 text-gray-700">USA</td>
                  </tr>
                  <tr className="border-t border-gray-300 bg-gray-50">
                    <td className="p-2 text-gray-700">Upstash Inc.</td>
                    <td className="p-2 text-gray-700">Queue management</td>
                    <td className="p-2 text-gray-700">Reminder IDs and timestamps</td>
                    <td className="p-2 text-gray-700">USA</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="p-2 text-gray-700">OpenAI Inc.</td>
                    <td className="p-2 text-gray-700">AI text/voice processing</td>
                    <td className="p-2 text-gray-700">Reminder text (not retained per OpenAI zero-retention)</td>
                    <td className="p-2 text-gray-700">USA</td>
                  </tr>
                  <tr className="border-t border-gray-300 bg-gray-50">
                    <td className="p-2 text-gray-700">Razorpay Software Pvt Ltd</td>
                    <td className="p-2 text-gray-700">Payment processing</td>
                    <td className="p-2 text-gray-700">Phone, payment amount</td>
                    <td className="p-2 text-gray-700">India</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="p-2 text-gray-700">Vercel Inc.</td>
                    <td className="p-2 text-gray-700">Frontend hosting</td>
                    <td className="p-2 text-gray-700">Public site only — no personal data</td>
                    <td className="p-2 text-gray-700">USA</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-xs italic mt-3">
              The Service Provider will notify the Business 30 days before adding new sub-processors. 
              The Business may object within 14 days; if unresolved, either party may terminate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">9. Data Breach Notification</h2>
            <p className="text-gray-700">In case of a personal data breach affecting Business members:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li><strong>(a)</strong> Service Provider shall notify Business within <strong>72 hours</strong> of discovery.</li>
              <li><strong>(b)</strong> Notification shall include: nature of breach, categories and approximate number of affected data subjects, likely consequences, and mitigation measures.</li>
              <li><strong>(c)</strong> Both parties shall cooperate in notifying the Data Protection Board of India (DPB) and affected members.</li>
              <li><strong>(d)</strong> Costs of notification shall be borne by the party responsible for the breach.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">10. Termination &amp; Data Return</h2>
            <p className="text-gray-700"><strong>10.1</strong> Either party may terminate this Agreement with 30 days written notice.</p>
            <p className="text-gray-700 mt-2"><strong>10.2</strong> Upon termination, the Service Provider shall:</p>
            <ul className="list-disc pl-10 text-gray-700 space-y-1 mt-1">
              <li>(a) Export Business's member data in CSV format within 7 days, on request;</li>
              <li>(b) Permanently delete all member data within 30 days;</li>
              <li>(c) Provide a Certificate of Destruction upon completion;</li>
              <li>(d) Continue to honor confidentiality obligations indefinitely.</li>
            </ul>
            <p className="text-gray-700 mt-2"><strong>10.3</strong> Backup copies may persist for up to 90 days in encrypted form before automatic deletion.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">11. Liability &amp; Indemnification</h2>
            <p className="text-gray-700"><strong>11.1</strong> Each party is liable for damages caused by its own breach of this Agreement.</p>
            <p className="text-gray-700 mt-2"><strong>11.2</strong> The Service Provider's total liability is capped at the total fees paid by the Business in the 3 months preceding the claim.</p>
            <p className="text-gray-700 mt-2"><strong>11.3</strong> The Business shall indemnify the Service Provider against claims arising from:</p>
            <ul className="list-disc pl-10 text-gray-700 space-y-1 mt-1">
              <li>(a) Lack of valid consent from members;</li>
              <li>(b) Inaccurate or unlawful data uploaded by Business;</li>
              <li>(c) Spam complaints or regulatory actions due to Business's content.</li>
            </ul>
            <p className="text-gray-700 mt-2"><strong>11.4</strong> Neither party is liable for indirect, consequential, or incidental damages.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">12. Confidentiality</h2>
            <p className="text-gray-700">
              Both parties agree to keep confidential all non-public information shared under this Agreement, 
              including member data, business processes, pricing, and technical details. This obligation 
              survives termination for 3 years.
            </p>
          </section>

          <section className="mb-8 bg-emerald-900 text-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-3">13. Governing Law &amp; Jurisdiction</h2>
            <p>
              This Agreement is governed by the laws of <strong>India</strong>, and the state of <strong>Madhya Pradesh</strong>.
            </p>
            <p className="mt-2">
              Disputes shall be subject to the <strong>exclusive jurisdiction of the courts at Indore, Madhya Pradesh</strong>.
            </p>
            <p className="mt-2 text-emerald-100 text-sm">
              For disputes under ₹5,00,000, parties agree to first attempt mediation before litigation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">14. Miscellaneous</h2>
            <p className="text-gray-700"><strong>14.1 Entire Agreement:</strong> This DPA, together with the <a href="/terms-b2b" className="text-emerald-700 underline">Terms of Service</a> and <a href="/privacy" className="text-emerald-700 underline">Privacy Policy</a>, constitutes the entire agreement.</p>
            <p className="text-gray-700 mt-2"><strong>14.2 Amendments:</strong> Communicated 30 days in advance via WhatsApp or email.</p>
            <p className="text-gray-700 mt-2"><strong>14.3 Severability:</strong> If any provision is invalid, the rest remains in full force.</p>
            <p className="text-gray-700 mt-2"><strong>14.4 Notices:</strong> Legal notices to hello.remindmeindia@gmail.com (subject "DPA OFFICIAL NOTICE") or Owner WhatsApp +91 74705 78178.</p>
            <p className="text-gray-700 mt-2"><strong>14.5 Acceptance:</strong> This DPA is auto-accepted via Terms of Service. Electronic acceptance has same force as a signed paper copy under Indian Contract Act 1872 and IT Act 2000 Section 10A.</p>
          </section>

          <section className="mb-8 bg-emerald-50 border-l-4 border-emerald-700 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">15. Formal Signed DPA Process</h2>
            <p className="text-gray-700">
              While this online DPA is fully binding upon subscription, Enterprise clients or businesses requiring 
              a formal countersigned PDF can follow this 2-step process:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2 mt-3">
              <li><strong>Download</strong> the DPA PDF from the button at the top of this page.</li>
              <li><strong>Sign</strong> and email the signed copy to:
                <ul className="list-disc pl-6 mt-1">
                  <li>📧 <a href="mailto:hello.remindmeindia@gmail.com" className="text-emerald-700 underline">hello.remindmeindia@gmail.com</a> (subject "DPA COUNTERSIGN REQUEST")</li>
                  <li>💬 WhatsApp Owner: <strong>+91 74705 78178</strong></li>
                </ul>
              </li>
            </ol>
            <p className="text-gray-700 mt-3">
              We countersign and email back within <strong>48 hours</strong>. Faster than emailing for an unsigned PDF.
            </p>
            <p className="text-gray-600 text-xs italic mt-3">
              Alternatively, send "<strong>DPA SIGN</strong>" command to our WhatsApp bot at +91 62699 15175 — you will receive the same download link and instructions.
            </p>
          </section>

          <div className="text-center text-gray-500 text-sm italic border-t pt-6 mt-8">
            <p className="font-semibold">RemindMe India</p>
            <p>Data Processing Agreement under DPDP Act 2023</p>
            <p className="mt-2">Made with care in Indore, India 🇮🇳</p>
            <p className="mt-3 text-xs">
              <a href="/privacy" className="text-emerald-700 underline">Privacy Policy</a> ·{' '}
              <a href="/terms-b2b" className="text-emerald-700 underline">Terms of Service (B2B)</a> ·{' '}
              <a href="/dpa" className="text-emerald-700 underline">Data Processing Agreement</a> ·{' '}
              <a href="/" className="text-emerald-700 underline">Home</a>
            </p>
            <p className="mt-2 text-xs">Version 1.0 · Published: May 12, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
