import React, { useState } from 'react';
import './ProjectsPage.css';

const PROJECTS = [
  {
    id: 1,
    title: 'E-Commerce Redesign',
    client: 'ShopNest Inc.',
    budget: '$4,500',
    deadline: '2026-06-15',
    status: 'In Progress',
    category: 'Design',
    description: 'Full redesign of product listing, cart, and checkout flows.',
    tags: ['ui/ux', 'figma', 'react'],
  },
  {
    id: 2,
    title: 'Mobile App MVP',
    client: 'HealthTrack',
    budget: '$8,200',
    deadline: '2026-07-01',
    status: 'Open',
    category: 'Development',
    description: 'Build a cross-platform React Native app for health tracking.',
    tags: ['react-native', 'firebase', 'mobile'],
  },
  {
    id: 3,
    title: 'Brand Identity Kit',
    client: 'GreenLeaf Co.',
    budget: '$1,800',
    deadline: '2026-05-30',
    status: 'Completed',
    category: 'Design',
    description: 'Logo, color palette, typography, and brand guidelines doc.',
    tags: ['branding', 'illustrator'],
  },
  {
    id: 4,
    title: 'SEO & Content Strategy',
    client: 'TechBlog Daily',
    budget: '$2,300',
    deadline: '2026-08-10',
    status: 'Open',
    category: 'Marketing',
    description: 'Audit existing content and create a 6-month SEO roadmap.',
    tags: ['seo', 'content', 'analytics'],
  },
  {
    id: 5,
    title: 'API Integration',
    client: 'PaySmart Ltd.',
    budget: '$3,100',
    deadline: '2026-06-20',
    status: 'In Progress',
    category: 'Development',
    description: 'Integrate Stripe, Razorpay, and custom webhook system.',
    tags: ['node.js', 'stripe', 'webhooks'],
  },
  {
    id: 6,
    title: 'Social Media Dashboard',
    client: 'ViralReach',
    budget: '$2,700',
    deadline: '2026-07-15',
    status: 'Open',
    category: 'Development',
    description: 'Analytics dashboard pulling data from Instagram, X, and LinkedIn APIs.',
    tags: ['react', 'charts', 'api'],
  },
];

const STATUS_COLORS = {
  'Open': 'status-open',
  'In Progress': 'status-progress',
  'Completed': 'status-done',
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Design', 'Development', 'Marketing'];

  const visible = PROJECTS.filter(p => {
    const matchCat = filter === 'All' || p.category === filter;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      p.title.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="projects-page">
      {/* Hero banner */}
      <section className="projects-hero">
        <h2>Browse Projects</h2>
        <p>Find exciting opportunities that match your skills and expertise.</p>
        <div className="projects-search-bar">
          <input
            type="text"
            placeholder="Search projects, clients, or skills…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* Category filters */}
      <section className="projects-body">
        <div className="proj-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`proj-filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
          <span className="proj-count">{visible.length} project{visible.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Grid */}
        <div className="projects-grid">
          {visible.map(project => (
            <div className="project-card" key={project.id}>
              <div className="proj-card-top">
                <span className={`proj-status ${STATUS_COLORS[project.status]}`}>{project.status}</span>
                <span className="proj-category">{project.category}</span>
              </div>
              <h3 className="proj-title">{project.title}</h3>
              <p className="proj-client">👤 {project.client}</p>
              <p className="proj-desc">{project.description}</p>
              <div className="proj-tags">
                {project.tags.map(t => <span className="proj-tag" key={t}>{t}</span>)}
              </div>
              <div className="proj-footer">
                <span className="proj-budget">💰 {project.budget}</span>
                <span className="proj-deadline">📅 {project.deadline}</span>
              </div>
              <button className="proj-apply-btn">Apply Now</button>
            </div>
          ))}
          {visible.length === 0 && (
            <div className="proj-empty">
              <span>🔍</span>
              <p>No projects match your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}