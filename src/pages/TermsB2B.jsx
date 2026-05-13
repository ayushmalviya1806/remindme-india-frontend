// File: src/pages/TermsB2B.tsx
// Route: /terms-b2b
// FINAL VERSION — Version 1.0 | May 12, 2026
// All reviewer fixes applied: DPA-by-reference, contact split, full address, MP jurisdiction, Grievance Officer, annual fair-use, auto-renewal clarity

import React from 'react';

export default function TermsB2B() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-emerald-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Terms of Service — B2B</h1>
          <p className="mt-2 text-emerald-100 text-sm">
            Last Updated: May 12, 2026 · Effective Date: May 12, 2026 · Version 1.0
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* HINGLISH SUMMARY — Sales weapon */}
        <div className="bg-emerald-50 border-2 border-emerald-700 rounded-lg p-6 mb-8 shadow-md">
          <h2 className="text-xl font-bold text-emerald-900 mb-3">📋 Ek Nazar Mein (At a Glance)</h2>
          <ul className="space-y-2 text-gray-800">
            <li>💰 Pricing transparent: <strong>₹999/month Small, ₹1,999 Pro, ₹2,999 Enterprise</strong> (17% saving on annual plans)</li>
            <li>🎁 <strong>7-day money back</strong> if service doesn't work — no questions asked</li>
            <li>📄 <strong>DPA auto-accept</strong> with payment — no separate PDF signing needed (formal version on request)</li>
            <li>🔄 Monthly plans auto-renew, <strong>annual plans don't</strong> (you get 30-day reminder before expiry)</li>
            <li>📞 Bot number: <strong>+91 62699 15175</strong> | Legal contact: <strong>+91 74705 78178</strong></li>
            <li>⚖️ Indore, MP jurisdiction · DPDP Act 2023 compliant · Grievance Officer assigned</li>
          </ul>
        </div>

        <div className="prose prose-emerald max-w-none">

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service ("Terms") govern your use of RemindMe India's Business ("B2B") services. 
              By subscribing to any B2B plan, completing payment, or using the Service, you ("Business", "you", "your") 
              agree to be bound by these Terms, our <a href="/privacy" className="text-emerald-700 underline">Privacy Policy</a>, 
              and the <a href="/dpa" className="text-emerald-700 underline">Data Processing Agreement (DPA)</a> referenced in Section 6.
            </p>
            <p className="text-gray-700 mt-2">If you do not agree, do not use the Service.</p>
            <p className="text-gray-700 mt-3 text-sm italic">
              These Terms constitute a legally binding electronic contract enforceable under the Indian Contract Act 1872 
              and the Information Technology Act 2000 (Section 10A).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">2. About the Service</h2>
            <p className="text-gray-700">
              <strong>RemindMe India</strong> provides an automated WhatsApp-based reminder service for businesses 
              to send subscription, appointment, and renewal reminders to their members/customers.
            </p>
            <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-4">Key Features (B2B Plans)</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Automatic reminders at 7 days, 3 days, and 1 day before expiry</li>
              <li>Custom broadcast messages to all members</li>
              <li>Branded message display (using your business name)</li>
              <li>QR code member onboarding</li>
              <li>Admin commands via WhatsApp (ADD, UPDATE, MY MEMBERS, BROADCAST)</li>
              <li>Member opt-out automatically handled</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">3. Subscription Plans &amp; Pricing</h2>
            
            <h3 className="text-lg font-bold text-emerald-800 mb-2">3.1 Monthly Plans</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-emerald-900 text-white">
                  <tr>
                    <th className="p-2 text-left text-sm">Plan</th>
                    <th className="p-2 text-left text-sm">Price</th>
                    <th className="p-2 text-left text-sm">Max Members</th>
                    <th className="p-2 text-left text-sm">Message Limit</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-gray-300">
                    <td className="p-2 font-semibold text-gray-700">Small</td>
                    <td className="p-2 text-gray-700">₹999/month</td>
                    <td className="p-2 text-gray-700">100</td>
                    <td className="p-2 text-gray-700">400/month</td>
                  </tr>
                  <tr className="border-t border-gray-300 bg-gray-50">
                    <td className="p-2 font-semibold text-gray-700">Professional</td>
                    <td className="p-2 text-gray-700">₹1,999/month</td>
                    <td className="p-2 text-gray-700">500</td>
                    <td className="p-2 text-gray-700">2,000/month</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="p-2 font-semibold text-gray-700">Enterprise</td>
                    <td className="p-2 text-gray-700">₹2,999/month</td>
                    <td className="p-2 text-gray-700">Unlimited*</td>
                    <td className="p-2 text-gray-700">10,000/month</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-4">3.2 Annual Plans (17% Savings)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-emerald-900 text-white">
                  <tr>
                    <th className="p-2 text-left text-sm">Plan</th>
                    <th className="p-2 text-left text-sm">Price</th>
                    <th className="p-2 text-left text-sm">Equivalent Monthly</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-gray-300">
                    <td className="p-2 font-semibold text-gray-700">Small Annual</td>
                    <td className="p-2 text-gray-700">₹9,999/year</td>
                    <td className="p-2 text-gray-700">₹833/month</td>
                  </tr>
                  <tr className="border-t border-gray-300 bg-gray-50">
                    <td className="p-2 font-semibold text-gray-700">Professional Annual</td>
                    <td className="p-2 text-gray-700">₹19,999/year</td>
                    <td className="p-2 text-gray-700">₹1,666/month</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="p-2 font-semibold text-gray-700">Enterprise Annual</td>
                    <td className="p-2 text-gray-700">₹29,999/year</td>
                    <td className="p-2 text-gray-700">₹2,499/month</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-xs italic mt-2">
              * Enterprise "Unlimited" subject to fair use: 5,000 members and 10,000 messages/month. 
              Additional usage: ₹0.30/message and ₹50/member/month. See Section 8.
            </p>

            <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-4">3.3 Free Trial</h3>
            <p className="text-gray-700">
              We may offer a 7-day free trial at our discretion. Trial includes full feature access. 
              No payment method required during trial. Service stops automatically at trial end unless you upgrade.
            </p>

            <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-4">3.4 Taxes</h3>
            <p className="text-gray-700">
              All prices are exclusive of GST. GST will be added where applicable per Indian tax law. 
              Currently, RemindMe India operates under MSME exemption (Udyam Registration), so no GST is currently charged.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">4. Billing &amp; Payment</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Payment Methods:</strong> Razorpay (cards, UPI, net banking, wallets). All transactions in INR.</li>
              <li><strong>Billing Cycle (Monthly):</strong> Billed every 30 days from activation date.</li>
              <li><strong>Billing Cycle (Annual):</strong> One-time payment valid for 365 days from activation.</li>
              <li><strong>Auto-Renewal (Monthly Plans):</strong> Auto-renew every 30 days unless cancelled. WhatsApp reminder sent 3 days before renewal.</li>
              <li><strong>No Auto-Renewal (Annual Plans):</strong> Annual plans are one-time payments. <strong>They do NOT auto-renew.</strong> You will receive a renewal reminder 30 days before expiry to manually re-subscribe.</li>
              <li><strong>Failed Payments:</strong> 7-day retry period. Service may be suspended after 7 days, terminated after 30 days of non-payment.</li>
              <li><strong>Price Changes:</strong> 30 days advance notice. Existing annual subscriptions protected at original price until next renewal.</li>
            </ul>
          </section>

          <section className="mb-8 bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-700">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">5. Refund Policy — 7-Day Money Back Guarantee</h2>
            
            <h3 className="text-lg font-bold text-emerald-800 mb-2">5.1 Full Refund Within 7 Days</h3>
            <p className="text-gray-700">
              If the Service does not work as described within 7 days of your first payment, you may request a 
              <strong> full refund</strong>. Conditions:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>Request must be made within 7 days of first payment</li>
              <li>Must specify in writing what didn't work (email or WhatsApp)</li>
              <li>We will attempt to fix the issue first; if unresolved within 48 hours, refund is processed</li>
            </ul>

            <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-4">5.2 Pro-Rated Refunds (Beyond 7 Days)</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><strong>Annual plans:</strong> Pro-rated refund minus 1 month service charge</li>
              <li><strong>Monthly plans:</strong> No refund for current month; cancellation takes effect at end of billing period</li>
            </ul>

            <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-4">5.3 Non-Refundable Situations</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>After 30 days of active use</li>
              <li>If account is terminated for violation of these Terms</li>
              <li>For broadcast messages already sent</li>
              <li>For any third-party costs (Meta WhatsApp fees) already incurred</li>
            </ul>

            <p className="text-gray-700 mt-3">
              <strong>Refund Process:</strong> Refunds processed within 7-10 business days to original payment method.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">6. Your Responsibilities &amp; Data Protection Agreement</h2>
            
            <h3 className="text-lg font-bold text-emerald-800 mb-2">6.1 Member Consent</h3>
            <p className="text-gray-700">
              You confirm that all members added to your account have <strong>explicitly consented</strong> to receive 
              WhatsApp messages from your business. You have collected this consent in writing or digitally and can 
              produce proof if requested.
            </p>

            <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-4">6.2 Compliance with Laws</h3>
            <p className="text-gray-700">
              You will comply with: DPDP Act 2023, IT Act 2000, Indian Telegraph Act, Meta WhatsApp Business Policy, 
              and TRAI commercial communication regulations.
            </p>

            <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-4">6.3 Prohibited Content</h3>
            <p className="text-gray-700">You will NOT use the Service to send:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>Spam, unsolicited messages, or bulk advertising</li>
              <li>Illegal, harmful, threatening, defamatory, or obscene content</li>
              <li>Misleading promotions, fake offers, or fraudulent claims</li>
              <li>Adult content, gambling promotions, or restricted categories</li>
              <li>Political campaigning, religious propaganda, or hate speech</li>
              <li>Pyramid schemes, MLM, or financial scams</li>
              <li>Content infringing on intellectual property</li>
            </ul>

            {/* DPA-BY-REFERENCE — Key reviewer fix */}
            <div className="bg-emerald-900 text-white p-5 rounded-lg mt-5">
              <h3 className="text-xl font-bold mb-3">6.4 Data Protection Agreement (DPA) — Auto-Accepted</h3>
              <p className="mb-3">For members whose data you upload to the Service:</p>
              <ul className="list-disc pl-6 space-y-1 text-emerald-50">
                <li>You are the <strong>Data Fiduciary</strong> (Controller) under the DPDP Act 2023</li>
                <li>RemindMe India is the <strong>Data Processor</strong></li>
                <li>You are responsible for honoring members' rights (access, correction, erasure)</li>
              </ul>
              <p className="mt-4 mb-2 font-semibold">DPA Auto-Acceptance:</p>
              <p className="text-emerald-50 text-sm leading-relaxed">
                By accepting these Terms of Service and completing payment for a B2B plan, you automatically enter 
                into our Data Processing Agreement (DPA), which is incorporated by reference. The full DPA is available at{' '}
                <a href="/dpa" className="text-emerald-200 underline font-semibold">remindmeindia.site/dpa</a>.
              </p>
              <p className="text-emerald-50 text-sm leading-relaxed mt-3">
                A formal countersigned PDF copy is available upon request for your compliance records or for enterprise needs. 
                To request, email <a href="mailto:hello.remindmeindia@gmail.com" className="text-emerald-200 underline">hello.remindmeindia@gmail.com</a> or 
                send WhatsApp command <strong>"DPA SIGN"</strong> to +91 62699 15175. We will email a pre-filled DPA within 24 hours.
              </p>
              <p className="text-emerald-50 text-sm leading-relaxed mt-3 italic">
                This auto-accepted DPA has the same legal force as a signed paper copy under the Indian Contract Act 1872 
                and Information Technology Act 2000 (Section 10A).
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">7. Acceptable Use Policy</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Reminder templates:</strong> Maximum 4 per member per month (7d, 3d, 1d, post-expiry)</li>
              <li><strong>Broadcasts:</strong> Maximum 4 per business per month</li>
              <li><strong>Member Opt-Out:</strong> If any member sends "STOP", we automatically remove them and notify you</li>
              <li><strong>Spam Complaints:</strong> 1st = warning, 2nd = suspension, 3rd = permanent termination, no refund</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">8. Fair Use Policy (Enterprise Plan)</h2>
            <p className="text-gray-700">The "Unlimited" Enterprise plan is subject to fair use:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>Message volume cap: 10,000 messages/month</li>
              <li>Active member cap: 5,000</li>
              <li>Above these limits: ₹0.30 per message, ₹50 per member/month</li>
              <li>Annual Enterprise plan: same caps apply on a monthly basis</li>
              <li>Custom enterprise pricing available for genuinely larger needs — contact us</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">9. Service Availability</h2>
            <p className="text-gray-700">
              We target <strong>99% uptime</strong>, measured monthly. We rely on third-party services 
              (Meta, Supabase, Render) whose availability is outside our direct control. Maintenance windows 
              communicated 48 hours in advance.
            </p>
            <p className="text-gray-700 mt-2">
              We are not liable for: WhatsApp/Meta outages, internet issues, force majeure events, 
              or member-side phone issues (DND, blocked numbers, etc.).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">10. Intellectual Property</h2>
            
            <h3 className="text-lg font-bold text-emerald-800 mb-2">10.1 Our IP</h3>
            <p className="text-gray-700">
              RemindMe India's software, branding, templates, and documentation are our exclusive property. 
              You may not copy, reverse-engineer, modify, resell, sublicense, or build competing products 
              using our infrastructure.
            </p>

            <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-4">10.2 Your IP</h3>
            <p className="text-gray-700">
              You retain ownership of your business name, logo, content, member list, and custom broadcasts. 
              You grant us a <strong>limited license</strong> to use your business name and logo in the Service 
              interface (e.g., on reminders sent to your members).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">11. Limitation of Liability</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Our total liability for any claim is limited to the <strong>amount paid in the preceding 3 months</strong></li>
              <li>We are not liable for indirect, consequential, or incidental damages</li>
              <li>We are not liable for losses arising from your members' actions or your content choices</li>
              <li>You agree to indemnify us from claims by your members or third parties arising from your use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">12. Account Suspension &amp; Termination</h2>
            
            <h3 className="text-lg font-bold text-emerald-800 mb-2">12.1 Grounds for Suspension</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Non-payment beyond 7 days</li>
              <li>Violation of Responsibilities or Acceptable Use</li>
              <li>Multiple spam complaints</li>
              <li>Suspected fraud or unauthorized access</li>
            </ul>

            <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-4">12.2 Effect of Termination</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Service stops immediately</li>
              <li>Member data exported (CSV) on request within 7 days</li>
              <li>All data permanently deleted 30 days after termination</li>
              <li>No refund for terminations due to your violation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">13. Modifications to Service or Terms</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>30 days notice for feature, pricing, or limit changes</li>
              <li>Terms updates notified via WhatsApp/email</li>
              <li>90 days notice for service discontinuation with full pro-rated refund</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">14. Force Majeure</h2>
            <p className="text-gray-700">
              Neither party is liable for delays or failures due to events beyond reasonable control: 
              natural disasters, pandemics, war, civil unrest, government action, internet outages, 
              or third-party service failures.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">15. Confidentiality</h2>
            <p className="text-gray-700">
              Both parties keep confidential: business strategies, pricing, unannounced features, 
              member data, technical details. This obligation survives termination.
            </p>
          </section>

          <section className="mb-8 bg-emerald-900 text-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-3">16. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms are governed by the laws of <strong>India</strong>, and the state of <strong>Madhya Pradesh</strong>.
            </p>
            <p className="mt-2">
              All disputes shall be subject to the <strong>exclusive jurisdiction of the courts at Indore, Madhya Pradesh</strong>.
            </p>
            <p className="mt-2 text-emerald-100 text-sm">
              For disputes under ₹5,00,000, parties agree to first attempt mediation before approaching courts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">17. Notices &amp; Grievance Officer</h2>
            
            <h3 className="text-lg font-bold text-emerald-800 mb-2">17.1 Official Legal Notices to RemindMe India</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Email: <a href="mailto:hello.remindmeindia@gmail.com" className="text-emerald-700 underline">hello.remindmeindia@gmail.com</a> (subject "OFFICIAL NOTICE")</li>
              <li>WhatsApp (Owner direct): +91 74705 78178</li>
              <li>Postal: Room No. S94, JC Bose Hostel, SGSITS College, 23 Park Road, Indore - 452003, MP, India</li>
            </ul>

            <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-4">17.2 General Service Queries</h3>
            <p className="text-gray-700">
              Service WhatsApp Bot: <strong>+91 62699 15175</strong> — for reminders, commands, support
            </p>

            <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-4">17.3 Grievance Officer</h3>
            <p className="text-gray-700">
              For privacy-related complaints or DPDP Act grievances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li><strong>Name:</strong> Ayush Malviya (Founder &amp; Grievance Officer)</li>
              <li><strong>Email:</strong> hello.remindmeindia@gmail.com</li>
              <li><strong>WhatsApp:</strong> +91 62699 15175 (send "GRIEVANCE")</li>
              <li><strong>Acknowledgement SLA:</strong> 48 hours · <strong>Resolution SLA:</strong> 15 days</li>
            </ul>

            <h3 className="text-lg font-bold text-emerald-800 mb-2 mt-4">17.4 Notices From Us</h3>
            <p className="text-gray-700">
              Notices from us to you are sent to your registered WhatsApp number or email; 
              considered delivered upon sending.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">18. Entire Agreement</h2>
            <p className="text-gray-700">
              These Terms, together with our <a href="/privacy" className="text-emerald-700 underline">Privacy Policy</a> and{' '}
              <a href="/dpa" className="text-emerald-700 underline">Data Processing Agreement (DPA)</a>, 
              constitute the entire agreement between us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">19. Severability</h2>
            <p className="text-gray-700">If any provision is invalid, the remaining provisions continue in full force.</p>
          </section>

          <section className="mb-8 bg-emerald-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-emerald-900 mb-3">20. Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="font-semibold text-emerald-900 mb-2">Service &amp; Support</p>
                <p>💬 WhatsApp Bot: +91 62699 15175</p>
                <p>🌐 <a href="https://remindmeindia.site" className="text-emerald-700 underline">remindmeindia.site</a></p>
              </div>
              <div>
                <p className="font-semibold text-emerald-900 mb-2">Legal &amp; Grievance</p>
                <p>📧 <a href="mailto:hello.remindmeindia@gmail.com" className="text-emerald-700 underline">hello.remindmeindia@gmail.com</a></p>
                <p>💬 Owner WhatsApp: +91 74705 78178</p>
                <p>📍 Room No. S94, JC Bose Hostel,<br />SGSITS College, Indore - 452003, MP</p>
              </div>
            </div>
          </section>

          <section className="mb-8 border-2 border-emerald-700 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-emerald-900 mb-3">Acknowledgement</h2>
            <p className="text-gray-700 mb-3">By subscribing to a B2B plan and completing payment, you confirm that:</p>
            <ul className="space-y-2 text-gray-700">
              <li>✅ You have read and understood these Terms</li>
              <li>✅ You have authority to bind your business to these Terms</li>
              <li>✅ You understand that by accepting these Terms, you are automatically bound by our <a href="/dpa" className="text-emerald-700 underline">Data Processing Agreement (DPA)</a></li>
              <li>✅ Your members have consented to receive WhatsApp reminders</li>
            </ul>
          </section>

          <div className="text-center text-gray-500 text-sm italic border-t pt-6 mt-8">
            <p className="font-semibold">RemindMe India</p>
            <p>Empowering Indian Businesses with Automated WhatsApp Reminders.</p>
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
