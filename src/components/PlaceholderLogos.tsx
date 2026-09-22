const marks = [
  <svg key="a" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" /><path d="M16 7v18M7 16h18" stroke="currentColor" strokeWidth="2" /></svg>,
  <svg key="b" viewBox="0 0 32 32" fill="none"><path d="M16 4l12 7v10l-12 7-12-7V11z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>,
  <svg key="c" viewBox="0 0 32 32" fill="none"><rect x="6" y="6" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2" /><circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="2" /></svg>,
  <svg key="d" viewBox="0 0 32 32" fill="none"><path d="M6 22l7-16 7 16M9.5 15h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="24" cy="10" r="3" stroke="currentColor" strokeWidth="2" /></svg>,
  <svg key="e" viewBox="0 0 32 32" fill="none"><path d="M4 20c4-10 8-10 12 0s8 10 12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
  <svg key="f" viewBox="0 0 32 32" fill="none"><circle cx="11" cy="16" r="7" stroke="currentColor" strokeWidth="2" /><circle cx="21" cy="16" r="7" stroke="currentColor" strokeWidth="2" /></svg>,
  <svg key="g" viewBox="0 0 32 32" fill="none"><path d="M16 5v22M6 11l20 10M26 11L6 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
];

const names = ["Norte", "Altiva", "Klimb", "Vasto Grupo", "Cieno", "Duna & Co.", "Meridiano"];

export const placeholderLogos = marks.map((mark, index) => ({ mark, name: names[index] }));
