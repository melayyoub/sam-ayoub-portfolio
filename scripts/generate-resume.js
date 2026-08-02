/**
 * Generates resume.pdf and resume.docx from public/assets/resume.json
 * so the downloadable resume files can never drift from the live site.
 *
 * Usage: node scripts/generate-resume.js
 */
const fs = require('fs');
const path = require('path');
const React = require('react');
const { Document, Page, Text, View, StyleSheet, Link, renderToFile } = require('@react-pdf/renderer');
const {
  Document: DocxDocument,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  ExternalHyperlink,
} = require('docx');

const RESUME_JSON_PATH = path.join(__dirname, '..', 'public', 'assets', 'resume.json');
const PDF_OUT_PATH = path.join(__dirname, '..', 'public', 'assets', 'resume.pdf');
const DOCX_OUT_PATH = path.join(__dirname, '..', 'public', 'assets', 'resume.docx');

const data = JSON.parse(fs.readFileSync(RESUME_JSON_PATH, 'utf8'));
const { main, resume, caseStudies = [] } = data;
const roles = main.description.split(' / ').map((s) => s.trim());
const contactLine = [
  `${main.address?.city}, ${main.address?.state}`,
  main.email,
  main.phone,
  main.website?.replace(/^https?:\/\//, ''),
].filter(Boolean).join('   |   ');

/* ───────────────────────── PDF (via @react-pdf/renderer) ───────────────────────── */

const NAVY = '#0a0a1a';
const ACCENT = '#3454d1';
const MUTED = '#555555';

const styles = StyleSheet.create({
  page: { padding: '36pt 42pt', fontSize: 9.5, fontFamily: 'Helvetica', color: '#1a1a1a', lineHeight: 1.4 },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: NAVY },
  roles: { fontSize: 10.5, color: ACCENT, marginTop: 3, fontFamily: 'Helvetica-Bold' },
  contact: { fontSize: 8.5, color: MUTED, marginTop: 6 },
  sectionTitle: {
    fontSize: 11, fontFamily: 'Helvetica-Bold', color: NAVY, marginTop: 14, marginBottom: 6,
    borderBottom: `1pt solid ${ACCENT}`, paddingBottom: 3, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  bio: { fontSize: 9.5, color: '#222', marginBottom: 2 },
  bullet: { flexDirection: 'row', marginBottom: 3 },
  bulletDot: { width: 10, fontSize: 9.5 },
  bulletText: { flex: 1, fontSize: 9.5 },
  jobBlock: { marginBottom: 9 },
  jobHeaderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  jobCompany: { fontFamily: 'Helvetica-Bold', fontSize: 10 },
  jobYears: { fontSize: 9, color: MUTED },
  jobTitle: { fontSize: 9.5, fontFamily: 'Helvetica-Oblique', color: ACCENT, marginBottom: 2 },
  jobDesc: { fontSize: 9, color: '#333' },
  caseBlock: { marginBottom: 7 },
  caseHeaderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  caseTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9.8 },
  caseLink: { fontSize: 8, color: ACCENT },
  caseTagline: { fontSize: 8.8, fontFamily: 'Helvetica-Oblique', color: MUTED, marginBottom: 1.5 },
  caseDesc: { fontSize: 8.7, color: '#333' },
  skillsText: { fontSize: 9, color: '#222', lineHeight: 1.6 },
  twoCol: { flexDirection: 'row', gap: 16 },
  col: { flex: 1 },
  certRow: { fontSize: 8.8, marginBottom: 2.5 },
  eduBlock: { marginBottom: 6 },
});

function Bullet({ children }) {
  return React.createElement(
    View,
    { style: styles.bullet },
    React.createElement(Text, { style: styles.bulletDot }, '•'),
    React.createElement(Text, { style: styles.bulletText }, children)
  );
}

