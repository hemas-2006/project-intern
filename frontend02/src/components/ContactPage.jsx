import React, { useState } from 'react';
import './ContactPage.css';

const FAQS = [
  {
    q: 'How do I post a project?',
    a: 'Sign up as a client, go to Projects, and click "Post a Project". Fill in the details and our team will review it within 24 hours.',
  },
  {
    q: 'Is ClientFlow free to use?',
    a: 'Browsing is always free. Clients pay a small 5% service fee on successful projects; freelancers keep 95% of their earnings.',
  },
  {
    q: 'How are freelancers vetted?',
    a: 'Every freelancer completes a skills assessment and ID verification before being listed on the platform.',
  },
  {
    q: 'What payment methods do you support?',
    a: 'We support credit/debit cards, UPI, PayPal, and bank transfers. All payments are processed securely via Stripe.',
  },
];

export default function ContactPage() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit() {
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  }

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <h2>Get in Touch</h2>
        <p>We're here to help. Reach out and we'll respond within 24 hours.</p>
      </section>

      <section className="contact-body">
        {/* Info cards */}
        <div className="contact-info-cards">
          <div className="info-card">
            <span className="info-icon">📧</span>
            <h4>Email Us</h4>
            <p>support@clientflow.io</p>
          </div>
          <div className="info-card">
            <span className="info-icon">💬</span>
            <h4>Live Chat</h4>
            <p>Available Mon–Fri, 9am–6pm IST</p>
          </div>
          <div className="info-card">
            <span className="info-icon">📍</span>
            <h4>Office</h4>
            <p>Madurai, Tamil Nadu, India</p>
          </div>
        </div>

        <div className="contact-main">
          {/* Contact form */}
          <div className="contact-form-card">
            <h3>Send a Message</h3>
            {submitted ? (
              <div className="contact-success">
                <span>🎉</span>
                <h4>Message Sent!</h4>
                <p>Thanks, {form.name}! We'll get back to you at {form.email} shortly.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                  Send Another
                </button>
              </div>
            ) : (
              <div className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" />
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us more…" />
                </div>
                <button
                  className="contact-submit-btn"
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.message}
                >
                  Send Message →
                </button>
              </div>
            )}
          </div>

          {/* FAQ */}
          <div className="faq-card">
            <h3>Frequently Asked</h3>
            <div className="faq-list">
              {FAQS.map((faq, i) => (
                <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={i}>
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {faq.q}
                    <span className="faq-arrow">{openFaq === i ? '▲' : '▼'}</span>
                  </button>
                  {openFaq === i && <p className="faq-answer">{faq.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}