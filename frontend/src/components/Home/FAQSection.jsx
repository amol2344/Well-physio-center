import { useState } from "react";

const faqs = [
  {
    question: "How can I locate this doctor's practice?",
    answer:
      "PRO-KINETIC PHYSIOTHERAPY CENTER in Mahad is very easy to find as they practice right DESHMUKH NURSING HOME.",
  },
  {
    question: "At what time can I visit PRO-KINETIC PHYSIOTHERAPY CENTER?",
    answer:
      "PRO-KINETIC PHYSIOTHERAPY CENTER is open during Monday: Open 24 Hrs, Tuesday: Open 24 Hrs, Wednesday: Open 24 Hrs, Thursday: Open 24 Hrs, Friday: Open 24 Hrs, Saturday: Open 24 Hrs, Sunday: Open 24 Hrs. But, please call up the clinic to get an appointment in advance to avoid any kind of disappointment.",
  },
  {
    question: "Does this doctor have any field of specialisation?",
    answer:
      "PRO-KINETIC PHYSIOTHERAPY CENTER specialises in Neurological & Orthopedic Physiotherapy, Foot Drop Treatment, PIVD & Spine Care, Post-Surgical Rehabilitation, and Personalized Therapeutic Exercises.",
  },
  {
    question: "How can I contact PRO-KINETIC PHYSIOTHERAPY CENTER in Mahad, Raigad-Maharashtra?",
    answer:
      "You can call +91-8460286466 for appointments and enquiries at PRO-KINETIC PHYSIOTHERAPY CENTER in Mahad, Raigad-Maharashtra.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // SEO: Generate JSON-LD FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="py-16 bg-gradient-to-b from-slate-50 to-white"
      aria-labelledby="faq-heading"
    >
      {/* SEO: Inject structured FAQPage data */}
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2
            id="faq-heading"
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-700 to-orange-700 bg-clip-text text-transparent mb-4"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Everything you need to know about our services
          </p>
        </div>

        {/* Use semantic description list for questions/answers */}
        <dl className="max-w-4xl mx-auto grid gap-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-teal-200"
            >
              <dt>
                <button
                  className="w-full flex justify-between items-center p-6 md:p-7 text-left focus:outline-none"
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                >
                  <h3 className="text-lg md:text-xl font-semibold text-slate-800 group-hover:text-teal-700 transition-colors pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 ml-4" aria-hidden="true">
                    <svg
                      className={`h-6 w-6 text-slate-400 group-hover:text-orange-600 transition-transform duration-300 ${
                        activeIndex === index ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
              </dt>
              <dd
                id={`faq-panel-${index}`}
                className={`px-6 pb-6 md:px-7 md:pb-7 transition-all duration-300 overflow-hidden ${
                  activeIndex === index ? "max-h-96" : "max-h-0"
                }`}
                aria-labelledby={`faq-question-${index}`}
              >
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-6">Still have questions?</p>
          <a
            href="/contact-us"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-teal-600 to-orange-600 hover:from-orange-600 hover:to-teal-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