function buildPdfDocument() {
  const topSkills = resume.skills.slice(0, 30).map((s) => s.value).join('   ·   ');

  return React.createElement(
    Document,
    { title: `${main.name} — Resume`, author: main.name },
    React.createElement(
      Page,
      { size: 'A4', style: styles.page, wrap: true },

      // Header
      React.createElement(Text, { style: styles.name }, main.name),
      React.createElement(Text, { style: styles.roles }, roles.join('   //   ')),
      React.createElement(Text, { style: styles.contact }, contactLine),

      // Summary
      React.createElement(Text, { style: styles.sectionTitle }, 'Summary'),
      React.createElement(Text, { style: styles.bio }, main.bio),

      // Core Focus
      React.createElement(Text, { style: styles.sectionTitle }, 'Core Focus'),
      ...resume.objectives.map((o) => React.createElement(Bullet, { key: o.name }, o.name)),

      // Experience
      React.createElement(Text, { style: styles.sectionTitle }, 'Experience'),
      ...resume.work.map((job) =>
        React.createElement(
          View,
          { key: job.company + job.years, style: styles.jobBlock, wrap: false },
          React.createElement(
            View,
            { style: styles.jobHeaderRow },
            React.createElement(Text, { style: styles.jobCompany }, job.company),
            React.createElement(Text, { style: styles.jobYears }, job.years)
          ),
          React.createElement(Text, { style: styles.jobTitle }, job.title || job.role),
          React.createElement(Text, { style: styles.jobDesc }, job.description)
        )
      ),

      // Founder & Principal Architect — Reallexi LLC
      caseStudies.length > 0 &&
        React.createElement(Text, { style: styles.sectionTitle }, 'AI/ML Product Architecture — Founder & Principal Architect, Reallexi LLC'),
      ...caseStudies.map((cs) =>
        React.createElement(
          View,
          { key: cs.id, style: styles.caseBlock, wrap: false },
          React.createElement(
            View,
            { style: styles.caseHeaderRow },
            React.createElement(Text, { style: styles.caseTitle }, cs.title),
            React.createElement(Link, { src: cs.url, style: styles.caseLink }, cs.url.replace(/^https?:\/\//, ''))
          ),
          React.createElement(Text, { style: styles.caseTagline }, cs.tagline),
          React.createElement(Text, { style: styles.caseDesc }, cs.description)
        )
      ),

      // Skills
      React.createElement(Text, { style: styles.sectionTitle }, 'Skills & Technologies'),
      React.createElement(Text, { style: styles.skillsText }, topSkills),

      // Certifications + Education side by side
      React.createElement(
        View,
        { style: styles.twoCol },
        React.createElement(
          View,
          { style: styles.col },
          React.createElement(Text, { style: styles.sectionTitle }, 'Certifications'),
          ...resume.certs.slice(0, 10).map((c) =>
            React.createElement(Text, { key: c.title, style: styles.certRow }, `${c.title} — ${c.source}`)
          )
        ),
        React.createElement(
          View,
          { style: styles.col },
          React.createElement(Text, { style: styles.sectionTitle }, 'Education'),
          ...resume.education.map((e) =>
            React.createElement(
              View,
              { key: e.school, style: styles.eduBlock },
              React.createElement(Text, { style: styles.certRow }, `${e.degree}`),
              React.createElement(Text, { style: { ...styles.certRow, color: MUTED } }, `${e.school} — ${e.graduated}`)
            )
          )
        )
      )
    )
  );
}

/* ───────────────────────── DOCX (via docx) ───────────────────────── */

function heading(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 260, after: 100 } });
}

function bulletParagraph(text) {
  return new Paragraph({ text, bullet: { level: 0 }, spacing: { after: 60 } });
}

function buildDocx() {
  const children = [];

  children.push(
    new Paragraph({
      children: [new TextRun({ text: main.name, bold: true, size: 44 })],
      spacing: { after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: roles.join('   //   '), bold: true, size: 22, color: '3454D1' })],
      spacing: { after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: contactLine, size: 18, color: '555555' })],
      spacing: { after: 200 },
    })
  );

  children.push(heading('Summary'));
  children.push(new Paragraph({ text: main.bio, spacing: { after: 120 } }));

  children.push(heading('Core Focus'));
  resume.objectives.forEach((o) => children.push(bulletParagraph(o.name)));

  children.push(heading('Experience'));
  resume.work.forEach((job) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${job.company}`, bold: true, size: 21 }),
          new TextRun({ text: `   —   ${job.years}`, size: 18, color: '555555' }),
        ],
        spacing: { before: 160, after: 20 },
      }),
      new Paragraph({
        children: [new TextRun({ text: job.title || job.role, italics: true, size: 19, color: '3454D1' })],
        spacing: { after: 40 },
      }),
      new Paragraph({ text: job.description, spacing: { after: 40 } })
    );
  });

  if (caseStudies.length > 0) {
    children.push(heading('AI/ML Product Architecture — Founder & Principal Architect, Reallexi LLC'));
    caseStudies.forEach((cs) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: cs.title, bold: true, size: 20 }),
            new TextRun({ text: '   —   ', size: 18 }),
            new ExternalHyperlink({
              link: cs.url,
              children: [new TextRun({ text: cs.url.replace(/^https?:\/\//, ''), style: 'Hyperlink', size: 16 })],
            }),
          ],
          spacing: { before: 140, after: 10 },
        }),
        new Paragraph({
          children: [new TextRun({ text: cs.tagline, italics: true, size: 18, color: '555555' })],
          spacing: { after: 30 },
        }),
        new Paragraph({ text: cs.description, spacing: { after: 30 } })
      );
    });
  }

  children.push(heading('Skills & Technologies'));
  children.push(
    new Paragraph({ text: resume.skills.slice(0, 30).map((s) => s.value).join('  ·  '), spacing: { after: 120 } })
  );

  children.push(heading('Certifications'));
  resume.certs.forEach((c) => children.push(bulletParagraph(`${c.title} — ${c.source}`)));

  children.push(heading('Education'));
  resume.education.forEach((e) => {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: e.degree, bold: true, size: 19 })],
        spacing: { before: 100, after: 10 },
      }),
      new Paragraph({
        children: [new TextRun({ text: `${e.school} — ${e.graduated}`, size: 18, color: '555555' })],
        spacing: { after: 20 },
      })
    );
  });

  return new DocxDocument({
    sections: [{ properties: {}, children }],
  });
}

/* ───────────────────────── Run ───────────────────────── */

async function main_() {
  await renderToFile(buildPdfDocument(), PDF_OUT_PATH);
  console.log('Wrote', PDF_OUT_PATH);

  const doc = buildDocx();
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(DOCX_OUT_PATH, buffer);
  console.log('Wrote', DOCX_OUT_PATH);
}

main_().catch((err) => {
  console.error(err);
  process.exit(1);
});
