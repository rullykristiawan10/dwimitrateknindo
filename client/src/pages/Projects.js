import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { TbArrowRight } from 'react-icons/tb';

function Projects({ popularOnly }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  const displayProjects = popularOnly ? projects.filter(p => p.popular) : projects;

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px 0' }}>Memuat portofolio proyek...</div>;
  }

  return (
    <section className="section projects" id="projects" style={{ background: 'var(--offwhite)' }}>
      <div className="container">
        <SectionHeader
          label="Portofolio"
          title="Proyek"
          subtitle={popularOnly ? "Unggulan" : "Selesai"}
          description="Beberapa proyek HVAC yang telah kami selesaikan dengan standar kualitas internasional di berbagai sektor industri."
        />
        <div className="proj-grid">
          {displayProjects.map((project) => (
            <div key={project.title} className="proj-card">
              <div className="proj-thumb" style={{ backgroundImage: `url('${project.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="proj-badge">{project.badge}</div>
              </div>
              <div className="proj-body">
                <div className="proj-cat">{project.category}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
        {popularOnly && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/projects" className="btn-primary btn-animated" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Lihat Semua Portofolio <TbArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
