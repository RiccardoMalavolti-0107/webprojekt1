import { useState, useEffect } from 'react';

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function RendelLista() {
  const [rendelesek, setRendelesek] = useState([]);
  const [hiba, setHiba] = useState('');

  useEffect(() => {
    const fetchRendelesek = async () => {
      try {
        const response = await api.get('/rendelesek');
        if (!Array.isArray(response.data)) {
          throw new Error('A rendelések API nem listát adott vissza.');
        }
        setRendelesek(response.data);
      } catch (error) {
        console.error('Hiba a rendelések lekérésekor:', error);
        setHiba('A rendelések betöltése nem sikerült. Ellenőrizd, hogy a backend fut-e.');
      }
    };

    fetchRendelesek();
  }, []);

  return (
    <div>
      <h2>Rendelések</h2>
      {hiba && <p role="alert">{hiba}</p>}
      <ul>
        {rendelesek.length === 0 && !hiba && <li>Nincsenek megjeleníthető rendelések.</li>}
        {rendelesek.map((rendeles, index) => (
          <li key={rendeles.id ?? index}>
            {Object.entries(rendeles).map(([mezo, ertek]) => (
              <p key={mezo}>
                {mezo}: {ertek === null ? '—' : typeof ertek === 'object' ? JSON.stringify(ertek) : String(ertek)}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}