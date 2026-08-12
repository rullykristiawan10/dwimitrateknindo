import React from 'react';

function SectionHeader({ label, title, subtitle, description }) {
  return (
    <>
      <div className="section-label">{label}</div>
      <h2 className="section-title">
        {title} <span>{subtitle}</span>
      </h2>
      <div className="divider" />
      {description && <p className="section-desc">{description}</p>}
    </>
  );
}

export default SectionHeader;
