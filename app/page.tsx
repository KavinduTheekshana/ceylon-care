import LiveEntryDemand from '@/components/LiveEntryDemand';
import InvestmentDetailsSection from '@/components/InvestmentDetails';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#003366] to-[#0066cc] text-white py-10 px-5 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Ceylon Care Ltd – NHS Pilot & Job Sponsorship Programme 2025
        </h1>
        <p className="text-lg mb-2">
          Part of Route One Group | Powered by CDX Exchange & Codexer (R1 Coin UK Ltd)
        </p>
        <p className="text-xl font-bold mb-5">
          Official Launch: 11/11/2025 @ 11:11 AM (UK)
        </p>
        <a
          href="#pricing"
          className="inline-block px-6 py-3 bg-white text-[#0066cc] rounded-lg font-bold hover:bg-gray-100 transition-colors"
        >
          Secure Your Position Now
        </a>
      </header>

      {/* Overview Section */}
      <section id="overview" className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3 mb-4">
          Overview
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Ceylon Care Ltd, a proud member of Route One Group, is officially recognised under the NHS Pilot Programme
          for introducing Digital Ayurveda Healthcare in the UK and Sri Lanka. We are opening 21 new branches as part
          of our 2025 expansion, creating genuine employment, investment, and sponsorship opportunities.
        </p>
      </section>

      {/* Investment Section - Now Dynamic */}
      <InvestmentDetailsSection />

      {/* Live Entry Demand - Dynamic Section */}
      <LiveEntryDemand />

      {/* Employment Section */}
      <section id="jobs" className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3 mb-4">
          Employment Opportunities (Health Department)
        </h2>
        <p className="text-gray-700 mb-4">
          Join the Ceylon Ayurveda Health division under our NHS Pilot Programme. We are recruiting across the UK
          and Sri Lanka for:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Ayurveda Doctors, Physiotherapists & Therapists</li>
          <li>Branch Managers & HR Officers</li>
          <li>Administrative & Finance Staff</li>
          <li>AI Technical Engineers & Support Staff</li>
          <li>Marketing & Customer Relations Executives</li>
        </ul>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3 mb-4">
          Contact & Registration
        </h2>
        <div className="space-y-2 text-gray-700">
          <p><strong>Email:</strong> info@routeonegroup.co.uk | hr@ceyloncare.co.uk</p>
          <p><strong>Pre-Sale Team:</strong> +44 7861 872412</p>
          <p><strong>AI Customer Service:</strong> +44 7427 820966</p>
          <p>
            <strong>WhatsApp:</strong>{' '}
            <a href="https://wa.me/447376288689" target="_blank" rel="noopener noreferrer" className="text-[#0066cc] hover:underline">
              +44 7376 288689
            </a>
          </p>
          <p><strong>Web:</strong> routeonegroup.co.uk | r1coin.com | ceylonayurvedahealth.co.uk</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003366] text-white text-center py-8 px-4 mt-12">
        <p className="mb-2 text-sm">
          This is a high-risk digital investment. You could lose all the money you invest and are not legally
          covered by financial protection schemes.
        </p>
        <p className="mb-4 text-sm">
          All activities follow UK MLR 2017 and FCA crypto-asset guidelines.
        </p>
        <p className="text-sm">
          © 2025 Route One Group | Ceylon Care Ltd | All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
