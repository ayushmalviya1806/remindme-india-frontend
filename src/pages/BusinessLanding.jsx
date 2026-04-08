import { useState } from 'react';

export default function BusinessLanding() {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerWhatsapp: '',
    industryType: '',
    plan: 'small'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hi! I'm interested in B2B solution for my business.\n\nBusiness Name: ${formData.businessName}\nOwner WhatsApp: ${formData.ownerWhatsapp}\nIndustry: ${formData.industryType}\nPlan: ${formData.plan}\n\nLet's discuss!`;
    
    window.open(`https://wa.me/916269915175?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">🏢 RemindMe India</h1>
              <p className="text-sm text-gray-600">B2B WhatsApp Reminder Solution</p>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="/" 
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Apne Customers Ko Kabhi Appointment Miss Mat Karne Do
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              WhatsApp pe automatic reminders — Hindi mein, unke phone pe, seedha
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/916269915175?text=Hi,%20B2B%20demo%20chahiye"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                Free Demo Chahiye? WhatsApp Karo →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Pain Points Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Common Business Problems
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Members forget to renew</h3>
              <p className="text-gray-600">₹ lost every month due to missed renewals</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Awkward manual follow-ups</h3>
              <p className="text-gray-600">Staff time wasted chasing payments</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excel sheets don't work</h3>
              <p className="text-gray-600">Data always outdated and manual</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No WhatsApp system exists</h3>
              <p className="text-gray-600">Until now!</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              How It Works
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                <span className="text-3xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aap apna account banao</h3>
              <p className="text-gray-600">You register your business on our platform</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                <span className="text-3xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Members opt-in karo</h3>
              <p className="text-gray-600">Share your JOIN link with customers</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                <span className="text-3xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Automatic reminders jaate hain</h3>
              <p className="text-gray-600">System handles everything automatically</p>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Cards Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Perfect for Every Industry
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏋️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gyms & Fitness</h3>
              <p className="text-gray-600">Membership renewal reminders</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏥️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clinics & Doctors</h3>
              <p className="text-gray-600">Appointment reminders</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Coaching Centers</h3>
              <p className="text-gray-600">Fee payment reminders</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💇</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Salons & Shops</h3>
              <p className="text-gray-600">Booking reminders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Table Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Simple, Transparent Pricing
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Small Business</h3>
              <p className="text-3xl font-bold text-indigo-600 mb-2">₹999/month</p>
              <p className="text-gray-600 mb-4">Up to 100 customers</p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span>WhatsApp reminders</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span>Hindi support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span>Dashboard access</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span>No setup fee</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional</h3>
              <p className="text-3xl font-bold text-indigo-600 mb-2">₹1,999/month</p>
              <p className="text-gray-600 mb-4">Up to 500 customers</p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span>Everything in Small</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span>Advanced analytics</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise</h3>
              <p className="text-3xl font-bold text-indigo-600 mb-2">₹2,999/month</p>
              <p className="text-gray-600 mb-4">Unlimited customers</p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span>Everything in Professional</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500">✓</span>
                  <span>Custom integrations</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              All plans include: WhatsApp reminders, Hindi support, Dashboard access, No setup fee
            </p>
          </div>
        </div>
      </div>

      {/* Cost Comparison Box */}
      <div className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Save Money & Time
            </h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-600 mb-2">Manual follow-up cost:</p>
                <p className="text-3xl font-bold text-red-600">₹5,000+/month</p>
                <p className="text-sm text-gray-500">(staff time)</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">RemindMe India B2B:</p>
                <p className="text-3xl font-bold text-green-600">₹999/month</p>
                <p className="text-sm text-gray-500">(automated reminders)</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xl font-bold text-green-600">
                You save: ₹4,000+ every month
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Aaj hi shuru karo — pehle mahine mein ROI guarantee
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start today and get your investment back in the first month
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/916269915175?text=Hi,%20I%20want%20B2B%20demo%20for%20my%20business"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                Abhi Demo Book Karo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">RemindMe India</h3>
              <p className="text-gray-300">WhatsApp reminder automation for Indian businesses</p>
            </div>
            <div>
              <h4 className="text-md font-medium text-white mb-2">Product</h4>
              <p className="text-gray-300">B2B Solution</p>
            </div>
            <div>
              <h4 className="text-md font-medium text-white mb-2">Contact</h4>
              <p className="text-gray-300">ayushmalviya1806@gmail.com</p>
            </div>
            <div>
              <h4 className="text-md font-medium text-white mb-2">Follow</h4>
              <p className="text-gray-300">@remindmeindia</p>
            </div>
            <div>
              <h4 className="text-md font-medium text-white mb-2">Legal</h4>
              <p className="text-gray-300">Privacy Policy | Terms of Service</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              © 2026 RemindMe India. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
