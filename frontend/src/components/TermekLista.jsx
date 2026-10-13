import { useState, useEffect } from 'react';

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function TermekLista() {
  const [termekek, setTermekek] = useState([]);
  const [hiba, setHiba] = useState('');

  useEffect(() => {
    const fetchTermekek = async () => {
      try {
        const response = await api.get('/termekek');
        if (!Array.isArray(response.data)) {
          throw new Error('A termékek API nem listát adott vissza.');
        }
        setTermekek(response.data);
      } catch (error) {
        console.error('Hiba a termékek lekérésekor:', error);
        setHiba('A termékek betöltése nem sikerült. Ellenőrizd, hogy a backend fut-e.');
      }
    };

    fetchTermekek();
  }, []);

  return (
    <div>
      <h2>Termékek</h2>
      {hiba && <p role="alert">{hiba}</p>}
      <ul>
        {termekek.length === 0 && !hiba && <li>Nincsenek megjeleníthető termékek.</li>}
        {termekek.map((termek) => (
          <li key={termek.id}>
            <h3>{termek.nev}</h3>
            <p>Ár: {termek.ar} Ft</p>
            <p>Készlet: {termek.keszlet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}