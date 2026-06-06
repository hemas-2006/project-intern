import React, { useState } from 'react';
import './FreelancersPage.css';

const FREELANCERS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'UI/UX Designer',
    location: 'Mumbai, India',
    rate: '$45/hr',
    rating: 4.9,
    reviews: 87,
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'Wireframing'],
    available: true,
    avatar: 'PS',
    color: '#7c3aed',
    bio: 'Crafting delightful digital experiences for 6+ years. Specialize in SaaS and e-commerce.',
  },
  {
    id: 2,
    name: 'Arjun Dev',
    role: 'Full-Stack Developer',
    location: 'Bangalore, India',
    rate: '$60/hr',
    rating: 4.8,
    reviews: 112,
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    available: true,
    avatar: 'AD',
    color: '#0891b2',
    bio: 'Building scalable web apps for startups. Passionate about clean code and performance.',
  },
  {
    id: 3,
    name: 'Lena Müller',
    role: 'Content Strategist',
    location: 'Berlin, Germany',
    rate: '$35/hr',
    rating: 4.7,
    reviews: 63,
    skills: ['SEO', 'Copywriting', 'Content Marketing', 'Analytics'],
    available: false,
    avatar: 'LM',
    color: '#d97706',
    bio: 'Helping brands tell stories that convert. 5 years in SaaS and tech content.',
  },
  {
    id: 4,
    name: 'Carlos Rivera',
    role: 'Mobile Developer',
    location: 'Mexico City, Mexico',
    rate: '$55/hr',
    rating: 4.9,
    reviews: 74,
    skills: ['React Native', 'Flutter', 'Firebase', 'iOS/Android'],
    available: true,
    avatar: 'CR',
    color: '#059669',
    bio: 'Shipped 20+ apps to the App Store and Play Store. Performance obsessed.',
  },
  {
    id: 5,
    name: 'Aisha Patel',
    role: 'Brand Designer',
    location: 'Dubai, UAE',
    rate: '$50/hr',
    rating: 4.6,
    reviews: 45,
    skills: ['Illustrator', 'Branding', 'Logo Design', 'Print'],
    available: true,
    avatar: 'AP',
    color: '#dc2626',
    bio: 'Creating iconic brands from scratch. Worked with 50+ global clients.',
  },
  {
    id: 6,
    name: 'Tom Chen',
    role: 'Data Analyst',
    location: 'Toronto, Canada',
    rate: '$65/hr',
    rating: 4.8,
    reviews: 39,
    skills: ['Python', 'SQL', 'Tableau', 'Power BI'],
    available: false,
    avatar: 'TC',
    color: '#7c3aed',
    bio: 'Turning raw data into actionable insights. Ex-Google data team.',
  },
];

export default function FreelancersPage() {
  const [search, setSearch] = useState('');
  const [availOnly, setAvailOnly] = useState(false);

  const visible = FREELANCERS.filter(f => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      f.name.toLowerCase().includes(q) ||
      f.role.toLowerCase().includes(q) ||
      f.skills.some(s => s.toLowerCase().includes(q));
    const matchAvail = !availOnly || f.available;
    return matchSearch && matchAvail;
  });

  function Stars({ rating }) {
    return (
      <span className="stars">
        {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
        <span className="rating-num">{rating}</span>
      </span>
    );
  }

  return (
    <div className="freelancers-page">
      <section className="fl-hero">
        <h2>Find Top Freelancers</h2>
        <p>Work with vetted professionals across design, development, and marketing.</p>
        <div className="fl-search-row">
          <input
            type="text"
            placeholder="Search by name, role, or skill…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <label className="fl-avail-toggle">
            <input
              type="checkbox"
              checked={availOnly}
              onChange={e => setAvailOnly(e.target.checked)}
            />
            Available only
          </label>
        </div>
      </section>

      <section className="fl-body">
        <p className="fl-count">{visible.length} freelancer{visible.length !== 1 ? 's' : ''} found</p>
        <div className="fl-grid">
          {visible.map(f => (
            <div className="fl-card" key={f.id}>
              <div className="fl-card-top">
                <div className="fl-avatar" style={{ background: f.color }}>{f.avatar}</div>
                <span className={`fl-avail-badge ${f.available ? 'avail-yes' : 'avail-no'}`}>
                  {f.available ? '● Available' : '● Busy'}
                </span>
              </div>
              <h3 className="fl-name">{f.name}</h3>
              <p className="fl-role">{f.role}</p>
              <p className="fl-location">📍 {f.location}</p>
              <p className="fl-bio">{f.bio}</p>
              <div className="fl-skills">
                {f.skills.map(s => <span className="fl-skill" key={s}>{s}</span>)}
              </div>
              <div className="fl-meta">
                <Stars rating={f.rating} />
                <span className="fl-reviews">({f.reviews} reviews)</span>
              </div>
              <div className="fl-footer">
                <span className="fl-rate">{f.rate}</span>
                <button className="fl-hire-btn">Hire Now</button>
              </div>
            </div>
          ))}
          {visible.length === 0 && (
            <div className="fl-empty">
              <span>👥</span>
              <p>No freelancers match your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}