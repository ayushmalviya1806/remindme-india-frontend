// File: src/pages/PrivacyPolicy.tsx
// Route: /privacy
// FINAL VERSION — Version 1.0 | May 12, 2026
// Sales-weapon mode: Strong privacy moat + Hinglish summary + DPDP compliant

import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-emerald-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-emerald-100 text-sm">
            Last Updated: May 12, 2026 · Effective Date: May 12, 2026 · Version 1.0
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* HINGLISH SUMMARY — Sales weapon for B2B walks */}
        <div className="bg-emerald-50 border-2 border-emerald-700 rounded-lg p-6 mb-8 shadow-md">
          <h2 className="text-xl font-bold text-emerald-900 mb-3">📋 Ek Nazar Mein (At a Glance)</h2>
          <ul className="space-y-2 text-gray-800">
            <li>✅ Hum sirf reminder bhejne ke liye <strong>zaroori data</strong> lete hain — kuch extra nahi.</li>
            <li>🔒 <strong>Founder bhi aapka phone number nahi dekh sakta</strong> — admin dashboard mein sirf counts dikhte hain.</li>
            <li>🗑️ Aap kabhi bhi <strong>"DELETE MY DATA"</strong> bhej ke sab data mita sakte hain (15 din mein delete).</li>
            <li>🚫 Hum aapka data <strong>kabhi kisi ko bechte nahi</strong> — na ads, na third-party marketers.</li>
            <li>🎤 Voice notes <strong>turant delete</strong> ho jaate hain after transcription (audio nahi rakhte).</li>
            <li>💳 Payment details <strong>Razorpay ke paas</strong> hain — humare paas card number nahi aata.</li>
            <li>⚖️ <strong>DPDP Act 2023</strong> compliant — India ke privacy law ke saath full alignment.</li>
          </ul>
          <p className="text-sm text-emerald-800 italic mt-3 border-t border-emerald-200 pt-3">
            Niche detailed policy hai — but yeh 7 lines aapko 90% picture de deti hain.
          </p>
        </div>

        <section className="mb-8 prose prose-emerald max-w-none">
          <p className="text-gray-700 leading-relaxed">
            RemindMe India ("we", "our", "us") is a WhatsApp-based reminder service operated as a sole proprietorship by Ayush Malviya.
            We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, share, and protect 
            your personal data when you use our services — whether as an individual user (B2C) or as a member added by a business client (B2B).
          </p>
          <p className="text-gray-700 mt-3">
            This policy is issued under the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, the{' '}
            <strong>Information Technology Act, 2000</strong>, and the{' '}
            <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-3">1. Who We Are</h2>
          <div className="bg-gray-50 border-l-4 border-emerald-700 p-5 rounded">
            <p className="text-gray-700"><strong>Service Provider:</strong> RemindMe India</p>
            <p className="text-gray-700"><strong>Legal Structure:</strong> Sole Proprietorship (MSME registered under Udyam, NIC Code 62011)</p>
            <p className="text-gray-700"><strong>Owner:</strong> Ayush Malviya</p>
            <p className="text-gray-700 mt-2"><strong>Registered Address:</strong></p>
            <p className="text-gray-700 ml-4">
              Room No. S94, JC Bose Hostel,<br />
              SGSITS College, 23 Park Road,<br />
              Indore - 452003, Madhya Pradesh, India
            </p>
            <div className="border-t border-gray-300 mt-4 pt-4">
              <p className="text-gray-700"><strong>📧 Legal / Grievance Email:</strong> <a href="mailto:hello.remindmeindia@gmail.com" className="text-emerald-700 underline">hello.remindmeindia@gmail.com</a></p>
              <p className="text-gray-700"><strong>💬 Service WhatsApp (Bot):</strong> +91 62699 15175 — for all reminders, commands, and queries</p>
              <p className="text-gray-700"><strong>💬 Owner WhatsApp (Legal Notices Only):</strong> +91 74705 78178</p>
              <p className="text-gray-700"><strong>🌐 Website:</strong> <a href="https://remindmeindia.site" className="text-emerald-700 underline">remindmeindia.site</a></p>
            </div>
          </div>
          <p className="text-gray-700 mt-3 italic text-sm">
            We provide an automated reminder service via WhatsApp. No app download required.
            Simply send a message to our bot at +91 62699 15175.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-3">2. What Data We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect only the minimum data needed to deliver reminders. The data we handle falls into two categories:
          </p>

          <h3 className="text-lg font-bold text-emerald-800 mb-2">2.1 When You Use Our Service Directly (B2C User)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-emerald-900 text-white">
                <tr>
                  <th className="p-2 text-left text-sm">Data Type</th>
                  <th className="p-2 text-left text-sm">Example</th>
                  <th className="p-2 text-left text-sm">Purpose</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-t border-gray-300">
                  <td className="p-2 font-semibold text-gray-700">WhatsApp Number</td>
                  <td className="p-2 text-gray-700">Your registered WhatsApp phone</td>
                  <td className="p-2 text-gray-700">To identify your account and deliver reminders</td>
                </tr>
                <tr className="border-t border-gray-300 bg-gray-50">
                  <td className="p-2 font-semibold text-gray-700">Name</td>
                  <td className="p-2 text-gray-700">Your WhatsApp profile name</td>
                  <td className="p-2 text-gray-700">To personalize messages</td>
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2 font-semibold text-gray-700">Reminder Content</td>
                  <td className="p-2 text-gray-700">"Kal subah 9 baje medicine"</td>
                  <td className="p-2 text-gray-700">To extract task, time, and schedule the reminder</td>
                </tr>
                <tr className="border-t border-gray-300 bg-gray-50">
                  <td className="p-2 font-semibold text-gray-700">Reminder Metadata</td>
                  <td className="p-2 text-gray-700">Scheduled time, recurrence, status</td>
                  <td className="p-2 text-gray-700">To manage and deliver your reminders</td>
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2 font-semibold text-gray-700">Interaction Commands</td>
                  <td className="p-2 text-gray-700">LIST, DONE, SNOOZE, STATUS</td>
                  <td className="p-2 text-gray-700">To provide service features</td>
                </tr>
                <tr className="border-t border-gray-300 bg-gray-50">
                  <td className="p-2 font-semibold text-gray-700">Voice Notes (Pro)</td>
                  <td className="p-2 text-gray-700">Audio recordings you send</td>
                  <td className="p-2 text-gray-700">Transcribed to text, then <strong>audio immediately deleted</strong></td>
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2 font-semibold text-gray-700">Feedback</td>
                  <td className="p-2 text-gray-700">Ratings and comments</td>
                  <td className="p-2 text-gray-700">To improve our service</td>
                </tr>
                <tr className="border-t border-gray-300 bg-gray-50">
                  <td className="p-2 font-semibold text-gray-700">Referral Data</td>
                  <td className="p-2 text-gray-700">Your code, who joined via it</td>
                  <td className="p-2 text-gray-700">To grant Pro credits</td>
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2 font-semibold text-gray-700">Payment Metadata</td>
                  <td className="p-2 text-gray-700">Razorpay transaction ID, amount</td>
                  <td className="p-2 text-gray-700">To verify subscription. <strong>We never see your card or bank details.</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-6">2.2 When a Business Adds You as a Member (B2B)</h3>
          <p className="text-gray-700">
            If a gym, clinic, coaching centre, or other business ("Business Client") adds you to our system, we collect:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
            <li>WhatsApp phone number (provided by the business)</li>
            <li>Your name (as the business records it)</li>
            <li>Subscription expiry date (for renewal reminders)</li>
            <li>Opt-in status (you can revoke anytime with "STOP")</li>
          </ul>
          <p className="text-gray-700 mt-3">
            <strong>We do NOT collect:</strong> Your conversations with the business, your purchase history, your personal preferences, 
            health data, financial data, or any sensitive personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-3">3. How We Use Your Data</h2>
          <p className="text-gray-700 mb-3">We process your data only for these specific purposes, each with a clear lawful basis under the DPDP Act:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-emerald-900 text-white">
                <tr>
                  <th className="p-2 text-left text-sm">Purpose</th>
                  <th className="p-2 text-left text-sm">Lawful Basis</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-t border-gray-300">
                  <td className="p-2 text-gray-700">Create, manage, and deliver your reminders</td>
                  <td className="p-2 text-gray-700">Performance of contract (Terms of Service)</td>
                </tr>
                <tr className="border-t border-gray-300 bg-gray-50">
                  <td className="p-2 text-gray-700">Transcribe voice notes (Pro feature)</td>
                  <td className="p-2 text-gray-700">With your consent (you initiate by sending audio)</td>
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2 text-gray-700">Maintain plan status (Free/Pro) and referral rewards</td>
                  <td className="p-2 text-gray-700">Legitimate interest in operating the service</td>
                </tr>
                <tr className="border-t border-gray-300 bg-gray-50">
                  <td className="p-2 text-gray-700">Send service updates (weekly summary, plan expiry)</td>
                  <td className="p-2 text-gray-700">Legitimate interest (opt-out available)</td>
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2 text-gray-700">Improve AI accuracy (aggregated, anonymized patterns)</td>
                  <td className="p-2 text-gray-700">Legitimate interest (R&amp;D)</td>
                </tr>
                <tr className="border-t border-gray-300 bg-gray-50">
                  <td className="p-2 text-gray-700">Comply with legal obligations</td>
                  <td className="p-2 text-gray-700">Legal requirement</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 mt-3 italic">
            We do NOT use your data for advertising, third-party marketing, profiling, credit decisions, or AI training on personal content.
          </p>
        </section>

        {/* THE CORE PROMISE — Privacy Moat */}
        <section className="mb-8">
          <div className="bg-emerald-900 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">🔒 4. The Core Promise: We Don't See Your Data</h2>
            <p className="text-emerald-50 mb-4 leading-relaxed">
              Our system is architected so that <strong>even the founder cannot view your individual reminders or member phone numbers in plaintext.</strong> This is RemindMe India's privacy-first commitment, not a marketing slogan.
            </p>
            <ul className="space-y-3 text-emerald-50">
              <li className="flex items-start">
                <span className="text-emerald-300 mr-2">▸</span>
                <span><strong>Reminders stored encrypted:</strong> All reminder content is encrypted at rest in our PostgreSQL database. Even direct database access does not reveal plaintext content.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-300 mr-2">▸</span>
                <span><strong>Admin dashboard shows counts only:</strong> The founder's admin interface displays aggregated statistics (total members, messages delivered, active subscriptions) — not individual phone numbers, names, or message content.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-300 mr-2">▸</span>
                <span><strong>B2B member phones are masked:</strong> When a business uploads member data, phone numbers are hashed/masked in our admin views. The founder sees only business-level statistics.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-300 mr-2">▸</span>
                <span><strong>No casual browsing:</strong> No employee or owner can casually browse through your reminders. Access requires elevated permissions logged in audit trails.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-300 mr-2">▸</span>
                <span><strong>Zero data sales:</strong> We never sell, rent, or share your data for marketing. Period.</span>
              </li>
            </ul>
            <p className="text-emerald-100 mt-4 text-sm italic border-t border-emerald-700 pt-3">
              This privacy-first architecture is what separates RemindMe India from generic WhatsApp marketing tools.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-3">5. Who We Share Data With (Sub-Processors)</h2>
          <p className="text-gray-700 mb-3">
            We do not sell, rent, or trade your personal data. We share only with the following service providers, 
            bound by strict data processing agreements to handle data only as we instruct:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-emerald-900 text-white">
                <tr>
                  <th className="p-2 text-left text-xs">Third Party</th>
                  <th className="p-2 text-left text-xs">Purpose</th>
                  <th className="p-2 text-left text-xs">Data Shared</th>
                  <th className="p-2 text-left text-xs">Location</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-t border-gray-300">
                  <td className="p-2 text-gray-700">Meta (WhatsApp)</td>
                  <td className="p-2 text-gray-700">Message delivery</td>
                  <td className="p-2 text-gray-700">Phone, message content (encrypted in transit)</td>
                  <td className="p-2 text-gray-700">India / USA</td>
                </tr>
                <tr className="border-t border-gray-300 bg-gray-50">
                  <td className="p-2 text-gray-700">OpenAI</td>
                  <td className="p-2 text-gray-700">AI extraction & transcription</td>
                  <td className="p-2 text-gray-700">Reminder text / voice (no phone number; not retained)</td>
                  <td className="p-2 text-gray-700">USA</td>
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2 text-gray-700">Supabase</td>
                  <td className="p-2 text-gray-700">PostgreSQL hosting</td>
                  <td className="p-2 text-gray-700">All reminder data (encrypted at rest)</td>
                  <td className="p-2 text-gray-700">Mumbai, India (AWS ap-south-1)</td>
                </tr>
                <tr className="border-t border-gray-300 bg-gray-50">
                  <td className="p-2 text-gray-700">Upstash (Redis)</td>
                  <td className="p-2 text-gray-700">Queue management</td>
                  <td className="p-2 text-gray-700">Reminder IDs and timestamps only</td>
                  <td className="p-2 text-gray-700">USA</td>
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2 text-gray-700">Render</td>
                  <td className="p-2 text-gray-700">Backend hosting</td>
                  <td className="p-2 text-gray-700">Transient processing only; no persistent storage</td>
                  <td className="p-2 text-gray-700">USA</td>
                </tr>
                <tr className="border-t border-gray-300 bg-gray-50">
                  <td className="p-2 text-gray-700">Vercel</td>
                  <td className="p-2 text-gray-700">Frontend (website) hosting</td>
                  <td className="p-2 text-gray-700">Public site only — no personal data</td>
                  <td className="p-2 text-gray-700">USA</td>
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2 text-gray-700">Razorpay</td>
                  <td className="p-2 text-gray-700">Payment processing</td>
                  <td className="p-2 text-gray-700">Payment amount, transaction ID, name. <strong>We never see your card details.</strong></td>
                  <td className="p-2 text-gray-700">India</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-5">5.1 Cross-Border Data Transfer</h3>
          <p className="text-gray-700">
            Some sub-processors (OpenAI, Render, Vercel) process data on servers outside India. We have implemented 
            appropriate safeguards including <strong>Standard Contractual Clauses (SCCs)</strong> to ensure equivalent 
            protections as required under the DPDP Act 2023 and our Data Processing Agreements.
          </p>

          <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-4">5.2 We Do NOT Share With</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Advertisers or ad networks</li>
            <li>Data brokers or marketing companies</li>
            <li>Government agencies (except when legally compelled by valid court orders)</li>
            <li>Third-party analytics platforms (we use no Google Analytics, no Facebook Pixel)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-3">6. Data Retention</h2>
          <p className="text-gray-700 mb-3">We keep your data only as long as needed:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-emerald-900 text-white">
                <tr>
                  <th className="p-2 text-left text-sm">Data Type</th>
                  <th className="p-2 text-left text-sm">Retention Period</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-t border-gray-300">
                  <td className="p-2 font-semibold text-gray-700">Active account reminders</td>
                  <td className="p-2 text-gray-700">As long as you use the service + 30 days for reactivation</td>
                </tr>
                <tr className="border-t border-gray-300 bg-gray-50">
                  <td className="p-2 font-semibold text-gray-700">Voice notes (audio)</td>
                  <td className="p-2 text-gray-700"><strong>Deleted immediately after transcription</strong> — never stored</td>
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2 font-semibold text-gray-700">Payment records</td>
                  <td className="p-2 text-gray-700">8 years (as required by Indian Income Tax &amp; GST laws)</td>
                </tr>
                <tr className="border-t border-gray-300 bg-gray-50">
                  <td className="p-2 font-semibold text-gray-700">Dormant accounts</td>
                  <td className="p-2 text-gray-700">Auto-deleted after 6 months of inactivity (we notify first)</td>
                </tr>
                <tr className="border-t border-gray-300">
                  <td className="p-2 font-semibold text-gray-700">B2B member data</td>
                  <td className="p-2 text-gray-700">Business subscription duration + 30 days; then permanently deleted</td>
                </tr>
                <tr className="border-t border-gray-300 bg-gray-50">
                  <td className="p-2 font-semibold text-gray-700">Encrypted backups</td>
                  <td className="p-2 text-gray-700">90 days, then automatically purged</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 mt-3 italic">
            You can request early deletion at any time (see Section 7).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-3">7. Your Rights Under DPDP Act 2023</h2>
          <p className="text-gray-700 mb-3">As a data principal under Indian law, you have these rights:</p>
          
          <div className="grid md:grid-cols-2 gap-3 mt-4">
            <div className="bg-emerald-50 border-l-4 border-emerald-700 p-3 rounded">
              <h4 className="font-bold text-emerald-900">7.1 Right to Access</h4>
              <p className="text-gray-700 text-sm">Know what personal data we hold about you.</p>
            </div>
            <div className="bg-emerald-50 border-l-4 border-emerald-700 p-3 rounded">
              <h4 className="font-bold text-emerald-900">7.2 Right to Correction</h4>
              <p className="text-gray-700 text-sm">Request correction of inaccurate or incomplete data.</p>
            </div>
            <div className="bg-emerald-50 border-l-4 border-emerald-700 p-3 rounded">
              <h4 className="font-bold text-emerald-900">7.3 Right to Erasure</h4>
              <p className="text-gray-700 text-sm">Send "DELETE MY DATA" to our bot. Deleted within 15 days.</p>
            </div>
            <div className="bg-emerald-50 border-l-4 border-emerald-700 p-3 rounded">
              <h4 className="font-bold text-emerald-900">7.4 Right to Data Portability</h4>
              <p className="text-gray-700 text-sm">Request your data in CSV/JSON format.</p>
            </div>
            <div className="bg-emerald-50 border-l-4 border-emerald-700 p-3 rounded">
              <h4 className="font-bold text-emerald-900">7.5 Right to Nominate</h4>
              <p className="text-gray-700 text-sm">Appoint a nominee to exercise your rights in case of death or incapacity.</p>
            </div>
            <div className="bg-emerald-50 border-l-4 border-emerald-700 p-3 rounded">
              <h4 className="font-bold text-emerald-900">7.6 Right to Grievance Redressal</h4>
              <p className="text-gray-700 text-sm">Lodge complaints with our Grievance Officer (Section 11).</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-5">How to Exercise Your Rights</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li><strong>WhatsApp:</strong> Send "PRIVACY" or "DELETE MY DATA" to +91 62699 15175</li>
            <li><strong>Email:</strong> hello.remindmeindia@gmail.com (subject "DATA REQUEST")</li>
            <li><strong>Acknowledgement:</strong> Within 48 hours</li>
            <li><strong>Resolution:</strong> Within 15 days (as committed by DPDP Act)</li>
          </ul>
          <p className="text-gray-700 mt-3 text-sm italic">
            B2B members: Some rights (like access to expiry records held by the business) may need to be requested 
            via the business client. We will facilitate such requests.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-3">8. Cookies &amp; Website Tracking</h2>
          <p className="text-gray-700">
            Our website <strong>remindmeindia.site</strong> uses <strong>no cookies</strong>. We do not track you 
            personally. We do not use Google Analytics, Facebook Pixel, or any cross-site tracking technology.
          </p>
          <p className="text-gray-700 mt-2">
            If we ever introduce any tracking, we will update this policy and request your consent first.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-3">9. Children's Privacy</h2>
          <p className="text-gray-700">
            Our service is not intended for individuals under <strong>18 years of age</strong>. We do not knowingly 
            collect data from minors. If you believe a child has shared data with us, please contact our Grievance 
            Officer for immediate deletion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-3">10. Security Measures</h2>
          <p className="text-gray-700 mb-3">We implement industry-standard security measures to protect your data:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Encryption in Transit:</strong> All data between you, WhatsApp, and our servers is encrypted via TLS 1.2+ and WhatsApp's end-to-end encryption.</li>
            <li><strong>Encryption at Rest:</strong> Database content is encrypted using AES-256 on Supabase.</li>
            <li><strong>Access Control:</strong> Only authorized backend processes can access the database. No human admin can download raw member data.</li>
            <li><strong>Audit Logging:</strong> All access to data is logged with timestamps and user IDs.</li>
            <li><strong>Regular Audits:</strong> We review third-party integrations and dependencies for security issues.</li>
            <li><strong>Incident Response:</strong> Data breaches are reported to affected users and the Data Protection Board of India within <strong>72 hours</strong>, as required by the DPDP Act.</li>
          </ul>
        </section>

        <section className="mb-8 bg-emerald-900 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-3">11. Grievance Officer</h2>
          <p className="text-emerald-50 mb-4">
            Under the DPDP Act 2023, we have appointed a Grievance Officer to handle your privacy concerns:
          </p>
          <div className="space-y-2">
            <p><strong>Name:</strong> Ayush Malviya</p>
            <p><strong>Designation:</strong> Founder &amp; Grievance Officer</p>
            <p><strong>Email:</strong> hello.remindmeindia@gmail.com</p>
            <p><strong>WhatsApp:</strong> +91 74705 78178 (Owner direct — legal notices only)</p>
            <p><strong>Service Bot:</strong> +91 62699 15175 — send "GRIEVANCE" command</p>
            <p><strong>Postal Address:</strong></p>
            <p className="ml-4">
              Room No. S94, JC Bose Hostel,<br />
              SGSITS College, 23 Park Road,<br />
              Indore - 452003, Madhya Pradesh, India
            </p>
          </div>
          <div className="border-t border-emerald-700 mt-4 pt-3">
            <p className="text-emerald-50"><strong>SLA Commitments:</strong></p>
            <p className="text-emerald-100 text-sm">📩 Acknowledgement: Within 48 hours</p>
            <p className="text-emerald-100 text-sm">✅ Resolution: Within 15 days</p>
            <p className="text-emerald-100 text-sm mt-2">
              If unsatisfied, you may approach the Data Protection Board of India (once constituted).
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-3">12. Changes to This Policy</h2>
          <p className="text-gray-700">We may update this Privacy Policy. When we do:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
            <li>The new version is published at remindmeindia.site/privacy</li>
            <li>Active users receive a notice via WhatsApp bot</li>
            <li>The "Last Updated" date is changed</li>
            <li>Material changes get a 30-day advance notice</li>
          </ul>
          <p className="text-gray-700 mt-3">
            Continued use after updates implies acceptance. If you disagree, send "DELETE MY DATA" to our bot 
            to delete your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-3">13. Governing Law &amp; Jurisdiction</h2>
          <p className="text-gray-700">
            This Privacy Policy is governed by the laws of <strong>India</strong>, and the state of{' '}
            <strong>Madhya Pradesh</strong>. All disputes shall be subject to the exclusive jurisdiction of the 
            courts at <strong>Indore, Madhya Pradesh</strong>.
          </p>
          <p className="text-gray-700 mt-2 text-sm italic">
            For disputes under ₹5,00,000, parties agree to attempt mediation before approaching courts.
          </p>
        </section>

        <section className="mb-8 bg-emerald-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-emerald-900 mb-3">14. Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="font-semibold text-emerald-900 mb-2">Service &amp; Support</p>
              <p>💬 WhatsApp Bot: +91 62699 15175</p>
              <p>🤖 Send "PRIVACY" for queries</p>
              <p>🌐 <a href="https://remindmeindia.site" className="text-emerald-700 underline">remindmeindia.site</a></p>
            </div>
            <div>
              <p className="font-semibold text-emerald-900 mb-2">Legal &amp; Grievance</p>
              <p>📧 <a href="mailto:hello.remindmeindia@gmail.com" className="text-emerald-700 underline">hello.remindmeindia@gmail.com</a></p>
              <p>💬 Owner WhatsApp: +91 74705 78178</p>
              <p>📍 SGSITS College, Indore - 452003, MP</p>
            </div>
          </div>
        </section>

        <div className="text-center text-gray-500 text-sm italic border-t pt-6 mt-8">
          <p className="font-semibold">RemindMe India</p>
          <p>"Never forget what matters — without compromising your privacy."</p>
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
  );
}
