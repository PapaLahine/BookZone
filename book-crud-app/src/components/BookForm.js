import React, { useState } from 'react';
import api from '../api';

export default function BookForm({ refresh }) {
  const [form, setForm] = useState({ title: '', author: '', description: '', publishedYear: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/books', form);
    setForm({ title: '', author: '', description: '', publishedYear: '' });
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Ajouter un Livre</h3>
      <input placeholder="Titre" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
      <input placeholder="Auteur" value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
      <input placeholder="Année" value={form.publishedYear} onChange={e => setForm({...form, publishedYear: e.target.value})} />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})}></textarea>
      <button type="submit">Ajouter</button>
    </form>
  );
}
