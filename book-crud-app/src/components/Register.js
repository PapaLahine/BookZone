import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      alert("Inscription réussie");
      navigate('/login');
    } catch (err) {
      alert("Erreur : " + err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      <input placeholder="Nom d'utilisateur" onChange={e => setForm({...form, username: e.target.value})} />
      <input placeholder="Email" type="email" onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Mot de passe" type="password" onChange={e => setForm({...form, password: e.target.value})} />
      <button type="submit">S'inscrire</button>
    </form>
  );
}
